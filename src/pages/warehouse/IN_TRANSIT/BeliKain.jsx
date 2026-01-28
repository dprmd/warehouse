import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKain } from "../../../context/KainContext";
import LoadingOverlay from "../../../components/LoadingOverlay";
import {
  formatNumber,
  raw,
  validateNumber,
  withLoading,
} from "../../../lib/function";
import { beliKain } from "../../../services/firebase/warehouseService";
import { toast } from "sonner";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "../../../components/Form";

export default function BeliKain({ closeModal }) {
  const navigate = useNavigate();
  const [loadingBeliKain, setLoadingBeliKain] = useState(false);
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

  const handleBeliKain = (e) => {
    e.preventDefault();
    withLoading(setLoadingBeliKain, async () => {
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
          updatedAt: new Date().getTime(),
        },
      };

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
      setData([
        {
          ...notaPembelian,
          id: res.id,
        },
        ...data,
      ]);
      closeModal();
    });
  };

  const options = [
    { label: "Roll", value: "Roll" },
    { label: "Yard", value: "Yard" },
  ];

  return (
    <Form onSubmit={handleBeliKain}>
      <LoadingOverlay show={loadingBeliKain} text="Menyimpan . . ." />
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
        <Label htmlFor="namaTokoKain">Nama Toko Kain</Label>
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
        <Button type="submit">Beli</Button>
      </FormGroup>
    </Form>
  );
}
