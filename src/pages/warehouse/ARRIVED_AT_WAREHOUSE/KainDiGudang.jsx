import KainCard from "@/components/kain/KainCard";
import UIList from "@/components/reusable/UIList";
import { useKain } from "@/context/KainContext";

export default function KainDiGudang() {
  const { data, loading } = useKain();
  const kainDiGudang = data.filter(
    (kain) => kain.status === "ARRIVED_AT_WAREHOUSE",
  );

  return (
    <div className="px-8 py-3">
      <UIList
        Card={KainCard}
        data={kainDiGudang}
        loading={loading}
        messageOnZeroData={"Gudang Kosong 😭"}
        totalKainDiGudang={kainDiGudang.length}
      />
    </div>
  );
}
