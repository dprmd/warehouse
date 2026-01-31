import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  SelectControlled,
} from "@/components/ui/Form";
import { useChangeDocument } from "@/hooks/useChangeDocument";
import { useState } from "react";

export default function TambahKaryawan({ closeModal }) {
  const userId = localStorage.getItem("userId");
  const { tambahDocument } = useChangeDocument();

  const [form, setForm] = useState({
    namaKaryawan: "",
    role: "Penjahit",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTambahkanKaryawan = async (e) => {
    e.preventDefault();

    const karyawanBaru = {
      ownerId: userId,
      namaKaryawan: form.namaKaryawan,
      role: form.role,
    };

    await tambahDocument(
      "Menambahkan . . .",
      "Tambah Karyawan",
      "karyawan",
      karyawanBaru,
      "Berhasil Menambahkan Karyawan",
      "karyawanContext",
      "upper",
    );
  };

  const options = [
    { label: "Penjahit", value: "Penjahit" },
    { label: "Tukang Potong", value: "Tukang Potong" },
  ];

  return (
    <Form onSubmit={handleTambahkanKaryawan}>
      <FormGroup>
        <Label htmlFor="namaKaryawan">Nama Karyawan</Label>
        <InputControlled
          id="namaKaryawan"
          value={form.namaKaryawan}
          onChange={updateForm("namaKaryawan")}
          placeholder="Nama Karyawan"
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
        <Button type="submit">Tambahkan</Button>
      </FormGroup>
    </Form>
  );
}
