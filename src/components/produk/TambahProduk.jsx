import { useChangeDocument } from "@/hooks/useChangeDocument";
import { formatNumber, raw, validateNumber } from "@/lib/function";
import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputControlled,
  Label,
  SelectControlled,
} from "../ui/Form";

export default function TambahProduk({ closeModal }) {
  const { tambahDocument } = useChangeDocument();
  const [form, setForm] = useState({
    namaProduk: "",
    price: "",
    stock: "",
    hpp: "",
    discount: "",
    discountType: "rupiah",
  });

  const updateForm = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTambahProduk = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const notaPembelian = {
      ownerId: userId,
      namaProduk: form.namaProduk,
      price: raw(form.price),
      stock: raw(form.stock),
      hpp: raw(form.hpp),
      discount: raw(form.discount),
      discountType: form.discountType,
    };

    await tambahDocument(
      "Menambahkan . . .",
      "Tambah Produk",
      "produk",
      notaPembelian,
      "Berhasil Menambahkan Produk",
      "produkContext",
      "upper",
    );
  };

  const discountOptions = [
    { label: "Persen", value: "percent" },
    { label: "Rupiah", value: "rupiah" },
  ];

  return (
    <Form onSubmit={handleTambahProduk}>
      <FormGroup>
        <Label htmlFor="namaProduk">Nama Produk</Label>
        <InputControlled
          id="namaProduk"
          value={form.namaProduk}
          onChange={updateForm("namaProduk")}
          placeholder="Nama Produk"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="hargaProduk">Harga Produk</Label>
        <Input
          id="hargaProduk"
          value={form.price}
          onChange={(e) => {
            updateForm("discount")("");
            const number = validateNumber(e);
            updateForm("price")(formatNumber(number));
          }}
          placeholder="Harga"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="diskon">Diskon Produk</Label>

        <div className="flex gap-2">
          <div className="flex-2">
            <Input
              id="diskon"
              value={form.discount}
              onChange={(e) => {
                if (!raw(form.price)) return;
                const tempNum = validateNumber(e);
                let number = "";
                if (
                  form.discountType === "percent" &&
                  raw(formatNumber(tempNum)) > 99
                ) {
                  number = "99";
                } else {
                  number = tempNum;
                }

                if (
                  raw(form.price) > 0 &&
                  form.discountType === "rupiah" &&
                  raw(formatNumber(tempNum)) > raw(form.price)
                ) {
                  number = `${raw(form.price) - 1}`;
                }
                updateForm("discount")(formatNumber(number));
              }}
              placeholder="Masukan Diskon"
            />
          </div>

          <div className="flex-1">
            <SelectControlled
              value={form.discountType}
              onChange={updateForm("discountType")}
              options={discountOptions}
            />
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="stok">Stok</Label>
        <Input
          id="stok"
          value={form.stock}
          onChange={(e) => {
            const number = validateNumber(e);
            updateForm("stock")(formatNumber(number));
          }}
          placeholder="Stok Tersedia"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="hppProduk">HPP Produk</Label>
        <Input
          id="hppProduk"
          value={form.hpp}
          onChange={(e) => {
            const number = validateNumber(e);
            updateForm("hpp")(formatNumber(number));
          }}
          placeholder="HPP"
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
