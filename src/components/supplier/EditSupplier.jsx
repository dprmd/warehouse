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
  const [showNote, setShowNote] = useState();

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

    if (!showNote) {
      newSupplier.note = "";
    }

    await editDocument(
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
    if (supplier.note) {
      setShowNote(true);
    } else {
      setShowNote(false);
    }
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
      {showNote && (
        <FormGroup>
          <Label htmlFor="catatan">Catatan</Label>
          <Textarea
            id="catatan"
            placeholder="Catatan . . ."
            value={form.note}
            onChange={updateForm("note")}
          />
        </FormGroup>
      )}
      {!showNote && (
        <Button
          className="bg-gray-500 hover:bg-gray-600 text-xs"
          type="button"
          onClick={() => {
            setShowNote(true);
          }}
        >
          Tambah Catatan
        </Button>
      )}
      {showNote && (
        <Button
          className="bg-gray-500 hover:bg-gray-600 text-xs px-1 py-1"
          type="button"
          onClick={() => {
            setShowNote(false);
          }}
        >
          Hapus Catatan
        </Button>
      )}
      <FormGroup className="flex-row justify-end">
        <Button variant="secondary" onClick={closeModal} type="button">
          Batalkan
        </Button>
        <Button type="submit">Konfirmasi</Button>
      </FormGroup>
    </Form>
  );
}
