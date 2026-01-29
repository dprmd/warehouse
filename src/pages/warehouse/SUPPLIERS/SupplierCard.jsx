export default function SupplierCard({ onEdit, onDelete }) {
  const supplier = {
    id: "supplier_001",
    nama: "Toko Kain Jaya",
    kontak: "0812-xxxx-xxxx",
    alamat: "Pasar Baru Blok A No 12",
    catatan: "Harga stabil, respon cepat",
    aktif: true,
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{supplier.nama}</h3>

        {supplier.aktif === false && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
            Nonaktif
          </span>
        )}
      </div>

      {/* Kontak */}
      {supplier.kontak && (
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <i className="bi bi-telephone text-gray-400"></i>
          <span>{supplier.kontak}</span>
        </div>
      )}

      {/* Alamat */}
      {supplier.alamat && (
        <div className="mt-1 flex items-start gap-2 text-sm text-gray-600">
          <i className="bi bi-geo-alt mt-0.5 text-gray-400"></i>
          <p className="line-clamp-2">{supplier.alamat}</p>
        </div>
      )}

      {/* Catatan */}
      {supplier.catatan && (
        <div className="mt-2 flex items-start gap-2 text-sm italic text-gray-500">
          <i className="bi bi-journal-text mt-0.5 text-gray-400"></i>
          <p className="line-clamp-2">“{supplier.catatan}”</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        {/* Edit */}
        <button
          onClick={() => onEdit?.(supplier)}
          className="group inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100"
        >
          <i className="bi bi-pencil text-gray-500 transition group-hover:text-blue-600"></i>
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete?.(supplier)}
          className="group inline-flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-600"
        >
          <i className="bi bi-trash transition group-hover:scale-110"></i>
          Hapus
        </button>
      </div>
    </div>
  );
}
