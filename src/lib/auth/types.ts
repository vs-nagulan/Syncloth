export type UserRole = "user" | "admin";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string;
  phone: string | null;
  addresses: string[];
  role: UserRole;
  created_at: string;
};
