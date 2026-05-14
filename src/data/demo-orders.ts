export type DemoOrderLine = {
  name: string;
  qty: number;
  unitPriceINR: number;
};

export type DemoOrderDetail = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  total: string;
  totalINR: number;
  status: string;
  payment: string;
  placedAt: string;
  lines: DemoOrderLine[];
};

export const demoOrders: Pick<
  DemoOrderDetail,
  "id" | "customer" | "total" | "status"
>[] = [
  { id: "10432", customer: "Guest", total: "₹2,198", status: "Paid" },
  { id: "10431", customer: "Guest", total: "₹899", status: "COD" },
  { id: "10430", customer: "Guest", total: "₹1,299", status: "Shipped" },
];

const details: Record<string, DemoOrderDetail> = {
  "10432": {
    id: "#10432",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    address: "Flat 12B, MG Road, Bengaluru, Karnataka 560001",
    total: "₹2,198",
    totalINR: 2198,
    status: "Paid",
    payment: "Razorpay — UPI",
    placedAt: "2026-05-12T14:22:00+05:30",
    lines: [
      { name: "Signal Mesh Jersey", qty: 1, unitPriceINR: 1299 },
      { name: "Void Oversized Tee", qty: 1, unitPriceINR: 899 },
    ],
  },
  "10431": {
    id: "#10431",
    customer: "Guest checkout",
    email: "—",
    phone: "+91 91234 56789",
    address: "Indiranagar, Bengaluru, Karnataka",
    total: "₹899",
    totalINR: 899,
    status: "COD",
    payment: "Cash on delivery",
    placedAt: "2026-05-11T10:05:00+05:30",
    lines: [{ name: "Void Oversized Tee", qty: 1, unitPriceINR: 899 }],
  },
  "10430": {
    id: "#10430",
    customer: "Meera K.",
    email: "meera@example.com",
    phone: "+91 99887 76655",
    address: "Salt Lake, Kolkata, West Bengal",
    total: "₹1,299",
    totalINR: 1299,
    status: "Shipped",
    payment: "Razorpay — Card",
    placedAt: "2026-05-09T18:40:00+05:30",
    lines: [{ name: "Signal Mesh Jersey", qty: 1, unitPriceINR: 1299 }],
  },
};

export function getDemoOrder(idParam: string): DemoOrderDetail | undefined {
  const raw = decodeURIComponent(idParam).replace(/^#/, "");
  return details[raw];
}
