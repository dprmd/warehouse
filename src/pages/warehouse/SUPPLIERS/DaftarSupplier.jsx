import UIList from "@/components/reusable/UIList";
import SupplierCard from "@/components/supplier/SupplierCard";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useSupplier } from "@/context/SupplierContext";
import { useUI } from "@/context/UIContext";
import TambahSupplier from "@/components/supplier/TambahSupplier";

export default function DaftarSupplier() {
  const { showModal, closeModal } = useUI();
  const { data: daftarSupplier, loading } = useSupplier();

  return (
    <div className="px-8 py-3">
      <UIList
        Card={SupplierCard}
        data={daftarSupplier}
        loading={loading}
        messageOnZeroData={"Kamu Tidak Punya Supplier 🥺"}
      />
      <FloatingAddButton
        title="Tambah Supplier"
        onClick={() => {
          showModal({
            id: "tambah-supplier",
            title: "Tambah Supplier",
            closeDisabled: true,
            children: <TambahSupplier closeModal={closeModal} />,
          });
        }}
      />
    </div>
  );
}
