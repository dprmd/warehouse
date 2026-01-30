import EditKaryawan from "@/components/karyawan/EditKaryawan";
import { useUI } from "@/context/UIContext";
import { useChangeDocument } from "@/hooks/useChangeDocument";

export default function KaryawanCard({ cardData }) {
  const { showModal, closeModal } = useUI();
  const { id, namaKaryawan, role } = cardData;
  const { hapusDocument } = useChangeDocument();
  const avatarUrl = "/avatar.jpeg";

  const handleHapusKaryawan = async (e) => {
    await hapusDocument(
      "Menghapus . . .",
      "Hapus Karyawan",
      "karyawan",
      id,
      "Berhasil Menghapus Karyawan",
      "karyawanContext",
    );
  };
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md min-w-96">
      {/* Avatar */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={namaKaryawan}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-500">
            {namaKaryawan?.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800">
          {namaKaryawan}
        </h3>
      </div>

      {/* Role */}
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700`}
      >
        {role}
      </span>

      {/* Actions */}
      <div className="ml-2 flex gap-2">
        <button
          className="rounded-lg border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500 transition hover:bg-blue-50"
          onClick={() => {
            showModal({
              id: "edit-karyawan",
              title: "Edit Informasi Karyawan",
              closeDisabled: true,
              children: (
                <EditKaryawan karyawan={cardData} closeModal={closeModal} />
              ),
            });
          }}
        >
          Edit
        </button>
        <button
          className="rounded-lg border border-red-500 px-2 py-1 text-sm font-medium text-red-500 transition hover:bg-red-50"
          onClick={() => {
            showModal({
              id: "hapus-karyawan",
              title: "Hapus Karyawan",
              contentText: "Apakah Anda Yakin ?",
              nextText: "Konfirmasi",
              closeText: "Batalkan",
              onNext: handleHapusKaryawan,
            });
          }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
