import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="md:ml-80 pt-12 md:pt-0">
        <Outlet />
      </div>
    </>
  );
}
