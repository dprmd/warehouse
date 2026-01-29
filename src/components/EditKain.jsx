import { useEffect, useState } from "react";
import { useKain } from "@/context/KainContext";
import { formatNumber, raw, validateNumber } from "@/lib/function";
import { updateKain } from "@/services/firebase/warehouseService";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "./Form";
import { toast } from "sonner";
import { useUI } from "@/context/UIContext";

export default function EditKain({ kain, closeModal }) {
  const { data, setData } = useKain();
  const { showLoading, closeLoading } = useUI();

  const [form, setForm] = useState({
    namaKain: "",
    quantity: "",
    quantityType: "Roll",
    from: "",
    price: "",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleEditKain = async (e) => {
    e.preventDefault();

    const isSameKain = (oldData, newData) =>
      JSON.stringify(oldData) === JSON.stringify(newData);

    if (isSameKain(kain, { ...form, price: raw(form.price) })) {
      closeModal();
      toast.error("Tidak Ada Yang Di Ubah", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }

    const newKain = {
      ...kain,
      ...form,
      price: raw(form.price),
    };

    try {
      showLoading("Menyimpan . . .");
      const res = await updateKain(kain.id, newKain);

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });
        closeModal();
        return;
      }

      toast.info(res.message, {
        position: "top-center",
        duration: 1500,
      });
      const listKainBaru = data.map((item) => {
        if (item.id === newKain.id) {
          return newKain;
        }

        return item;
      });
      setData(listKainBaru);
      closeModal();
    } finally {
      closeLoading();
    }
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
      <FormGroup>
        <Label htmlFor="namaKain">Nama Kain</Label>
        <InputControlled
          id="namaKain"
          value={form.namaKain}
          onChange={updateForm("namaKain")}
          placeholder="Nama Kain"
          required
        />
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
        <Label htmlFor="namaTokoKain">Nama Toko Kain</Label>
        <InputControlled
          id="namaTokoKain"
          value={form.from}
          onChange={updateForm("from")}
          placeholder="Nama Toko Kain"
          required
        />
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
          Batalkan
        </Button>
        <Button type="submit">Konfirmasi</Button>
      </FormGroup>
    </Form>
  );
}
