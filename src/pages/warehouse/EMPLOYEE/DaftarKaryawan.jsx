import LoadingOverlay from "../../../components/LoadingOverlay";
import { useKaryawan } from "../../../context/KaryawanContext";
import { useModal } from "../../../components/ModalContext";
import TambahKaryawan from "./TambahKaryawan";

export default function DaftarKaryawan() {
  const { showModal, closeModal } = useModal();
  const { data: daftarKaryawan, loading } = useKaryawan();

  return (
    <div className="px-8 py-6">
      <LoadingOverlay show={loading} text="Memuat . . ." />
      {!loading && daftarKaryawan?.length === 0 && (
        <p className="text-center text-2xl font-black">
          Kamu Tidak Punya Karyawan Sekarang 🙂
        </p>
      )}
      {!loading && daftarKaryawan?.length > 0 && (
        <ul className="flex flex-wrap gap-4">
          {daftarKaryawan?.map((karyawan) => (
            <li
              key={karyawan.id}
              className="w-full bg-gray-100 p-5 gap-y-2 flex flex-col rounded-xl border border-slate-400"
            >
              <div>
                <i className="bi bi-person-circle text-7xl text-gray-500"></i>
              </div>
              <div className="font-semibold">
                <p>Nama : {karyawan.namaKaryawan}</p>
                <p>Sebagai : {karyawan.typeKaryawan}</p>
              </div>
              <div className="font-black text-center">
                <p>Status</p>
                <p className="bi bi-person-down text-2xl"></p>
                <div>
                  {!karyawan?.jobDesk && <p>Tidak Mengerjakan Apapun</p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="fixed right-5 bottom-5 flex justify-center items-center">
        <button
          className="w-10 h-10 bg-gray-600 rounded-full text-3xl text-gray-100 cursor-pointer"
          onClick={() => {
            showModal({
              id: "tambah-karyawan",
              title: "Tambah Karyawan",
              closeDisabled: true,
              children: <TambahKaryawan closeModal={closeModal} />,
            });
          }}
        >
          {" "}
          +
        </button>
      </div>
    </div>
  );
}
