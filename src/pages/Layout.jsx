import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ModalProvider } from "../components/ModalContext";
import { LoadingProvider } from "../components/LoadingContext";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  const { pathname } = useLocation();

  if (pathname === "/register" || pathname === "/login") {
    return (
      <LoadingProvider>
        <ModalProvider>
          <Outlet />
          <Toaster />
        </ModalProvider>
      </LoadingProvider>
    );
  } else {
    return (
      <LoadingProvider>
        <ModalProvider>
          <Toaster />
          <Navbar />
          <div className="md:ml-80 pt-12 md:pt-0">
            <Outlet />
          </div>
        </ModalProvider>
      </LoadingProvider>
    );
  }
}
