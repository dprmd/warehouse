import { formatNumber, formatTanggalJamIndonesia } from "../../lib/function";
import BerikanKeTukangPotong from "../../components/modals/BerikanKeTukangPotong";
import { useState } from "react";
import { getKainDiGudang } from "../../services/firebase/warehouseService";
import { useEffect } from "react";

export default function KainDiGudang() {
  const userId = localStorage.getItem("userId");
  const [kainDiGudang, setKainDiGudang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    getKainDiGudang(userId).then((data) => {
      setKainDiGudang(data);
      setLoading(false);
    });
  }, [triggerFetch]);

  return (
    <div className="px-8 py-6">
      {loading && (
        <p className="text-center text-2xl font-black">Loading . . .</p>
      )}
      {!loading && kainDiGudang?.length === 0 && (
        <p className="text-center text-2xl font-black">Gudang Kosong</p>
      )}
      {!loading && kainDiGudang?.length > 0 && (
        <div>
          <p className="text-center text-2xl font-black">Kain Di Gudang</p>
          <ul className="my-5 flex gap-4 flex-wrap justify-center items-center">
            {kainDiGudang.map((kain) => (
              <Kain
                kain={kain}
                key={kain.id}
                setTriggerFetch={setTriggerFetch}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const Kain = ({ kain, setTriggerFetch }) => {
  const [berikanKeTukangPotongOpenState, setBerikanKeTukangPotongOpenState] =
    useState(false);
  return (
    <li
      className="flex flex-col bg-slate-200 px-4 py-3 rounded-xl items-center gap-y-4 w-full"
      key={kain.id}
    >
      <span className="font-bold text-xl">{kain.namaKain}</span>
      <div className="text-center">
        <p className="text-sm">Quantity</p>
        <p className="font-bold">
          {kain.quantity} {kain.quantityType}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm">Total</p>
        <p className="font-bold">{formatNumber(kain.harga)}</p>
      </div>
      <div className="text-center">
        <p className="text-sm">Dikirim Dari</p>
        <p className="font-bold">{kain.namaTokoKain}</p>
      </div>
      <div className="text-center">
        <p className="text-sm">Waktu Pembelian</p>
        <p className="font-bold">
          {formatTanggalJamIndonesia(kain.waktuPembelian)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm">Waktu Sampai Di Gudang</p>
        <p className="font-bold">
          {formatTanggalJamIndonesia(kain.waktuSampaiDiGudang)}
        </p>
      </div>
      <div className="flex flex-col mt-4 gap-y-2">
        <button
          className="bi bi-person-fill-down px-3 py-2 cursor-pointer bg-gray-500 text-white rounded-sm"
          type="button"
          onClick={() => {
            setBerikanKeTukangPotongOpenState(!berikanKeTukangPotongOpenState);
          }}
        >
          <span className="inline-block mx-2 text-sm">
            Berikan Ke Tukang Potong
          </span>
        </button>
        <BerikanKeTukangPotong
          open={berikanKeTukangPotongOpenState}
          setOpen={setBerikanKeTukangPotongOpenState}
          kain={kain}
          setTriggerFetch={setTriggerFetch}
        />
      </div>
    </li>
  );
};
