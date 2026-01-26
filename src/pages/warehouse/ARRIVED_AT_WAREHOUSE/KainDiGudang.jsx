import KainCard from "../../../components/KainCard";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useKain } from "../../../context/KainContext";

export default function KainDiGudang() {
  const { data, setData, loading } = useKain();
  const kainDiGudang = data.filter(
    (kain) => kain.status === "ARRIVED_AT_WAREHOUSE",
  );

  return (
    <div className="px-8 py-6">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && kainDiGudang?.length === 0 && (
        <p className="text-center text-2xl font-black">Gudang Kosong</p>
      )}
      {!loading && kainDiGudang?.length > 0 && (
        <div>
          <p className="text-center text-2xl font-black">Kain Di Gudang</p>
          <ul className="my-5 flex gap-4 flex-wrap justify-center items-center">
            {kainDiGudang.map((kain) => (
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
    </div>
  );
}
