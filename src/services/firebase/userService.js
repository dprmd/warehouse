import {
  serverTimestamp,
  getDocs,
  query,
  collection,
  where,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { normalizeString } from "../../lib/function";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (username, password) => {
  const cleanUsername = normalizeString(username);

  // cek username
  const q = query(
    collection(db, "users"),
    where("username", "==", cleanUsername),
  );
  const snap = await getDocs(q);

  if (!snap.empty) {
    return { success: false, message: "Nama Toko sudah digunakan" };
  }

  // generate id
  const userId = uuidv4();

  await setDoc(doc(db, "users", userId), {
    username: cleanUsername,
    password,
    createdAt: serverTimestamp(),
  });

  // SIMPAN KE LOCALSTORAGE
  localStorage.setItem("userId", userId);

  return { success: true, userId };
};

export const loginUser = async (username, password) => {
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
    userId: docSnap.id,
  };
};

export const getUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    return null;
  }
};
