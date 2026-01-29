import KainCard from "../../../components/KainCard";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useModal } from "../../../components/ModalContext";
import { useKain } from "../../../context/KainContext";
import BeliKain from "./BeliKain";

export default function KainDalamPerjalanan() {
  const { showModal, closeModal } = useModal();
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
      <div className="fixed right-5 bottom-5 flex justify-center items-center">
        <button
          className="w-10 h-10 bg-gray-600 rounded-full text-3xl text-gray-100 cursor-pointer"
          onClick={() => {
            showModal({
              id: "beli-kain",
              title: "Beli Kain",
              closeDisabled: true,
              children: <BeliKain closeModal={closeModal} />,
            });
          }}
        >
          {" "}
          +
        </button>
      </div>
    </div>
  );
}
