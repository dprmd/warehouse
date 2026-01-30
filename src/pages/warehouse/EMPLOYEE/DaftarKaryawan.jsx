import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useKaryawan } from "@/context/KaryawanContext";
import { useUI } from "@/context/UIContext";
import TambahKaryawan from "../../../components/karyawan/TambahKaryawan";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import KaryawanCard from "@/components/karyawan/KaryawanCard";
import UIList from "@/components/reusable/UIList";

export default function DaftarKaryawan() {
  const { showModal, closeModal } = useUI();
  const { data: daftarKaryawan, loading } = useKaryawan();

  return (
    <div className="px-8 py-3">
      <UIList
        Card={KaryawanCard}
        data={daftarKaryawan}
        loading={loading}
        messageOnZeroData="Kamu Belum Punya Karyawan 😅"
      />
      <FloatingAddButton
        onClick={() => {
          showModal({
            id: "tambah-karyawan",
            title: "Tambah Karyawan",
            closeDisabled: true,
            children: <TambahKaryawan closeModal={closeModal} />,
          });
        }}
        title="Tambah Karyawan"
      />
    </div>
  );
}
