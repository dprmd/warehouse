import { redirect } from "react-router-dom";
import { getUserById } from "../services/firebase/userService";

export const authLoader = async () => {
  console.log("fetch from firebase");
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw redirect("/register");
  }

  const user = await getUserById(userId);

  if (!user) {
    localStorage.removeItem("userId");
    throw redirect("/register");
  }

  return user;
};
