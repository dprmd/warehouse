import { createHashRouter, RouterProvider } from "react-router-dom";
import LoadingOverlay from "./components/LoadingOverlay";
import { KainProvider } from "./context/KainContext";
import { KaryawanProvider } from "./context/KaryawanContext";
import { UserProvider } from "./context/UserContext";
import { authLoader } from "./lib/authLoader";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KainDiGudang from "./pages/warehouse/ARRIVED_AT_WAREHOUSE/KainDiGudang";
import DaftarKaryawan from "./pages/warehouse/EMPLOYEE/DaftarKaryawan";
import TambahKaryawan from "./pages/warehouse/EMPLOYEE/TambahKaryawan";
import BeliKain from "./pages/warehouse/IN_TRANSIT/BeliKain";
import KainDalamPerjalanan from "./pages/warehouse/IN_TRANSIT/KainDalamPerjalanan";

const userId = localStorage.getItem("userId");

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <LoadingOverlay show={true} text="Error" />,
    loader: authLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "kainDalamPerjalanan",
        children: [
          { index: true, element: <KainDalamPerjalanan /> },
          { path: "beliKain", element: <BeliKain /> },
        ],
      },
      {
        path: "kainDiGudang",
        children: [{ index: true, element: <KainDiGudang /> }],
      },
      {
        path: "daftarKaryawan",
        children: [
          { index: true, element: <DaftarKaryawan /> },
          { path: "tambahKaryawan", element: <TambahKaryawan /> },
        ],
      },

      // Contoh nested route
      // {
      //   path: "PerhitunganKomisiKotor",
      //   children: [
      //     { index: true, Component: PerhitunganKomisiKotor },
      //     { path: "UbahInformasiProduk", Component: UbahInformasiProduk },
      //   ],
      // },
    ],
  },
]);

export default function App() {
  return (
    <KaryawanProvider ownerId={userId}>
      <UserProvider ownerId={userId}>
        <KainProvider ownerId={userId}>
          <RouterProvider router={router} />
        </KainProvider>
      </UserProvider>
    </KaryawanProvider>
  );
}
