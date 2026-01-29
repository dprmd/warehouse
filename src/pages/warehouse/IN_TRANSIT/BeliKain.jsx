import { useState } from "react";
import { toast } from "sonner";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "@/components/Form";
import { useUI } from "@/context/UIContext";
import { useKain } from "@/context/KainContext";
import { formatNumber, raw, validateNumber } from "@/lib/function";
import { beliKain } from "@/services/firebase/warehouseService";
import { serverTimestamp } from "firebase/firestore";

export default function BeliKain({ closeModal }) {
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

  const handleBeliKain = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const notaPembelian = {
      ownerId: userId,
      namaKain: form.namaKain,
      quantity: raw(form.quantity),
      quantityType: form.quantityType,
      from: form.from,
      price: raw(form.price),
      status: "IN_TRANSIT",
      time: {
        timeOfPurchase: new Date().getTime(),
      },
    };

    try {
      showLoading("Membeli . . .");
      const res = await beliKain(notaPembelian);

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

      // OPTIMISTIC UI
      setData([
        {
          ...notaPembelian,
          id: res.id,
        },
        ...data,
      ]);
      closeModal();
    } finally {
      closeLoading();
    }
  };

  const options = [
    { label: "Roll", value: "Roll" },
    { label: "Yard", value: "Yard" },
  ];

  return (
    <Form onSubmit={handleBeliKain}>
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
        <Label htmlFor="namaTokoKain">Toko Kain</Label>
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
          Batalkan
        </Button>
        <Button type="submit">Beli Sekarang</Button>
      </FormGroup>
    </Form>
  );
}
