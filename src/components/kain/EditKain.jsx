import { useChangeDocument } from "@/hooks/useChangeDocument";
import { formatNumber, raw, validateNumber } from "@/lib/function";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "../ui/Form";
import { useSupplier } from "@/context/SupplierContext";

export default function EditKain({ kain, closeModal }) {
  const { editDocument } = useChangeDocument();
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

  const handleEditKain = async (e) => {
    e.preventDefault();

    const newKain = {
      ...kain,
      ...form,
      price: raw(form.price),
    };

    await editDocument(
      kain,
      newKain,
      "Menyimpan . . .",
      "Edit Kain",
      "kain",
      "Berhasil Mengedit Kain",
      "kainContext",
    );
  };

  useEffect(() => {
    setForm({ ...kain, price: formatNumber(kain.price) });
  }, [kain]);

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
        <Button type="submit">Konfirmasi</Button>
      </FormGroup>
    </Form>
  );
}
