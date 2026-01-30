import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  SelectControlled,
} from "@/components/ui/Form";
import { useKaryawan } from "@/context/KaryawanContext";
import { useUI } from "@/context/UIContext";
import { createDocument } from "@/services/firebase/docService";
import { useState } from "react";
import { toast } from "sonner";

export default function TambahKaryawan({ closeModal }) {
  const userId = localStorage.getItem("userId");
  const { data: listKaryawan, setData: updateListKaryawan } = useKaryawan();
  const { showLoading, closeLoading } = useUI();
  const [form, setForm] = useState({
    namaKaryawan: "",
    role: "Penjahit",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTambahkanKaryawan = async (e) => {
    e.preventDefault();

    showLoading("Menambahkan Karyawan . . .");

    const karyawanBaru = {
      ownerId: userId,
      namaKaryawan: form.namaKaryawan,
      role: form.role,
    };

    try {
      const res = await createDocument(
        "Tambah Karyawan",
        "karyawan",
        karyawanBaru,
        "Berhasil Menambahkan Karyawan",
      );

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });
        closeModal();
        closeLoading();
        return;
      }

      toast.info(res.message, {
        position: "top-center",
        duration: 1500,
      });

      // Optimistic UI
      updateListKaryawan([...listKaryawan, { ...karyawanBaru, id: res.docId }]);
    } finally {
      closeModal();
      closeLoading();
    }
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
