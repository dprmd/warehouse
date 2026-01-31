import { useUI } from "@/context/UIContext";
import { useChangeDocument } from "@/hooks/useChangeDocument";
import EditSupplier from "./EditSupplier";

export default function SupplierCard({ cardData }) {
  const { showModal, closeModal } = useUI();
  const { hapusDocument } = useChangeDocument();
  const { id, supplierName, phoneNumber, address, note } = cardData;

  const handleHapusSupplier = async (e) => {
    await hapusDocument(
      "Menghapus . . .",
      "Hapus Supplier",
      "supplier",
      id,
      "Berhasil Menghapus Supplier",
      "supplierContext",
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md min-w-100">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{supplierName}</h3>
      </div>

      {/* No Telepon */}
      {phoneNumber && (
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <i className="bi bi-telephone text-gray-400"></i>
          <span>{phoneNumber}</span>
        </div>
      )}

      {/* Alamat */}
      {address && (
        <div className="mt-1 flex items-start gap-2 text-sm text-gray-600">
          <i className="bi bi-geo-alt mt-0.5 text-gray-400"></i>
          <p className="line-clamp-2">{address}</p>
        </div>
      )}

      {/* Catatan */}
      {note.replaceAll(" ", "") && (
        <div className="mt-2 flex items-start gap-2 text-sm italic text-gray-500">
          <i className="bi bi-journal-text mt-0.5 text-gray-400"></i>
          <p className="line-clamp-2">“{note}”</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        {/* Edit */}
        <button
          className="group inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100"
          onClick={() => {
            showModal({
              id: "edit-supplier",
              title: "Edit Supplier",
              closeDisabled: true,
              children: (
                <EditSupplier supplier={cardData} closeModal={closeModal} />
              ),
            });
          }}
        >
          <i className="bi bi-pencil text-gray-500 transition group-hover:text-blue-600"></i>
          Edit
        </button>

        {/* Delete */}
        <button
          className="group inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-600"
          onClick={() => {
            showModal({
              id: "hapus-supplier",
              title: "Hapus Supplier",
              contentText: "Apakah Anda Yakin ?",
              nextText: "Konfirmasi",
              closeText: "Batalkan",
              onNext: handleHapusSupplier,
            });
          }}
        >
          <i className="bi bi-trash transition group-hover:scale-110"></i>
          Hapus
        </button>
      </div>
    </div>
  );
}
