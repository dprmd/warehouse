import { useEffect, useState } from "react";
import { useKain } from "../context/KainContext";
import {
  formatNumber,
  raw,
  validateNumber,
  withLoading,
} from "../lib/function";
import { updateKain } from "../services/firebase/warehouseService";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "./Form";
import LoadingOverlay from "./LoadingOverlay";

export default function EditKain({ kain, closeModal, showToast }) {
  const { data, setData } = useKain();

  const [form, setForm] = useState({
    namaKain: "",
    quantity: "",
    quantityType: "Roll",
    from: "",
    price: "",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const [loadingSave, setLoadingSave] = useState(false);

  const handleEditKain = async (e) => {
    e.preventDefault();

    const isSameKain = (oldData, newData) =>
      JSON.stringify(oldData) === JSON.stringify(newData);

    if (isSameKain(kain, { ...form, price: raw(form.price) })) {
      closeModal();
      showToast({ type: "info", message: "Tidak Ada Yang Di Ubah" });
      return;
    }

    const newKain = {
      ...kain,
      ...form,
      price: raw(form.price),
    };

    withLoading(setLoadingSave, async () => {
      const res = await updateKain(kain.id, newKain);

      if (!res.success) {
        showToast({ type: "error", message: res.message });
        closeModal();
        return;
      }

      showToast({ type: "info", message: res.message });
      setData(
        data.map((item) => {
          if (item.id === newKain.id) {
            return newKain;
          }

          return item;
        }),
      );
      closeModal();
    });
  };

  useEffect(() => {
    setForm({ ...kain, price: formatNumber(kain.price) });
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
          value={form.namaKain}
          onChange={updateForm("namaKain")}
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
              value={form.quantity}
              onChange={updateForm("quantity")}
              placeholder="Berapa Roll / Yard"
              required
            />
          </div>

          <div className="flex-1">
            <SelectControlled
              value={form.quantityType}
              onChange={updateForm("quantityType")}
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
          value={form.from}
          onChange={updateForm("from")}
          placeholder="Nama Toko Kain"
          required
        ></InputControlled>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="hargaKain">Total Pembelian</Label>
        <Input
          id="hargaKain"
          value={form.price}
          onChange={(e) => {
            const number = validateNumber(e);
            updateForm("price")(formatNumber(number));
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
}
