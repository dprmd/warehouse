import TambahProduk from "@/components/produk/TambahProduk";
import UIList from "@/components/reusable/UIList";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useProduk } from "@/context/ProdukContext";
import { useUI } from "@/context/UIContext";
import ProductCard from "@/components/produk/ProductCard";

export default function DaftarProduk() {
  const { showModal, closeModal } = useUI();
  const { data: listProduk, loading } = useProduk();

  return (
    <div className="px-8 py-3">
      <UIList
        data={listProduk}
        loading={loading}
        messageOnZeroData="Kamu Belum Menambahkan Produk 🤬"
        Card={ProductCard}
      />
      <FloatingAddButton
        onClick={() => {
          showModal({
            id: "tambah-produk",
            title: "Tambah Produk",
            closeDisabled: true,
            children: <TambahProduk closeModal={closeModal} />,
          });
        }}
        title="Beli Kain"
      />
    </div>
  );
}
