import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKain } from "../../../context/KainContext";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useToast } from "../../../components/ToastContext";
import { formatNumber, raw, validateNumber } from "../../../lib/function";
import { beliKain } from "../../../services/firebase/warehouseService";

export default function BeliKain() {
  const navigate = useNavigate();
  const [namaKain, setNamaKain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harga, setHarga] = useState("");
  const [quantityType, setQuantityType] = useState("Roll");
  const [namaTokoKain, setNamaTokoKain] = useState("");
  const [loadingBeliKain, setLoadingBeliKain] = useState(false);
  const { showToast } = useToast();
  const { data, setData } = useKain();

  const handleBeliKain = async (e) => {
    e.preventDefault();

    setLoadingBeliKain(true);

    const userId = localStorage.getItem("userId");
    const notaPembelian = {
      ownerId: userId,
      namaKain,
      quantity: raw(quantity),
      quantityType,
      from: namaTokoKain,
      price: raw(harga),
      status: "IN_TRANSIT",
      time: {
        timeOfPurchase: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    };
    const beliSekarang = await beliKain(notaPembelian);

    if (beliSekarang.success) {
      showToast({ type: "info", message: beliSekarang.message });
      setLoadingBeliKain(false);
      setData([
        ...data,
        {
          ...notaPembelian,
          id: beliSekarang.id,
        },
      ]);
      navigate("/kainDalamPerjalanan");
    } else {
      showToast({ type: "error", message: beliSekarang.message });
      setLoadingBeliKain(false);
    }
  };

  return (
    <div>
      <LoadingOverlay show={loadingBeliKain} text="Mohon Tunggu . . ." />
      <form
        className="flex flex-col items-center w-screen h-screen"
        onSubmit={handleBeliKain}
      >
        <h1 className="text-3xl my-10 font-bold">Beli Kain</h1>
        <div className="flex flex-col">
          <label htmlFor="namaKain" className="text-xl my-2">
            Masukan Nama Kain
          </label>
          <input
            type="text"
            required
            id="namaKain"
            value={namaKain}
            onChange={(e) => {
              setNamaKain(e.target.value);
            }}
            placeholder="Nama Kain"
            className="outline-1 px-2 py-1 rounded-md w-80"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-xl my-2">
            Berapa Banyak
          </label>
          <div className="flex justify-between">
            <input
              type="number"
              required
              id="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Berapa Roll / Yard"
              className="outline-1 px-2 py-1 rounded-md w-60"
            />
            <select
              id="quantityType"
              name="quantityType"
              onChange={(e) => {
                setQuantityType(e.target.value);
              }}
              className="w-20 outline-1 rounded-md"
            >
              <option value="Roll">Roll</option>
              <option value="Yard">Yard</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="namaTokoKain" className="text-xl my-2">
            Beli Dari Textille Mana
          </label>
          <input
            type="text"
            required
            id="namaTokoKain"
            value={namaTokoKain}
            onChange={(e) => {
              setNamaTokoKain(e.target.value);
            }}
            placeholder="Nama Toko Kain"
            className="outline-1 px-2 py-1 rounded-md w-80"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="hargaKain" className="text-xl my-2">
            Total Pembelian
          </label>
          <input
            type="text"
            required
            id="hargaKain"
            value={harga}
            onChange={(e) => {
              const number = validateNumber(e);
              setHarga(formatNumber(number));
            }}
            placeholder="Berapa Harganya"
            className="outline-1 px-2 py-1 rounded-md w-80"
          />
        </div>
        <div className="flex items-center justify-center gap-x-3 py-6">
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="button"
            onClick={() => {
              navigate("/kainDalamPerjalanan");
            }}
          >
            Kembali
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="submit"
          >
            Beli Kain
          </button>
        </div>
      </form>
    </div>
  );
}
