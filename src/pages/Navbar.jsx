import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogout from "../components/ButtonLogout";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

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
      {navOpen && (
        <div
          className="fixed w-[80%] h-screen bg-gray-100 mt-13"
          onClick={() => {
            setNavOpen(false);
          }}
        >
          <div className="px-8 py-6 flex flex-col gap-y-4">
            <Link
              to="kainDalamPerjalanan"
              className="border px-4 py-3 text-center rounded-md"
            >
              Kain Dalam Perjalanan
            </Link>
            <Link
              to="kainDiGudang"
              className="border px-4 py-3 text-center rounded-md"
            >
              Kain Di Gudang
            </Link>
            <Link
              to="daftarKaryawan"
              className="border px-4 py-3 text-center rounded-md"
            >
              Daftar Karyawan
            </Link>
            <ButtonLogout />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
