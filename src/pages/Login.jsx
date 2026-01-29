import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/firebase/userService";
import { toast } from "sonner";

export default function Login() {
  // hooks
  const navigate = useNavigate();
  // state
  const [usernameToko, setUserNameToko] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await loginUser(usernameToko, password);
    if (!result.success) {
      toast.error(result.message, {
        position: "top-center",
        duration: 1500,
      });
    } else {
      toast.info(result.message, {
        position: "top-center",
        duration: 1500,
      });
      localStorage.setItem("isUserHaveVisit", "Yes");
      await navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex pt-15 justify-center px-4">
        <form
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm"
          onSubmit={handleLogin}
        >
          <h1 className="mb-1 text-xl font-semibold text-gray-800">Login</h1>
          <p className="mb-6 text-sm text-gray-500">Masuk ke akun Anda</p>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="username toko"
              value={usernameToko}
              onChange={(e) => {
                setUserNameToko(e.target.value);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
               focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={isShowPass ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm
                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <button
                type="button"
                className={`${isShowPass ? "bi-eye-fill" : "bi-eye-slash-fill"} absolute inset-y-0 right-3 flex items-center text-gray-400
                 hover:text-gray-600 focus:outline-none pl-4 pr-1 text-xl`}
                onClick={() => {
                  setIsShowPass(!isShowPass);
                }}
              ></button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white
             transition
             hover:bg-blue-700
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
             active:scale-95"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Belum punya akun?
            <Link
              to={"/register"}
              className="font-medium text-blue-600 hover:underline"
            >
              {" "}
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
