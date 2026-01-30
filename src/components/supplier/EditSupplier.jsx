import { useChangeDocument } from "@/hooks/useChangeDocument";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  Textarea,
} from "../ui/Form";

export default function EditSupplier({ supplier, closeModal }) {
  const { editDocument } = useChangeDocument();

  const [form, setForm] = useState({
    supplierName: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleEditSupplier = async (e) => {
    e.preventDefault();

    const newSupplier = {
      ...supplier,
      ...form,
    };

    editDocument(
      supplier,
      newSupplier,
      "Menyimpan . . .",
      "Edit Supplier",
      "supplier",
      "Berhasil Mengedit Supplier",
      "supplierContext",
    );
  };

  useEffect(() => {
    setForm(supplier);
  }, [supplier]);

  return (
    <Form onSubmit={handleEditSupplier}>
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
        <Label htmlFor="catatan">Catatan</Label>
        <Textarea
          id="catatan"
          placeholder="Catatan . . ."
          value={form.note}
          onChange={updateForm("note")}
          required
        />
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
