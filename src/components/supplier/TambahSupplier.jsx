import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  Textarea,
} from "@/components/ui/Form";
import { useChangeDocument } from "@/hooks/useChangeDocument";
import { useState } from "react";

export default function TambahSupplier({ closeModal }) {
  const userId = localStorage.getItem("userId");
  const { tambahDocument } = useChangeDocument();

  const [form, setForm] = useState({
    supplierName: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTambahSupplier = async (e) => {
    e.preventDefault();

    const newSupplier = {
      ownerId: userId,
      supplierName: form.supplierName,
      phoneNumber: form.phoneNumber,
      address: form.address,
      note: form.note,
    };

    await tambahDocument(
      "Menambahkan . . .",
      "Tambah Supplier",
      "supplier",
      newSupplier,
      "Berhasil Menambahkan Supplier",
      "supplierContext",
      "lower",
    );
  };

  return (
    <Form onSubmit={handleTambahSupplier}>
      <FormGroup>
        <Label htmlFor="namaSupplier">Nama Supplier</Label>
        <InputControlled
          id="namaSupplier"
          value={form.supplierName}
          onChange={updateForm("supplierName")}
          placeholder="Nama Supplier"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="noTelepon">No Telepon</Label>
        <InputControlled
          type="number"
          id="noTelepon"
          value={form.phoneNumber}
          onChange={updateForm("phoneNumber")}
          placeholder="08xxxxxxxxxx"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="alamat">Alamat</Label>
        <Textarea
          id="alamat"
          placeholder="Alamat Lengkap"
          value={form.address}
          onChange={updateForm("address")}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="catatan">
          Catatan <span className="text-xs">(opsional)</span>
        </Label>
        <Textarea
          id="catatan"
          placeholder="Catatan . . ."
          value={form.note}
          onChange={updateForm("note")}
        />
      </FormGroup>
      <FormGroup className="flex-row justify-end">
        <Button variant="secondary" onClick={closeModal} type="button">
          Batalkan
        </Button>
        <Button type="submit">Tambahkan</Button>
      </FormGroup>
    </Form>
  );
}
