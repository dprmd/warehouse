import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const beliKain = async (notaPembelian) => {
  try {
    console.log("Operation : Create , Function Name :", beliKain.name);
    const docRef = await addDoc(collection(db, "kain"), notaPembelian);

    return {
      success: true,
      message: "Berhasil Membeli Kain",
      id: docRef.id,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getKain = async (ownerId) => {
  try {
    console.log("Operation : Read , Function Name :", getKain.name);
    const q = query(collection(db, "kain"), where("ownerId", "==", ownerId));

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

export const hapusNotaPembelianKain = async (idKain) => {
  try {
    console.log(
      "Operation : Delete , Function Name :",
      hapusNotaPembelianKain.name,
    );
    const ref = doc(db, "kain", idKain);
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

export const updateNotaPembelian = async (idKain, newNota) => {
  try {
    console.log(
      "Operation : Update , Function Name :",
      updateNotaPembelian.name,
    );
    const ref = doc(db, "kain", idKain);
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

export const pindahkanKainKeGudang = async (idKain) => {
  try {
    console.log(
      "Operation : Update , Function Name :",
      pindahkanKainKeGudang.name,
    );
    await setDoc(
      doc(db, "kain", idKain),
      {
        status: "ARRIVED_AT_WAREHOUSE",
        time: {
          arrivalTime: new Date().getTime(),
        },
      },
      { merge: true },
    );

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
