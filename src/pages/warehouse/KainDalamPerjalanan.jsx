import { useNavigate } from "react-router-dom";
import { formatNumber, formatTanggalJamIndonesia } from "../../lib/function";
import {
  getKainDalamPerjalanan,
  hapusNotaPembelianKain,
  pindahkanKainKeGudang,
} from "../../services/firebase/warehouseService";
import { useState } from "react";
import { useEffect } from "react";

export default function KainDalamPerjalanan() {
  const navigate = useNavigate();
  const [triggerFetch, setTriggerFetch] = useState(false);
  const userId = localStorage.getItem("userId");
  const [kainDalamPerjalanan, setKainDalamPerjalanan] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleHapusNotaPembelian = async (idKain) => {
    const konfirmasiPenghapusan = confirm("Apakah Yakin Akan Menghapus Nota ?");
    if (konfirmasiPenghapusan) {
      const hapusNotaPembelian = await hapusNotaPembelianKain(userId, idKain);

      if (hapusNotaPembelian.success) {
        setTriggerFetch(!triggerFetch);
        alert(hapusNotaPembelian.message);
      } else {
        alert(hapusNotaPembelian.message);
      }
    }
  };

  const handlePindahkanKeGudang = async (nota) => {
    const konfirmasiPemindahan = confirm(
      "Apakah Yakin Akan Di Pindahkan Ke Gudang ?",
    );

    if (konfirmasiPemindahan) {
      const pindahkanKeGudang = await pindahkanKainKeGudang(userId, nota);

      if (pindahkanKeGudang.success) {
        alert(pindahkanKeGudang.message);
        setTriggerFetch(!triggerFetch);
      } else {
        alert(pindahkanKeGudang.message);
      }
    }
  };

  useEffect(() => {
    getKainDalamPerjalanan(userId).then((data) => {
      setKainDalamPerjalanan(data);
      setLoading(false);
    });
  }, [triggerFetch]);

  return (
    <div className="px-8 py-6">
      {loading && (
        <p className="text-center text-2xl font-black">Loading . . .</p>
      )}
      {!loading && kainDalamPerjalanan.length === 0 && (
        <p className="text-center text-2xl font-black">
          Kamu Belum Beli Kain Satupun 😒
        </p>
      )}
      {!loading && kainDalamPerjalanan?.length > 0 && (
        <div>
          <p className="text-center text-2xl font-black">
            Kain Yang Sedang Dalam Perjalanan
          </p>
          <ul className="my-5 flex gap-4 flex-wrap justify-center items-center">
            {kainDalamPerjalanan?.map((nota) => (
              <li
                className="flex flex-col bg-slate-200 px-4 py-3 rounded-xl items-center gap-y-4 w-full"
                key={nota.id}
              >
                <span className="font-bold text-xl">{nota.namaKain}</span>
                <div className="text-center">
                  <p className="text-sm">Quantity</p>
                  <p className="font-bold">
                    {nota.quantity} {nota.quantityType}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Total</p>
                  <p className="font-bold">{formatNumber(nota.harga)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Dikirim Dari</p>
                  <p className="font-bold">{nota.namaTokoKain}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Waktu Pembelian</p>
                  <p className="font-bold">
                    {formatTanggalJamIndonesia(nota.waktuPembelian)}
                  </p>
                </div>
                <div className="flex flex-col mt-4 gap-y-2">
                  <button
                    className="bi bi-pencil-fill px-3 py-2 cursor-pointer bg-gray-500 text-white rounded-sm"
                    type="button"
                    onClick={() => {
                      navigate(
                        `/kainDalamPerjalanan/editNotaPembelianKain/${nota.id}`,
                      );
                    }}
                  >
                    <span className="inline-block mx-2 text-sm">Edit</span>
                  </button>
                  <button
                    className="bi bi-trash-fill px-3 py-2 cursor-pointer bg-gray-500 text-white rounded-sm"
                    type="button"
                    onClick={() => {
                      handleHapusNotaPembelian(nota.id);
                    }}
                  >
                    <span className="inline-block mx-2 text-sm">Hapus</span>
                  </button>
                  <button
                    className="bi bi-house-add-fill px-3 py-2 cursor-pointer bg-gray-500 text-white rounded-sm"
                    type="button"
                    onClick={() => {
                      handlePindahkanKeGudang(nota);
                    }}
                  >
                    <span className="inline-block mx-2 text-sm">
                      Tandai Sudah Sampai Di Gudang
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="fixed right-5 bottom-5 flex justify-center items-center">
        {kainDalamPerjalanan?.length === 0 && (
          <div className="mx-4">
            <p className="text-xl font-bold">
              Beli Kain Di Sini <span className="text-2xl">👉</span>
            </p>
          </div>
        )}
        <button
          className="w-15 h-15 bg-green-600 rounded-full text-4xl text-gray-100 cursor-pointer"
          onClick={() => {
            navigate("beliKain");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
