import KainCard from "@/components/KainCard";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useUI } from "@/context/UIContext";
import { useKain } from "@/context/KainContext";
import BeliKain from "./BeliKain";
import FloatingAddButton from "@/components/FloatingAddButton";

export default function KainDalamPerjalanan() {
  const { showModal, closeModal } = useUI();
  const { data, setData, loading } = useKain();
  const kainDalamPerjalanan = data.filter(
    (kain) => kain.status === "IN_TRANSIT",
  );

  return (
    <div className="px-8 py-6">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && kainDalamPerjalanan.length === 0 && (
        <p className="text-center text-2xl font-black">
          Kamu Belum Beli Kain Satupun 😒
        </p>
      )}
      {!loading && kainDalamPerjalanan?.length > 0 && (
        <div>
          <p className="text-center text-2xl font-black">
            Kain Yang Sedang Dalam Perjalanan
          </p>
          <ul className="my-5 flex gap-4 flex-wrap justify-center items-center">
            {kainDalamPerjalanan?.map((kain) => (
              <KainCard
                key={kain.id}
                kain={kain}
                data={data}
                setData={setData}
              />
            ))}
          </ul>
        </div>
      )}
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
