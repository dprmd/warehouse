import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonLogout from "../components/ui/ButtonLogout";
import HamburgerMenuButton from "../components/ui/HamburgerMenuButton";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const menus = [
    { to: "kainDalamPerjalanan", label: "Kain Dalam Perjalanan" },
    { to: "kainDiGudang", label: "Kain Di Gudang" },
    { to: "daftarProduk", label: "Produk" },
    { to: "daftarKaryawan", label: "Daftar Karyawan" },
    { to: "daftarSupplier", label: "Supplier" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        hamburgerRef.current &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setNavOpen(false);
      }
    }

    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);

  return (
    <>
      {/* TOP NAVBAR (mobile only) */}
      <nav className="fixed top-0 left-0 z-50 h-12 w-full px-4 border-b border-b-gray-300 bg-white flex items-center md:hidden">
        <HamburgerMenuButton
          open={navOpen}
          onToggle={() => {
            setNavOpen(!navOpen);
          }}
          ref={hamburgerRef}
        />
        <button
          className="ml-2 text-xl font-semibold"
          onClick={() => {
            setNavOpen(false);
            navigate("/");
          }}
        >
          Warehouse
        </button>
      </nav>

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`
    fixed left-0 z-40
    h-[calc(100vh-3rem)]
    w-[80%] max-w-xs
    bg-white border-r border-r-gray-300
    transform transition-transform duration-300 ease-in-out
    ${navOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:top-0 md:h-screen md:w-100
  `}
      >
        <h1
          className="fixed md:relative md:p-2 md:mt-4 md:text-center md:text-xl md:font-semibold md:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Warehouse
        </h1>
        <div className="px-6 py-6 mt-12 md:mt-0 flex flex-col gap-y-4">
          {menus.map((menu) => (
            <Link
              key={menu.to}
              to={menu.to}
              className="secondary-btn"
              onClick={() => setNavOpen(false)}
            >
              {menu.label}
            </Link>
          ))}
          <ButtonLogout className="red-btn" />
        </div>
      </aside>

      {/* OVERLAY (mobile only) */}
      {navOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-12 z-30 bg-black/30 md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}
    </>
  );
}
