import { useState } from "react";
import { loginUser } from "../services/firebase/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // hooks
  const navigate = useNavigate();
  // state
  const [usernameToko, setUserNameToko] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await loginUser(usernameToko, password);
    if (!result.success) {
      // TODO, buat notif lebih bagus lagi
      alert(result.message);
    } else {
      // TODO, buat notif yang lebih bagus lagi
      alert("Login Berhasil");
      localStorage.setItem("isUserHaveVisit", "Yes");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center border w-screen h-screen"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl my-10 font-bold">Masuk Ke Toko Anda</h1>
        <div className="flex flex-col">
          <label htmlFor="namaTokoLogin" className="text-xl my-2">
            Masukan Nama Toko Anda
          </label>
          <input
            type="text"
            required
            id="namaTokoLogin"
            value={usernameToko}
            onChange={(e) => {
              setUserNameToko(e.target.value);
            }}
            placeholder="Nama Toko"
            className="outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="kataSandiLogin" className="text-xl my-2">
            Kata Sandi
          </label>
          <input
            type="password"
            required
            id="kataSandiLogin"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Kata Sandi"
            className="outline-1 px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-3 py-6">
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="submit"
          >
            Masuk
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-sm text-lg"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Saya Belum Punya Toko
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
