import { useSupplier } from "@/context/SupplierContext";
import { useUI } from "@/context/UIContext";
import { useChangeDocument } from "@/hooks/useChangeDocument";
import { formatPrice, formatTanggalJamIndonesia } from "@/lib/function";
import EditKain from "./EditKain";
import { useEffect } from "react";
import { useState } from "react";

export default function KainCard({ cardData }) {
  const { id, namaKain, from, quantity, quantityType, price, status, time } =
    cardData;
  const { showModal, closeModal } = useUI();
  const { data: currentSupplier, loading } = useSupplier();
  const [supplierName, setSupplierName] = useState("");
  const { hapusDocument, editDocument } = useChangeDocument();

  const handleHapusKain = async () => {
    await hapusDocument(
      "Menghapus . . .",
      "Hapus Kain",
      "kain",
      id,
      "Berhasil Menghapus Kain",
      "kainContext",
    );
  };

  const handlePindahkanKeGudang = async () => {
    const updatedDocument = {
      ...cardData,
      quanityRemaining: quantity,
      status: "ARRIVED_AT_WAREHOUSE",
      time: {
        ...time,
        arrivalTime: Date.now(),
      },
    };

    await editDocument(
      {},
      updatedDocument,
      "Memindahkan . . .",
      "Pindahkan Kain Ke Gudang",
      "kain",
      "Berhasil Memindahkan Kain Ke Gudang",
      "kainContext",
      true,
    );
  };

  useEffect(() => {
    if (!loading) {
      const fromObj = currentSupplier.find((item) => item.id === from);
      if (fromObj) {
        setSupplierName(fromObj.supplierName);
      } else {
        setSupplierName("Supplier Telah Di Hapus");
      }
    }
  }, [loading, cardData]);

  const STATUS_CONFIG = {
    IN_TRANSIT: {
      label: "IN TRANSIT",
      statusStyle: "bg-orange-100 text-orange-700",
      buttonStyle: "bg-green-600 text-white hover:bg-green-700",
      primaryActionText: "Sampai Di Gudang",
      edit: () => {
        showModal({
          id: "edit-nota-pembelian",
          title: "Edit Nota Pembelian Kain",
          closeDisabled: true,
          children: <EditKain kain={cardData} closeModal={closeModal} />,
        });
      },
      hapus: () => {
        showModal({
          id: "hapus-nota-pembelian",
          title: "Hapus",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Konfirmasi",
          closeText: "Batalkan",
          onNext: handleHapusKain,
        });
      },
      next: () => {
        showModal({
          id: "pindahkan-ke-gudang",
          title: "Pindahkan Ke Gudang",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Pindahkan",
          closeText: "Batalkan",
          onNext: handlePindahkanKeGudang,
        });
      },
    },
    ARRIVED_AT_WAREHOUSE: {
      label: "ARRIVED AT WAREHOUSE",
      statusStyle: "bg-green-100 text-green-700",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      primaryActionText: "Potong",
      edit: () => {
        showModal({
          id: "edit-kain",
          title: "Edit Kain",
          closeDisabled: true,
          children: <EditKain kain={cardData} closeModal={closeModal} />,
        });
      },
      hapus: () => {
        showModal({
          id: "hapus-kain",
          title: "Hapus",
          contentText: "Apakah Anda Yakin ?",
          nextText: "Konfirmasi",
          closeText: "Batalkan",
          onNext: handleHapusKain,
        });
      },
      next: () => {
        showModal({
          id: "berikan-ke-tukang-potong",
          title: "Berikan Ke Tukang Potong",
          closeText: "Batalkan",
          nextText: "Berikan",
        });
      },
    },
  };
  const config = STATUS_CONFIG[status];

  return (
    <div className="rounded-2xl border border-gray-400 bg-white p-4 shadow-sm hover:shadow-md transition w-100">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold truncate w-60">{namaKain}</h3>
          <p className="text-sm text-gray-500">{supplierName}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <>
            <button
              className="border-gray-500 text-xs px-3 py-1 rounded-lg border hover:bg-gray-100 active:bg-gray-200"
              onClick={config.edit}
            >
              Edit
            </button>
            <button
              className="text-xs px-3 py-1 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 active:bg-red-50"
              onClick={config.hapus}
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
            onClick={config.next}
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
