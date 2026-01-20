import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./Layout";
const checkIsUserHaveVisit = () => {
  const check = localStorage.getItem("isUserHaveVisit");
  if (check) return true;
  else return false;
};

export default function Home() {
  const data = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkIsUserHaveVisit()) {
      navigate("/register");
    }
  }, [checkIsUserHaveVisit, navigate]);

  return (
    <div className="flex flex-col items-center gap-y-5 h-screen">
      <div className="px-8 py-3">
        <p className="text-center text-xl font-bold">
          Hello {data.username?.toUpperCase()}
        </p>
      </div>
      <div className="flex px-4 py-3 justify-around items-center text-center max-w-screen flex-wrap">
        {/* Kain Di Perjalanan */}
        <button
          className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl flex flex-col min-w-30"
          onClick={() => {
            navigate("/kainDalamPerjalanan");
          }}
        >
          <span className="font-bold text-xl">
            {data.kainDalamPerjalanan?.length}
          </span>
          <span className="text-sm text-gray-500">Kain Dalam Perjalanan</span>
        </button>

        {/* Kain Di Gudang */}
        <button
          className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl flex flex-col min-w-30"
          onClick={() => {
            navigate("/kainDiGudang");
          }}
        >
          <span className="font-bold text-xl">{data.kainDiGudang?.length}</span>
          <span className="text-sm text-gray-500">Kain Di Gudang</span>
        </button>

        {/* Daftar Karyawan */}
        <button
          className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-xl flex flex-col min-w-30"
          onClick={() => {
            navigate("/daftarKaryawan");
          }}
        >
          <span className="font-bold text-xl">
            {data.daftarKaryawan?.length}
          </span>
          <span className="text-sm text-gray-500">Karyawan</span>
        </button>
      </div>
    </div>
  );
}
