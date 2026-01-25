import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useToast } from "../../../components/ToastContext";
import { useKain } from "../../../context/KainContext";
import { formatNumber, raw, validateNumber } from "../../../lib/function";
import { updateNotaPembelian } from "../../../services/firebase/warehouseService";

export default function EditNotaPembelianKain() {
  const navigate = useNavigate();
  const { notaId } = useParams();
  const { data, setData, loading } = useKain();
  const nota = data.find((item) => item.id === notaId);
  const [loadingSave, setLoadingSave] = useState(false);
  const { showToast } = useToast();

  const [namaKain, setNamaKain] = useState();
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("Roll");
  const [namaTokoKain, setNamaTokoKain] = useState("");
  const [harga, setHarga] = useState("");

  const handleEditNota = async (e) => {
    e.preventDefault();

    if (
      nota.namaKain === namaKain &&
      nota.quantity === quantity &&
      nota.quantityType === quantityType &&
      nota.from === namaTokoKain &&
      nota.price === raw(harga)
    ) {
      navigate("/kainDalamPerjalanan");
      showToast({ type: "info", message: "Tidak Ada Yang Di Ubah" });
      return;
    }

    setLoadingSave(true);

    const newNota = {
      ...nota,
      namaKain,
      quantity,
      quantityType,
      from: namaTokoKain,
      price: raw(harga),
    };

    const updateNota = await updateNotaPembelian(notaId, newNota);

    if (updateNota.success) {
      showToast({ type: "info", message: updateNota.message });
      setData(
        data.map((kain) => {
          if (kain.id === newNota.id) {
            return newNota;
          }

          return kain;
        }),
      );
      setLoadingSave(false);
      navigate("/kainDalamPerjalanan");
    } else {
      showToast({ type: "error", message: updateNota.message });
      setLoadingSave(false);
    }
  };

  useEffect(() => {
    setNamaKain(nota?.namaKain);
    setQuantity(nota?.quantity);
    setQuantityType(nota?.quantityType);
    setNamaTokoKain(nota?.from);
    setHarga(formatNumber(nota?.price));
  }, [loading]);

  return (
    <>
      <LoadingOverlay show={loading} text="Memuat . . ." />
      <LoadingOverlay show={loadingSave} text="Menyimpan . . ." />
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
    </>
  );
}
