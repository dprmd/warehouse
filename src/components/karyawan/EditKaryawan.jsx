import { useChangeDocument } from "@/hooks/useChangeDocument";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  SelectControlled,
} from "../ui/Form";

export default function EditKaryawan({ karyawan, closeModal }) {
  const { editDocument } = useChangeDocument();

  const [form, setForm] = useState({
    namaKaryawan: "",
    role: "",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleEditKaryawan = async (e) => {
    e.preventDefault();

    const newKaryawan = {
      ...karyawan,
      ...form,
    };

    await editDocument(
      karyawan,
      newKaryawan,
      "Menyimpan . . .",
      "Edit Karyawan",
      "karyawan",
      "Berhasil Mengedit Karyawan",
      "karyawanContext",
    );
  };

  useEffect(() => {
    setForm(karyawan);
  }, [karyawan]);

  const options = [
    { label: "Penjahit", value: "Penjahit" },
    { label: "Tukang Potong", value: "Tukang Potong" },
  ];

  return (
    <Form onSubmit={handleEditKaryawan}>
      <FormGroup>
        <Label htmlFor="namaKain">Nama Karyawan</Label>
        <InputControlled
          id="namaKaryawan"
          value={form.namaKaryawan}
          onChange={updateForm("namaKaryawan")}
          placeholder="Nama"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="role">Sebagai</Label>
        <SelectControlled
          value={form.role}
          onChange={updateForm("role")}
          options={options}
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
