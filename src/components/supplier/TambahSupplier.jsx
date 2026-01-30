import {
  Button,
  Form,
  FormGroup,
  InputControlled,
  Label,
  Textarea,
} from "@/components/ui/Form";
import { useSupplier } from "@/context/SupplierContext";
import { useUI } from "@/context/UIContext";
import { createDocument } from "@/services/firebase/docService";
import { useState } from "react";
import { toast } from "sonner";

export default function TambahSupplier({ closeModal }) {
  const userId = localStorage.getItem("userId");
  const { showLoading, closeLoading } = useUI();
  const { data: listSupplier, setData: updateListSupplier } = useSupplier();
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

    showLoading("Menambahkan Supplier . . .");

    const newSupplier = {
      ownerId: userId,
      supplierName: form.supplierName,
      phoneNumber: form.phoneNumber,
      address: form.address,
      note: form.note,
    };

    try {
      const res = await createDocument(
        "Tambah Supplier Baru",
        "supplier",
        newSupplier,
        "Berhasil Menambahkan Supplier Baru",
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
      updateListSupplier([...listSupplier, { ...newSupplier, id: res.docId }]);
    } finally {
      closeModal();
      closeLoading();
    }
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
        <Button type="submit">Tambahkan</Button>
      </FormGroup>
    </Form>
  );
}
