import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  SelectControlled,
} from "@/components/Form";
import { useUI } from "@/context/UIContext";
import { useKaryawan } from "@/context/KaryawanContext";
import { tambahkanKaryawan } from "@/services/firebase/employee";
import { useState } from "react";
import { toast } from "sonner";

export default function TambahKaryawan({ closeModal }) {
  const userId = localStorage.getItem("userId");
  const { data, setData } = useKaryawan();
  const { showLoading, closeLoading } = useUI();
  const [form, setForm] = useState({
    namaKaryawan: "",
    typeKaryawan: "Penjahit",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTambahkanKaryawan = async (e) => {
    e.preventDefault();

    showLoading("Menambahkan Karyawan . . .");

    const karyawanBaru = {
      ownerId: userId,
      namaKaryawan: form.namaKaryawan,
      typeKaryawan: form.typeKaryawan,
    };

    try {
      const res = await tambahkanKaryawan(karyawanBaru);

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

      console.log(res.idKaryawan);
      // Optimistic UI
      setData([...data, { ...karyawanBaru, id: res.idKaryawan }]);
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
        <Label htmlFor="typeKaryawan">Sebagai</Label>
        <SelectControlled
          value={form.typeKaryawan}
          onChange={updateForm("typeKaryawan")}
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
