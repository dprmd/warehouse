import { useNavigate } from "react-router-dom";
import KainCard from "../../../components/KainCard";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useKain } from "../../../context/KainContext";

export default function KainDalamPerjalanan() {
  const navigate = useNavigate();
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
            {kainDalamPerjalanan?.map((nota) => (
              <KainCard
                key={nota.id}
                kain={nota}
                data={data}
                setData={setData}
              />
            ))}
          </ul>
        </div>
      )}
      <div className="fixed right-5 bottom-5 flex justify-center items-center">
        {kainDalamPerjalanan?.length === 0 && (
          <div className="mx-4">
            <p className="text-xl font-bold">
              Beli Kain Di Sini <span className="text-2xl">👉</span>
            </p>
          </div>
        )}
        <button
          className="w-15 h-15 bg-green-600 rounded-full text-4xl text-gray-100 cursor-pointer"
          onClick={() => {
            navigate("beliKain");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
