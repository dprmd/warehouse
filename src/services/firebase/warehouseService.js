import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const beliKain = async (userId, notaPembelian) => {
  try {
    await addDoc(
      collection(db, "users", userId, "kainDalamPerjalanan"),
      notaPembelian,
    );

    return {
      success: true,
      message: "Berhasil Membeli Kain",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getKainDalamPerjalanan = async (userId) => {
  const snap = await getDocs(
    collection(db, "users", userId, "kainDalamPerjalanan"),
  );

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getKainById = async (userId, idKain) => {
  const ref = doc(db, "users", userId, "kainDalamPerjalanan", idKain);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

export const hapusNotaPembelianKain = async (userId, idKain) => {
  try {
    const ref = doc(db, "users", userId, "kainDalamPerjalanan", idKain);
    await deleteDoc(ref);

    return {
      success: true,
      message: "Berhasil Menghapus Nota Pembelian Kain",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateNotaPembelian = async (userId, idKain, newNota) => {
  try {
    const ref = doc(db, "users", userId, "kainDalamPerjalanan", idKain);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    await updateDoc(ref, newNota);

    return {
      success: true,
      message: "Edit Nota Pembelian Berhasil",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const pindahkanKainKeGudang = async (userId, nota) => {
  try {
    const kainRef = doc(db, "users", userId, "kainDalamPerjalanan", nota.id);
    await deleteDoc(kainRef);

    await setDoc(doc(db, "users", userId, "kainDiGudang", nota.id), {
      ...nota,
      waktuSampaiDiGudang: new Date().getTime(),
    });

    return {
      success: true,
      message: "Berhasil Memindahkan Kain Ke Gudang",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getKainDiGudang = async (userId) => {
  const snap = await getDocs(collection(db, "users", userId, "kainDiGudang"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const berikanKainKeTukangPotong = async (
  userId,
  kain,
  idKaryawan,
  namaKaryawan,
) => {
  try {
    // Hapus Dulu Kain Di Gudang
    const kainDiGudangRef = doc(db, "users", userId, "kainDiGudang", kain.id);
    await deleteDoc(kainDiGudangRef);

    const ref = collection(
      db,
      "users",
      userId,
      "daftarKaryawan",
      idKaryawan,
      "jobDesk",
    );

    await addDoc(ref, {
      ...kain,
      waktuMulaiMengerjakan: new Date().getTime(),
    });

    // const snap = await getDoc(ref);

    // if (!snap.exists()) return;
    // const data = snap.data();

    // // Hapus Dulu di Gudang
    // const listBaruKainDiGudang = data.kainDiGudang.filter(
    //   (item) => item.idKain !== idKain,
    // );

    // await updateDoc(ref, {
    //   kainDiGudang: listBaruKainDiGudang,
    // });

    // // Baru Berikan ke Tukang Potong
    // const kain = data.kainDiGudang.find((kain) => kain.idKain === idKain);

    // const listBaruKaryawan = data.daftarKaryawan.map((karyawan) => {
    //   if (karyawan.idKaryawan !== idKaryawan) return karyawan;

    //   return {
    //     ...karyawan,
    //     jobDesk: [
    //       ...karyawan.jobDesk,
    //       {
    //         ...kain,
    //         waktuMulaiMengerjakan: new Date().getTime(),
    //       },
    //     ],
    //   };
    // });

    // await updateDoc(ref, {
    //   daftarKaryawan: listBaruKaryawan,
    // });

    return {
      success: true,
      message: `Kain Berhasil Di Berikan Ke ${namaKaryawan}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
