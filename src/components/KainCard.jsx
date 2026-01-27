import { useState } from "react";
import {
  formatPrice,
  formatTanggalJamIndonesia,
  withLoading,
} from "../lib/function";
import {
  hapusKain,
  pindahkanKainKeGudang,
} from "../services/firebase/warehouseService";
import LoadingOverlay from "./LoadingOverlay";
import { useModal } from "./ModalContext";
import { useToast } from "./ToastContext";
import EditKain from "./EditKain";

const STATUS_CONFIG = {
  IN_TRANSIT: {
    label: "IN TRANSIT",
    statusStyle: "bg-orange-100 text-orange-700",
    buttonStyle: "bg-green-600 text-white hover:bg-green-700",
    primaryActionText: "Sampai Di Gudang",
  },
  ARRIVED_AT_WAREHOUSE: {
    label: "ARRIVED AT WAREHOUSE",
    statusStyle: "bg-green-100 text-green-700",
    buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
    primaryActionText: "Potong",
  },
};

export default function KainCard({ kain, data, setData }) {
  const { showToast } = useToast();
  const { id, namaKain, from, quantity, quantityType, price, status, time } =
    kain;
  const config = STATUS_CONFIG[status];
  const [loadingHapus, setLoadingHapus] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);
  const { showModal, closeModal } = useModal();

  const handleHapusKain = async () => {
    withLoading(setLoadingHapus, async () => {
      closeModal();
      const res = await hapusKain(id);

      if (!res.success) {
        showToast({ type: "error", message: res.message });
        return;
      }

      setData(data.filter((k) => k.id !== id));
      showToast({ type: "info", message: res.message });
    });
  };

  const handlePindahkanKeGudang = async (nota) => {
    withLoading(setLoadingMove, async () => {
      closeModal();
      const res = await pindahkanKainKeGudang(id);

      if (!res.success) {
        showToast({ type: "error", message: res.message });
        return;
      }

      showToast({ type: "info", message: res.message });
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
    });
  };

  const handleEdit = () => {
    switch (status) {
      case "IN_TRANSIT":
        showModal({
          id: "edit-nota-pembelian",
          title: "Edit Nota Pembelian Kain",
          closeDisabled: true,
          children: (
            <EditKain
              kain={kain}
              closeModal={closeModal}
              showToast={showToast}
            />
          ),
        });
        break;
      case "ARRIVED_AT_WAREHOUSE":
        showModal({
          id: "edit-kain",
          title: "Edit Kain",
          closeDisabled: true,
          children: (
            <EditKain
              kain={kain}
              closeModal={closeModal}
              showToast={showToast}
            />
          ),
        });
        break;
    }
  };

  const handleHapus = () => {
    switch (status) {
      case "IN_TRANSIT":
        showModal({
          id: "hapus-nota-pembelian",
          title: "Hapus",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Hapus",
          onNext: handleHapusKain,
        });
        break;
      case "ARRIVED_AT_WAREHOUSE":
        showModal({
          id: "hapus-kain",
          title: "Hapus",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Hapus",
          onNext: handleHapusKain,
        });
        break;
    }
  };

  const handleNext = () => {
    switch (status) {
      case "IN_TRANSIT":
        showModal({
          id: "pindahkan-ke-gudang",
          title: "Pindahkan Ke Gudang",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Pindahkan",
          onNext: handlePindahkanKeGudang,
        });
        break;
      case "ARRIVED_AT_WAREHOUSE":
        showModal({
          id: "berikan-ke-tukang-potong",
          title: "Berikan Ke Tukang Potong",
          nextText: "Berikan",
        });
        break;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-400 bg-white p-4 shadow-sm hover:shadow-md transition w-100">
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
          <>
            <button
              className="text-xs px-3 py-1 rounded-lg border hover:bg-gray-50 active:bg-gray-200"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-xs px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 active:bg-red-50"
              onClick={handleHapus}
            >
              Hapus
            </button>
          </>
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
          className={`px-3 py-1 text-xs rounded-full font-medium ${config.statusStyle}`}
        >
          {config.label}
        </span>

        <div className="flex items-center gap-3">
          <button
            className={`text-xs px-3 py-1 rounded-lg ${config.buttonStyle}`}
            onClick={handleNext}
          >
            <>
              <span className="bi bi-house-check-fill mr-2"></span>
              {config.primaryActionText}
            </>
          </button>
        </div>
      </div>

      {/* Waktu */}
      <div className="grid grid-cols-[max-content_1fr] gap-x-3 text-xs mt-4 text-gray-400">
        <div>Waktu Pembelian</div>
        <div>: {formatTanggalJamIndonesia(time.timeOfPurchase)}</div>
        {status === "ARRIVED_AT_WAREHOUSE" && (
          <>
            <div>Waktu Sampai</div>
            <div>: {formatTanggalJamIndonesia(time.arrivalTime)}</div>
          </>
        )}
      </div>
    </div>
  );
}
