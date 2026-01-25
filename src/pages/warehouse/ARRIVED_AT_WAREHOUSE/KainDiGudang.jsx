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

// const Kain = ({ kain }) => {
//   const [berikanKeTukangPotongOpenState, setBerikanKeTukangPotongOpenState] =
//     useState(false);
//   return (
//     <li
//       className="flex flex-col bg-slate-200 px-4 py-3 rounded-xl items-center gap-y-4 w-full"
//       key={kain.id}
//     >
//       <span className="font-bold text-xl">{kain.namaKain}</span>
//       <div className="text-center">
//         <p className="text-sm">Quantity</p>
//         <p className="font-bold">
//           {kain.quantity} {kain.quantityType}
//         </p>
//       </div>
//       <div className="text-center">
//         <p className="text-sm">Total</p>
//         <p className="font-bold">{formatNumber(kain.price)}</p>
//       </div>
//       <div className="text-center">
//         <p className="text-sm">Dikirim Dari</p>
//         <p className="font-bold">{kain.namaTokoKain}</p>
//       </div>
//       <div className="text-center">
//         <p className="text-sm">Waktu Pembelian</p>
//         <p className="font-bold">
//           {formatTanggalJamIndonesia(kain.time.timeOfPurchase)}
//         </p>
//       </div>
//       <div className="text-center">
//         <p className="text-sm">Waktu Sampai Di Gudang</p>
//         <p className="font-bold">
//           {formatTanggalJamIndonesia(kain.time.arrivalTime)}
//         </p>
//       </div>
//       <div className="flex flex-col mt-4 gap-y-2">
//         <button
//           className="bi bi-person-fill-down px-3 py-2 cursor-pointer bg-gray-500 text-white rounded-sm"
//           type="button"
//           onClick={() => {
//             setBerikanKeTukangPotongOpenState(!berikanKeTukangPotongOpenState);
//           }}
//         >
//           <span className="inline-block mx-2 text-sm">
//             Berikan Ke Tukang Potong
//           </span>
//         </button>
//         <BerikanKeTukangPotong
//           open={berikanKeTukangPotongOpenState}
//           setOpen={setBerikanKeTukangPotongOpenState}
//           kain={kain}
//         />
//       </div>
//     </li>
//   );
// };
