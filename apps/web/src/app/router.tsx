import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardPage } from "@/pages/admin/DashboardPage";
import { HomePage } from "@/pages/public/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    // Not linked from the public navbar. Unsecured for now — see AdminLayout.
    path: "/admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);
