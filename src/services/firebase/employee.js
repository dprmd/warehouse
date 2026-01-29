import {
  addDoc,
  collection,
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

    await addDoc(ref, { ...karyawanBaru, updatedAt: serverTimestamp() });

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
