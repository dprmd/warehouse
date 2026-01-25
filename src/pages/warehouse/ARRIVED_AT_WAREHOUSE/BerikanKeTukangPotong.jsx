import { useEffect, useState } from "react";
import { getDaftarKaryawan } from "../../services/firebase/employe";
import { berikanKainKeTukangPotong } from "../../services/firebase/warehouseService";

export default function BerikanKeTukangPotong({ open, setOpen, kain }) {
  const userId = localStorage.getItem("userId");
  const [daftarKaryawan, setDaftarKaryawan] = useState([]);
  const [tukangPotong, setTukangPotong] = useState([]);

  const [pilihIdKaryawan, setPilihIdKaryawan] = useState();
  const handleBerikanKeTukangPotong = async (e) => {
    e.preventDefault();

    if (daftarKaryawan.length === 0) {
      alert("Mohon Tambahkan Karyawan Tukang Potong Terlebih Dahulu");
    }

    const { namaKaryawan } = tukangPotong.find(
      (karyawan) => karyawan.id === pilihIdKaryawan,
    );

    const berikanSekarang = await berikanKainKeTukangPotong(
      userId,
      kain,
      pilihIdKaryawan,
      namaKaryawan,
    );

    if (berikanSekarang.success) {
      alert(berikanSekarang.message);
      setOpen(false);
    } else {
      alert(berikanSekarang.message);
    }
  };

  useEffect(() => {
    getDaftarKaryawan(userId).then((data) => {
      setDaftarKaryawan(data);
      const tukangPotong = data.filter((karyawan) => {
        return karyawan.typeKaryawan === "Tukang Potong";
      });
      setTukangPotong(tukangPotong);
      setPilihIdKaryawan(tukangPotong[0]?.id);
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (open) {
    return (
      <div className="fixed w-screen h-screen top-0 right-0 flex justify-center items-center backdrop-blur-sm">
        <form
          className="w-[80%] h-[20%] bg-gray-100 rounded-xl p-5 shadow-sm shadow-slate-400"
          onSubmit={handleBerikanKeTukangPotong}
        >
          <div className="flex flex-col gap-y-4">
            <label htmlFor="pilihTukangPotong">Berikan Kepada Siapa ?</label>
            <select
              name="pilihTukangPotong"
              id="pilihTukangPotong"
              onChange={(e) => {
                setPilihIdKaryawan(e.target.value);
              }}
              className="outline-1 px-2 py-1 rounded-md"
            >
              {daftarKaryawan.length === 0 ? (
                <option>Tidak Ada Tukang Potong</option>
              ) : (
                tukangPotong.map((karyawan) => (
                  <option value={karyawan.id}>{karyawan.namaKaryawan}</option>
                ))
              )}
            </select>
          </div>
          <div className="flex justify-evenly mt-4">
            <button
              type="button"
              className="px-6 py-2 border rounded md active:bg-slate-200"
              onClick={() => {
                setOpen(false);
              }}
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-6 py-2 border rounded md active:bg-slate-200"
            >
              Berikan
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}
