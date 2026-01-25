import { redirect } from "react-router-dom";

export async function authLoader({ request }) {
  const userId = localStorage.getItem("userId");
  const url = new URL(request.url);
  const pathname = url.pathname;

  const publicRoutes = ["/login", "/register"];

  // BELUM LOGIN
  if (!userId && !publicRoutes.includes(pathname)) {
    throw redirect("/login");
  }

  // SUDAH LOGIN (opsional: blokir login & register)
  if (userId && publicRoutes.includes(pathname)) {
    throw redirect("/");
  }

  return null;
}
