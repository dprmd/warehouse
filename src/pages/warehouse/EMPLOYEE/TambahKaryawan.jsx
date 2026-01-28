import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { tambahkanKaryawan } from "../../../services/firebase/employee";
import { useKaryawan } from "../../../context/KaryawanContext";
import { toast } from "sonner";

export default function TambahKaryawan() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { data, setData } = useKaryawan();
  const [loadingTambahKaryawan, setLoadingTambahKaryawan] = useState(false);
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [typeKaryawan, setTypeKaryawan] = useState("Penjahit");

  const handleTambahkanKaryawan = async (e) => {
    e.preventDefault();

    setLoadingTambahKaryawan(true);

    const karyawanBaru = {
      ownerId: userId,
      namaKaryawan,
      typeKaryawan,
      updatedAt: new Date().getTime(),
    };

    const daftarkanKaryawan = await tambahkanKaryawan(karyawanBaru);

    if (daftarkanKaryawan.success) {
      toast.info(daftarkanKaryawan.message, {
        position: "top-center",
        duration: 1500,
      });
      setLoadingTambahKaryawan(false);
      setData([...data, karyawanBaru]);
      navigate("/daftarKaryawan");
    } else {
      toast.error(daftarkanKaryawan.message, {
        position: "top-center",
        duration: 1500,
      });
      setLoadingTambahKaryawan(false);
    }
  };

  return (
    <div>
      <LoadingOverlay
        show={loadingTambahKaryawan}
        text="Menambahkan Karyawan . . ."
      />
      <form
        className="flex flex-col items-center w-screen h-screen"
        onSubmit={handleTambahkanKaryawan}
      >
        <h1 className="text-3xl my-10 font-bold">Tambah Karyawan</h1>
        <div className="flex flex-col">
          <label htmlFor="namaKaryawan" className="text-xl my-2">
            Masukan Nama Karyawan
          </label>
          <input
            type="text"
            required
            id="namaKaryawan"
            value={namaKaryawan}
            onChange={(e) => {
              setNamaKaryawan(e.target.value);
            }}
            placeholder="Masukan Nama"
            className="outline-1 px-2 py-1 rounded-md w-80"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="typeKaryawan" className="text-xl my-2">
            Masukan Type Karyawan
          </label>
          <select
            id="typeKaryawan"
            name="typeKaryawan"
            onChange={(e) => {
              setTypeKaryawan(e.target.value);
            }}
            className="outline-1 px-2 py-1 rounded-md w-80"
          >
            <option value="Penjahit">Penjahit</option>
            <option value="Tukang Potong">Tukang Potong</option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-x-3 py-6">
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="button"
            onClick={() => {
              navigate("/daftarKaryawan");
            }}
          >
            Kembali
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="submit"
          >
            Tambahkan Karyawan
          </button>
        </div>
      </form>
    </div>
  );
}
