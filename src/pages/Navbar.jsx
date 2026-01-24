import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogout from "../components/ButtonLogout";
import { useRef } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);

  return (
    <>
      <nav className="px-4 py-2 border-b flex justify-between items-center gap-x-2 fixed w-screen bg-white">
        <div className="flex justify-center items-center">
          <div
            className="inline-flex flex-col justify-between h-6 cursor-pointer"
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          >
            <span className="block w-7 h-1 bg-black"></span>
            <span className="block w-7 h-1 bg-black"></span>
            <span className="block w-7 h-1 bg-black"></span>
          </div>
          <button
            className="inline-block text-2xl cursor-pointer mx-2"
            onClick={() => {
              setNavOpen(false);
              navigate("/");
            }}
          >
            Warehouse
          </button>
        </div>
      </nav>
      <div
        className={`z-50 w-[80%] bg-gray-100 mt-13 fixed top-0 left-0 h-full text-white
    transform transition-transform duration-300 ease-in-out
    ${navOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={() => {
          setNavOpen(false);
        }}
      >
        <div className="px-8 py-6 flex flex-col gap-y-4">
          <Link to="kainDalamPerjalanan" className="secondary-btn">
            Kain Dalam Perjalanan
          </Link>
          <Link to="kainDiGudang" className="secondary-btn">
            Kain Di Gudang
          </Link>
          <Link to="daftarKaryawan" className="secondary-btn">
            Daftar Karyawan
          </Link>
          <ButtonLogout className={"red-btn"} />
        </div>
      </div>
    </>
  );
}
