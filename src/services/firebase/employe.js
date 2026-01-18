import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const tambahkanKaryawan = async (userId, karyawanBaru) => {
  try {
    const ref = collection(db, "users", userId, "daftarKaryawan");

    await addDoc(ref, karyawanBaru);

    return {
      success: true,
      message: "Berhasil Menambahkan Karyawan",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getDaftarKaryawan = async (userId) => {
  const snap = await getDocs(collection(db, "users", userId, "daftarKaryawan"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
