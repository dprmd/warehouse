import { useKaryawan } from "@/context/KaryawanContext";
import { useUI } from "@/context/UIContext";
import { hapusKaryawan } from "@/services/firebase/employee";
import { toast } from "sonner";

export default function KaryawanCard({ id, nama, role, avatarUrl }) {
  const { showLoading, closeLoading, showModal, closeModal } = useUI();
  const { data, setData } = useKaryawan();

  const handleHapusKaryawan = async (e) => {
    e.preventDefault();

    showLoading("Menghapus Karyawan . . .");

    try {
      const res = await hapusKaryawan(id);

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });
        closeModal();
        closeLoading();
        return;
      }

      toast.info(res.message, {
        position: "top-center",
        duration: 1500,
      });

      // Optimistic UI
      const listKaryawanBaru = data.filter((karyawan) => karyawan.id !== id);
      setData(listKaryawanBaru);
    } finally {
      closeModal();
      closeLoading();
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md min-w-96">
      {/* Avatar */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={nama}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-500">
            {nama?.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800">{nama}</h3>
      </div>

      {/* Role */}
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700`}
      >
        {role}
      </span>

      {/* Actions */}
      <div className="ml-2 flex gap-2">
        <button className="rounded-lg border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500 transition hover:bg-blue-50">
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
