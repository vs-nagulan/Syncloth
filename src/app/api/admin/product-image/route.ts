import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase-service";

const BUCKET_NAME = process.env.SUPABASE_PRODUCT_IMAGE_BUCKET || "product-images";

export async function POST(request: Request) {
  const sb = getServiceSupabase();
  if (!sb) {
    return NextResponse.json(
      {
        error:
          "Supabase service role not configured correctly. Set NEXT_PUBLIC_SUPABASE_URL and a valid SUPABASE_SERVICE_ROLE_KEY different from the anon key.",
      },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing image file" }, { status: 400 });
  }

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const path = `${filename}`;
  const arrayBuffer = await file.arrayBuffer();
  const fileBytes = new Uint8Array(arrayBuffer);

  const uploadToBucket = async () => {
    const { error: uploadError } = await sb.storage
      .from(BUCKET_NAME)
      .upload(path, fileBytes, { upsert: true });

    return uploadError;
  };

  let uploadError = await uploadToBucket();

  if (uploadError?.message?.includes("Bucket not found")) {
    await sb.storage.createBucket(BUCKET_NAME, { public: true });
    uploadError = await uploadToBucket();
  }

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message || "Failed to upload image" },
      { status: 400 },
    );
  }

  const publicUrlResult = sb.storage.from(BUCKET_NAME).getPublicUrl(path);

  if (!publicUrlResult?.data?.publicUrl) {
    return NextResponse.json(
      { error: "Failed to generate public URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: publicUrlResult.data.publicUrl });
}
