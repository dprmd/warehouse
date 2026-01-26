import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "../components/Form";
import Modal from "../components/Modal";
import { useKain } from "../context/KainContext";
import {
  formatNumber,
  formatPrice,
  formatTanggalJamIndonesia,
  raw,
  validateNumber,
} from "../lib/function";
import {
  hapusKain,
  pindahkanKainKeGudang,
  updateKain,
} from "../services/firebase/warehouseService";
import LoadingOverlay from "./LoadingOverlay";
import { useToast } from "./ToastContext";

const STATUS_STYLE = {
  IN_TRANSIT: "bg-orange-100 text-orange-700",
  ARRIVED_AT_WAREHOUSE: "bg-green-100 text-green-700",
  PENDING: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function KainCard({ kain, data, setData }) {
  const { showToast } = useToast();
  const { id, namaKain, from, quantity, quantityType, price, status, time } =
    kain;
  const [loadingHapus, setLoadingHapus] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);
  const [modalBerikan, setModalBerikan] = useState(false);
  const [modalPindahkan, setModalPindahkan] = useState(false);
  const [modalHapusKain, setModalHapusKain] = useState(false);
  const [modalHapusNota, setModalHapusNota] = useState(false);
  const [modalEditNota, setModalEditNota] = useState(false);
  const [modalEditKain, setModalEditKain] = useState(false);

  const handleHapusKain = async () => {
    setLoadingHapus(true);
    const hapusKainSekarang = await hapusKain(id);

    if (hapusKainSekarang.success) {
      const listKainDiGudang = data.filter((kain) => kain.id !== id);
      setData(listKainDiGudang);
      showToast({ type: "info", message: hapusKainSekarang.message });
      setLoadingHapus(false);
    } else {
      showToast({ type: "error", message: hapusKainSekarang.message });
      setLoadingHapus(false);
    }
  };

  const handlePindahkanKeGudang = async (nota) => {
    setLoadingMove(true);
    const pindahkanKeGudang = await pindahkanKainKeGudang(id);

    if (pindahkanKeGudang.success) {
      setLoadingMove(false);
      showToast({ type: "info", message: pindahkanKeGudang.message });
      const listKainBaru = data.map((kain) => {
        if (kain.id === id) {
          return {
            ...kain,
            status: "ARRIVED_AT_WAREHOUSE",
            time: {
              ...kain.time,
              arrivalTime: new Date().getTime(),
            },
          };
        }

        return kain;
      });
      setData(listKainBaru);
    } else {
      showToast({ type: "info", message: pindahkanKeGudang.message });
      setLoadingMove(false);
    }
  };

  const handleBerikanKeTukangPotong = () => {};

  const modals = [
    {
      isOpen: modalPindahkan,
      title: "Pindahkan Ke Gudang",
      contentText: "Apakah Anda Yakin ?",
      nextText: "Pindahkan",
      onNext: handlePindahkanKeGudang,
      onClose: () => {
        setModalPindahkan(false);
      },
    },
    {
      isOpen: modalHapusKain,
      title: "Hapus",
      contentText: "Apakah Anda Yakin ?",
      nextText: "Hapus",
      onNext: handleHapusKain,
      onClose: () => {
        setModalHapusKain(false);
      },
    },
    {
      isOpen: modalHapusNota,
      title: "Hapus",
      contentText: "Apakah Anda Yakin ?",
      nextText: "Hapus",
      onNext: handleHapusKain,
      onClose: () => {
        setModalHapusNota(false);
      },
    },
    {
      isOpen: modalEditNota,
      title: "Edit Nota Pembelian Kain",
      closeDisabled: true,
      onClose: () => {
        setModalEditNota(false);
      },
      children: (
        <EditKain
          kain={kain}
          closeModal={() => {
            setModalEditNota(false);
          }}
        />
      ),
    },
    {
      isOpen: modalEditKain,
      title: "Edit Kain",
      closeDisabled: true,
      onClose: () => {
        setModalEditKain(false);
      },
      children: (
        <EditKain
          kain={kain}
          closeModal={() => {
            setModalEditKain(false);
          }}
        />
      ),
    },
    {
      isOpen: modalBerikan,
      title: "Berikan Ke Tukang Potong",
      contentText: false,
      nextText: "Berikan",
      onNext: () => {},
      onClose: () => {
        setModalBerikan(false);
      },
      children: null,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-400 bg-white p-4 shadow-sm hover:shadow-md transition w-100">
      {modals.map((modal) => (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          nextText={modal.nextText}
          contentText={modal.contentText}
          onNext={modal.onNext}
          closeDisabled={modal.closeDisabled}
          onClose={modal.onClose}
          children={modal.children}
        />
      ))}
      <LoadingOverlay show={loadingHapus} text="Menghapus . . ." />
      <LoadingOverlay show={loadingMove} text="Memindahkan . . ." />
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold truncate w-60">{namaKain}</h3>
          <p className="text-sm text-gray-500">{from}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Tombol Edit Untuk Kain Dalam Perjalanan */}
          {status === "IN_TRANSIT" && (
            <>
              <button
                className="text-xs px-3 py-1 rounded-lg border hover:bg-gray-50 active:bg-gray-200"
                onClick={() => {
                  setModalEditNota(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-xs px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 active:bg-red-50"
                onClick={() => {
                  setModalHapusNota(true);
                }}
              >
                Hapus
              </button>
            </>
          )}

          {/* Tombol Edit Untuk Kain Di Gudang */}
          {status === "ARRIVED_AT_WAREHOUSE" && (
            <>
              <button
                className="text-xs px-3 py-1 rounded-lg border hover:bg-gray-50 active:bg-gray-200"
                onClick={() => {
                  setModalEditKain(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-xs px-3 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 active:bg-red-50"
                onClick={() => {
                  setModalHapusKain(true);
                }}
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm">
          {quantity} {quantityType}
        </span>
        <span className="font-bold text-base">{formatPrice(price)}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${STATUS_STYLE[status]}`}
        >
          {status.replaceAll("_", " ")}
        </span>

        <div className="flex items-center gap-3">
          {status === "IN_TRANSIT" && (
            <button
              className="text-xs px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setModalPindahkan(true);
              }}
            >
              <span className="bi bi-house-check-fill mr-2"></span>
              Sampai di Gudang
            </button>
          )}
          {status === "ARRIVED_AT_WAREHOUSE" && (
            <button
              className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setModalBerikan(true);
              }}
            >
              <span className="bi bi-house-check-fill mr-2"></span>
              Potong
            </button>
          )}
        </div>
      </div>

      {/* Waktu */}
      <div className="grid grid-cols-[max-content_1fr] gap-x-3 text-xs mt-4 text-gray-400">
        <div>Waktu Pembelian</div>
        <div>: {formatTanggalJamIndonesia(time.timeOfPurchase)}</div>
        {status === "ARRIVED_AT_WAREHOUSE" && (
          <>
            <div>Waktu Sampai</div>
            <div>: {formatTanggalJamIndonesia(time.arrivalTime)}</div>
          </>
        )}
      </div>
    </div>
  );
}

const EditKain = ({ kain, closeModal }) => {
  const { showToast } = useToast();
  const { data, setData } = useKain();
  const [namaKain, setNamaKain] = useState();
  const [quantity, setQuantity] = useState("");
  const [quantityType, setQuantityType] = useState("Roll");
  const [namaTokoKain, setNamaTokoKain] = useState("");
  const [harga, setHarga] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);

  const handleEditKain = async (e) => {
    e.preventDefault();

    if (
      kain.namaKain === namaKain &&
      kain.quantity === quantity &&
      kain.quantityType === quantityType &&
      kain.from === namaTokoKain &&
      kain.price === raw(harga)
    ) {
      showToast({ type: "info", message: "Tidak Ada Yang Di Ubah" });
      closeModal();
      return;
    }

    setLoadingSave(true);

    const newKain = {
      ...kain,
      namaKain,
      quantity,
      quantityType,
      from: namaTokoKain,
      price: raw(harga),
    };

    const updateKainSekarang = await updateKain(kain.id, newKain);

    if (updateKainSekarang.success) {
      showToast({ type: "info", message: updateKainSekarang.message });
      setData(
        data.map((item) => {
          if (item.id === newKain.id) {
            return newKain;
          }

          return item;
        }),
      );
      setLoadingSave(false);
      closeModal();
    } else {
      showToast({ type: "error", message: updateKainSekarang.message });
      setLoadingSave(false);
      closeModal();
    }
  };

  useEffect(() => {
    setNamaKain(kain?.namaKain);
    setQuantity(kain?.quantity);
    setQuantityType(kain?.quantityType);
    setNamaTokoKain(kain?.from);
    setHarga(formatNumber(kain?.price));
  }, []);

  const options = [
    { label: "Roll", value: "Roll" },
    { label: "Yard", value: "Yard" },
  ];

  return (
    <Form onSubmit={handleEditKain}>
      <LoadingOverlay show={loadingSave} text="Menyimpan . . ." />
      <FormGroup>
        <Label htmlFor="namaKain">Nama Kain</Label>
        <InputControlled
          id="namaKain"
          value={namaKain}
          onChange={setNamaKain}
          placeholder="Nama Kain"
          required
        ></InputControlled>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantity">Berapa Banyak</Label>

        <div className="flex gap-2">
          <div className="flex-2">
            <InputControlled
              id="quantity"
              type="number"
              value={quantity}
              onChange={setQuantity}
              placeholder="Berapa Roll / Yard"
              required
            />
          </div>

          <div className="flex-1">
            <SelectControlled
              value={quantityType}
              onChange={setQuantityType}
              options={options}
              required
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="namaTokoKain">Nama Kain</Label>
        <InputControlled
          id="namaTokoKain"
          value={namaTokoKain}
          onChange={setNamaTokoKain}
          placeholder="Nama Toko Kain"
          required
        ></InputControlled>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="hargaKain">Total Pembelian</Label>
        <Input
          id="hargaKain"
          value={harga}
          onChange={(e) => {
            const number = validateNumber(e);
            setHarga(formatNumber(number));
          }}
          placeholder="Berapa Harganya"
          required
        ></Input>
      </FormGroup>
      <FormGroup className="flex-row justify-end">
        <Button variant="secondary" onClick={closeModal} type="button">
          Tutup
        </Button>
        <Button type="submit">Simpan</Button>
      </FormGroup>
    </Form>
  );
};
