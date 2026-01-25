import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice, formatTanggalJamIndonesia } from "../lib/function";
import {
  hapusNotaPembelianKain,
  pindahkanKainKeGudang,
} from "../services/firebase/warehouseService";
import LoadingOverlay from "./LoadingOverlay";
import { useToast } from "./ToastContext";

const STATUS_STYLE = {
  IN_TRANSIT: "bg-orange-100 text-orange-700",
  ARRIVED_AT_WAREHOUSE: "bg-green-100 text-green-700",
  PENDING: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function KainCard({ kain, data, setData }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id, namaKain, from, quantity, quantityType, price, status, time } =
    kain;
  const [loadingHapus, setLoadingHapus] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);

  const handleHapusNotaPembelian = async () => {
    const konfirmasiPenghapusan = confirm("Apakah Yakin Akan Menghapus Nota ?");
    if (konfirmasiPenghapusan) {
      setLoadingHapus(true);
      const hapusNotaPembelian = await hapusNotaPembelianKain(id);

      if (hapusNotaPembelian.success) {
        const listNotaPembelianBaru = data.filter((kain) => kain.id !== id);
        setData(listNotaPembelianBaru);
        showToast({ type: "info", message: hapusNotaPembelian.message });
        setLoadingHapus(false);
      } else {
        showToast({ type: "error", message: hapusNotaPembelian.message });
        setLoadingHapus(false);
      }
    }
  };

  const handlePindahkanKeGudang = async (nota) => {
    const konfirmasiPemindahan = confirm(
      "Apakah Yakin Akan Di Pindahkan Ke Gudang ?",
    );

    if (konfirmasiPemindahan) {
      setLoadingMove(true);
      const pindahkanKeGudang = await pindahkanKainKeGudang(id);

      if (pindahkanKeGudang.success) {
        setLoadingMove(false);
        showToast({ type: "info", message: pindahkanKeGudang.message });
        const listKainBaru = data.map((kain) => {
          if (kain.id === id) {
            return {
              ...kain,
              status: "ARRIVED_AT_WAREHOUSE",
              time: {
                ...kain.time,
                arrivalTime: new Date().getTime(),
              },
            };
          }

          return kain;
        });
        setData(listKainBaru);
      } else {
        showToast({ type: "info", message: pindahkanKeGudang.message });
        setLoadingMove(false);
      }
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition w-100">
      <LoadingOverlay show={loadingHapus} text="Menghapus . . ." />
      <LoadingOverlay show={loadingMove} text="Memindahkan . . ." />
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold truncate w-60">{namaKain}</h3>
          <p className="text-sm text-gray-500">{from}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {status === "IN_TRANSIT" && (
            <>
              <button
                className="text-xs px-3 py-1 rounded-lg border hover:bg-gray-50 active:bg-gray-200"
                onClick={() => {
                  navigate(
                    `/kainDalamPerjalanan/editNotaPembelianKain/${kain.id}`,
                  );
                }}
              >
                Edit
              </button>
              <button
                className="text-xs px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 active:bg-red-50"
                onClick={handleHapusNotaPembelian}
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm">
          {quantity} {quantityType}
        </span>
        <span className="font-bold text-base">{formatPrice(price)}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${STATUS_STYLE[status]}`}
        >
          {status.replaceAll("_", " ")}
        </span>

        <div className="flex items-center gap-3">
          {status === "IN_TRANSIT" && (
            <button
              className="text-xs px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
              onClick={handlePindahkanKeGudang}
            >
              Sampai di Gudang
            </button>
          )}
        </div>
      </div>

      {/* Waktu */}
      <div className="flex justify-between mt-4 flex-col">
        <span className="text-xs text-gray-400">
          Waktu Pembelian : {formatTanggalJamIndonesia(time.timeOfPurchase)}
        </span>
        {status === "ARRIVED_AT_WAREHOUSE" && (
          <span className="text-xs text-gray-400">
            Waktu Sampai : {formatTanggalJamIndonesia(time.arrivalTime)}
          </span>
        )}
      </div>
    </div>
  );
}
