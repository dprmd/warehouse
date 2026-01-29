import LoadingOverlay from "@/components/LoadingOverlay";
import { useKaryawan } from "@/context/KaryawanContext";
import { useUI } from "@/context/UIContext";
import TambahKaryawan from "./TambahKaryawan";
import FloatingAddButton from "@/components/FloatingAddButton";
import KaryawanCard from "@/components/KaryawanCard";

export default function DaftarKaryawan() {
  const { showModal, closeModal } = useUI();
  const { data: daftarKaryawan, loading } = useKaryawan();

  return (
    <div className="p-4">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && daftarKaryawan?.length === 0 && (
        <p className="text-center text-2xl font-black">
          Kamu Tidak Punya Karyawan Sekarang 🙂
        </p>
      )}
      {!loading && daftarKaryawan?.length > 0 && (
        <ul className="flex justify-center items-center flex-wrap gap-4">
          {daftarKaryawan?.map((karyawan) => (
            <KaryawanCard
              key={karyawan.id}
              id={karyawan.id}
              nama={karyawan.namaKaryawan}
              avatarUrl={"/avatar.jpeg"}
              role={karyawan.typeKaryawan}
            />
            // <li
            //   key={karyawan.id}
            //   className="w-full bg-gray-100 p-5 gap-y-2 flex flex-col rounded-xl border border-slate-400"
            // >
            //   <div>
            //     <i className="bi bi-person-circle text-7xl text-gray-500"></i>
            //   </div>
            //   <div className="font-semibold">
            //     <p>Nama : {karyawan.namaKaryawan}</p>
            //     <p>Sebagai : {karyawan.typeKaryawan}</p>
            //   </div>
            //   <div className="font-black text-center">
            //     <p>Status</p>
            //     <p className="bi bi-person-down text-2xl"></p>
            //     <div>
            //       {!karyawan?.jobDesk && <p>Tidak Mengerjakan Apapun</p>}
            //     </div>
            //   </div>
            // </li>
          ))}
        </ul>
      )}
      <FloatingAddButton
        onClick={() => {
          showModal({
            id: "tambah-karyawan",
            title: "Tambah Karyawan",
            closeDisabled: true,
            children: <TambahKaryawan closeModal={closeModal} />,
          });
        }}
        title="Tambah Karyawan"
      />
    </div>
  );
}
