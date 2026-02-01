import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { normalizeString } from "@/lib/function";
import { db } from "./firebase";

export const registerUser = async (username, password) => {
  try {
    const cleanUsername = normalizeString(username);

    // cek username
    console.log("Operation : Read , Function Name :", registerUser.name);
    const q = query(
      collection(db, "users"),
      where("username", "==", cleanUsername),
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      return { success: false, message: "Nama Toko sudah digunakan" };
    }

    // buat user jika username belum pernah digunakan
    console.log("Operation : Create , Function Name :", registerUser.name);
    const docRef = await addDoc(collection(db, "users"), {
      username: cleanUsername,
      password,
      createdAt: serverTimestamp(),
    });

    // SIMPAN KE LOCALSTORAGE
    localStorage.setItem("userId", docRef.id);

    return { success: true, message: "Berhasil Daftar" };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error: error,
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    console.log("Operation : Read , Function Name :", loginUser.name);
    const cleanUsername = normalizeString(username);

    const q = query(
      collection(db, "users"),
      where("username", "==", cleanUsername),
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      return { success: false, message: "Username Toko tidak ditemukan" };
    }

    const docSnap = snap.docs[0];
    const userData = docSnap.data();

    if (userData.password !== password) {
      return { success: false, message: "Password salah" };
    }

    // 🔐 SIMPAN IDENTITAS USER YANG BENAR
    localStorage.setItem("userId", docSnap.id);

    return {
      success: true,
      message: "Login berhasil",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserById = async (userId) => {
  try {
    console.log("Operation : Read , Function Name :", getUserById.name);
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error,
      message: error.message,
    };
  }
};
