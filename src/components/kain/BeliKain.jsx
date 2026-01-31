import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "@/components/ui/Form";
import { useSupplier } from "@/context/SupplierContext";
import { useChangeDocument } from "@/hooks/useChangeDocument";
import { formatNumber, raw, validateNumber } from "@/lib/function";
import { useEffect } from "react";
import { useState } from "react";

export default function BeliKain({ closeModal }) {
  const { tambahDocument } = useChangeDocument();
  const { data: currentSupplier } = useSupplier();

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
        timeOfPurchase: Date.now(),
      },
    };

    await tambahDocument(
      "Membeli Kain . . .",
      "Beli Kain",
      "kain",
      notaPembelian,
      "Berhasil Membeli Kain",
      "kainContext",
      "upper",
    );
  };

  const options = [
    { label: "Roll", value: "Roll" },
    { label: "Yard", value: "Yard" },
  ];

  const supplierOptions = currentSupplier.map((item) => {
    return {
      label: item.supplierName,
      value: item.id,
    };
  });

  useEffect(() => {
    if (currentSupplier.length > 0) {
      setForm({ ...form, from: currentSupplier[0].id });
    }
  }, [currentSupplier]);

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
        {supplierOptions.length > 0 ? (
          <SelectControlled
            value={form.from}
            onChange={updateForm("from")}
            options={supplierOptions}
            required
          />
        ) : (
          <>
            <SelectControlled
              value={form.from}
              onChange={updateForm("from")}
              options={[{ label: "Tidak Ada Supplier", value: "" }]}
              required
            />
            <p className="text-red-500">
              Mohon Tambah Supplier di menu Supplier
            </p>
          </>
        )}
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
        <Button
          type="submit"
          disabled={supplierOptions.length === 0}
          variant={supplierOptions.length === 0 ? "disabled" : "primary"}
        >
          Beli Sekarang
        </Button>
      </FormGroup>
    </Form>
  );
}
