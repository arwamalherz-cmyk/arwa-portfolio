import { LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

/**
 * Shell for the future Admin Dashboard.
 *
 * This route is intentionally NOT linked from the public navbar and is NOT
 * secured yet. When the backend gains authentication, wrap <Outlet /> below
 * with a real auth guard (e.g. <RequireAuth>) that redirects unauthenticated
 * visitors to a login route — no mock/placeholder auth is added here on purpose.
 */
export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/admin" className="flex items-center gap-2.5 font-bold">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <LayoutDashboard size={18} aria-hidden="true" />
            </span>
            Admin Dashboard
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            View site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="mb-8 rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-sm text-primary">
          UI preview — this dashboard is not connected to a backend and has no
          authentication yet. Data shown below is sample data from the frontend
          service layer.
        </p>

        {/* TODO(auth): once apps/api exposes auth, guard this Outlet. */}
        <Outlet />
      </div>
    </div>
  );
}
