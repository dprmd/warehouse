import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ModalProvider } from "../components/ModalContext";
import { ToastProvider } from "../components/ToastContext";

export default function Layout() {
  const { pathname } = useLocation();

  if (pathname === "/register" || pathname === "/login") {
    return (
      <ModalProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </ModalProvider>
    );
  } else {
    return (
      <ModalProvider>
        <ToastProvider>
          <Navbar />
          <div className="md:ml-80 pt-12 md:pt-0">
            <Outlet />
          </div>
        </ToastProvider>
      </ModalProvider>
    );
  }
}
