import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatNumber, raw, validateNumber } from "../../lib/function";
import {
  getKainById,
  updateNotaPembelian,
} from "../../services/firebase/warehouseService";

export default function EditNotaPembelianKain() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { notaId } = useParams();
  const [nota, setNota] = useState();

  const [namaKain, setNamaKain] = useState();
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("Roll");
  const [namaTokoKain, setNamaTokoKain] = useState("");
  const [harga, setHarga] = useState("");

  const handleEditNota = async (e) => {
    e.preventDefault();

    const newNota = {
      ...nota,
      namaKain,
      quantity: quantity,
      quantityType,
      namaTokoKain,
      harga: raw(harga),
    };

    const updateNota = await updateNotaPembelian(userId, notaId, newNota);

    if (updateNota.success) {
      alert(updateNota.message);
      navigate("/kainDalamPerjalanan");
    }
  };

  useEffect(() => {
    getKainById(userId, notaId).then((kain) => {
      setNamaKain(kain.namaKain);
      setQuantity(kain.quantity);
      setQuantityType(kain.quantityType);
      setNamaTokoKain(kain.namaTokoKain);
      setHarga(formatNumber(kain.harga));
      setNota(kain);
    });
  }, []);

  return (
    <div>
      <form
        className="flex flex-col items-center border w-screen h-screen"
        onSubmit={handleEditNota}
      >
        <h1 className="text-3xl my-10 font-bold">Edit Nota Pembelian Kain</h1>
        <div className="flex flex-col w-100">
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
            className="outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col w-100">
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
              className="outline-1 px-2 py-1 rounded-md"
            />
            <select
              id="quantityType"
              name="quantityType"
              onChange={(e) => {
                setQuantityType(e.target.value);
              }}
              className="outline-1 px-2 py-1 rounded-md w-80"
            >
              <option value="Roll">Roll</option>
              <option value="Yard">Yard</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-100">
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
            placeholder="Nama Kain"
            className="outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col w-100">
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
            placeholder="Berapa"
            className="outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex items-center justify-center gap-x-3 py-6">
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="button"
            onClick={(e) => {
              navigate("/kainDalamPerjalanan");
            }}
          >
            Kembali
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
