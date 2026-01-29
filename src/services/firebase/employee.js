import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const tambahkanKaryawan = async (karyawanBaru) => {
  try {
    console.log("Operation : Create , Function Name :", tambahkanKaryawan.name);
    const ref = collection(db, "karyawan");

    const docId = await addDoc(ref, karyawanBaru);

    return {
      success: true,
      message: "Berhasil Menambahkan Karyawan",
      idKaryawan: docId.id,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getDaftarKaryawan = async (ownerId) => {
  try {
    console.log("Operation : Read , Function Name :", getDaftarKaryawan.name);
    const q = query(
      collection(db, "karyawan"),
      where("ownerId", "==", ownerId),
    );

    const snapshot = await getDocs(q);

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const hapusKaryawan = async (idKaryawan) => {
  try {
    console.log("Operation : Delete , Function Name :", hapusKaryawan.name);
    const docRef = doc(db, "karyawan", idKaryawan);

    await deleteDoc(docRef);

    return {
      success: true,
      message: "Berhasil Menghapus Karyawan",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
