import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner";
import { UIProvider } from "@/context/UIContext";

export default function Layout() {
  const { pathname } = useLocation();

  if (pathname === "/register" || pathname === "/login") {
    return (
      <>
        <UIProvider>
          <Outlet />
          <Toaster />
        </UIProvider>
      </>
    );
  } else {
    return (
      <>
        <UIProvider>
          <Toaster />
          <Navbar />
          <div className="md:ml-80 pt-12 md:pt-0">
            <Outlet />
          </div>
        </UIProvider>
      </>
    );
  }
}
