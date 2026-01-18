import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { beliKain } from "../../services/firebase/warehouseService";
import { useContext } from "react";
import { RefetchContext } from "../Layout";
import { formatNumber, raw, validateNumber } from "../../lib/function";
import { v4 as uuidv4 } from "uuid";

const BeliKain = () => {
  const navigate = useNavigate();
  const [namaKain, setNamaKain] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harga, setHarga] = useState("");
  const [quantityType, setQuantityType] = useState("Roll");
  const [namaTokoKain, setNamaTokoKain] = useState("");
  const setNeedRefetch = useContext(RefetchContext);

  const handleBeliKain = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const notaPembelian = {
      namaKain,
      quantity: raw(quantity),
      quantityType,
      harga: raw(harga),
      namaTokoKain,
      waktuPembelian: new Date().getTime(),
    };
    const beliSekarang = await beliKain(userId, notaPembelian);

    if (beliSekarang.success) {
      alert(beliSekarang.message);
      setNeedRefetch(uuidv4());
      navigate("/kainDalamPerjalanan");
    } else {
      alert(beliSekarang.message);
    }
  };

  return (
    <div>
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
};

export default BeliKain;
