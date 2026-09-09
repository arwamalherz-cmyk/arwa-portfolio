import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SceneBackground } from "@/components/ui/SceneBackground";

export function PublicLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SceneBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
