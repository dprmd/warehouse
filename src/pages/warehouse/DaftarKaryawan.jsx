import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getDaftarKaryawan } from "../../services/firebase/employe";

export default function DaftarKaryawan() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [daftarKaryawan, setDaftarKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDaftarKaryawan(userId).then((data) => {
      setDaftarKaryawan(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <div className="px-8 py-6">
      {loading && (
        <p className="text-center text-2xl font-black">Loading . . .</p>
      )}
      {!loading && daftarKaryawan?.length === 0 && (
        <p className="text-center text-2xl font-black">
          Kamu Tidak Punya Karyawan Sekarang 🙂
        </p>
      )}
      {!loading && daftarKaryawan?.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {daftarKaryawan?.map((karyawan) => (
            <li
              key={karyawan.id}
              className="w-full bg-slate-200 p-5 gap-y-2 flex flex-col rounded-xl"
            >
              <div>
                <i className="bi bi-person-circle text-7xl text-gray-500"></i>
              </div>
              <div className="font-semibold">
                <p>Nama : {karyawan.namaKaryawan}</p>
                <p>Sebagai : {karyawan.typeKaryawan}</p>
              </div>
              <div className="font-black text-center">
                <p>Status</p>
                <p className="bi bi-person-down text-2xl"></p>
                <div>
                  {!karyawan?.jobDesk && <p>Tidak Mengerjakan Apapun</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="fixed right-5 bottom-5 flex justify-center items-center">
        {daftarKaryawan?.length === 0 && (
          <div className="mx-4">
            <p className="text-xl font-bold">
              Tambah Karyawan Di Sini <span className="text-2xl">👉</span>
            </p>
          </div>
        )}
        <button
          className="w-15 h-15 bg-green-600 rounded-full text-4xl text-gray-100 cursor-pointer"
          onClick={() => {
            navigate("tambahKaryawan");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
