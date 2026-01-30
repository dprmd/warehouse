import KainCard from "@/components/kain/KainCard";
import UIList from "@/components/reusable/UIList";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useKain } from "@/context/KainContext";
import { useUI } from "@/context/UIContext";
import BeliKain from "../../../components/kain/BeliKain";

export default function KainDalamPerjalanan() {
  const { showModal, closeModal } = useUI();
  const { data, loading } = useKain();
  const kainDalamPerjalanan = data.filter(
    (kain) => kain.status === "IN_TRANSIT",
  );

  return (
    <div className="px-8 py-3">
      <UIList
        data={kainDalamPerjalanan}
        loading={loading}
        messageOnZeroData="Kamu Belum Beli Kain Satupun 😒"
        Card={KainCard}
      />
      <FloatingAddButton
        onClick={() => {
          showModal({
            id: "beli-kain",
            title: "Beli Kain",
            closeDisabled: true,
            children: <BeliKain closeModal={closeModal} />,
          });
        }}
        title="Beli Kain"
      />
    </div>
  );
}
