import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "student";

  const redirectMap = {
    admin: "/admin",
    teacher: "/teacher",
    student: "/student",
  }

  redirect(redirectMap[role] || "/student");
}