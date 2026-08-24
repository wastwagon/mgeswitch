import { redirect } from "next/navigation";

/** User dashboard removed — guests track bookings by reference instead */
export default function DashboardRedirect() {
  redirect("/booking/status");
}
