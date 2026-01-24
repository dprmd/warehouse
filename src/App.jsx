import { createHashRouter, RouterProvider } from "react-router-dom";
import { authLoader } from "./lib/loader";
import { ToastProvider } from "./components/ToastContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import KainDalamPerjalanan from "./pages/warehouse/KainDalamPerjalanan";
import BeliKain from "./pages/warehouse/BeliKain";
import EditNotaPembelianKain from "./pages/warehouse/EditNotaPembelianKain";
import KainDiGudang from "./pages/warehouse/KainDiGudang";
import DaftarKaryawan from "./pages/warehouse/DaftarKaryawan";
import TambahKaryawan from "./pages/warehouse/TambahKaryawan";
import LoadingOverlay from "./components/LoadingOverlay";

const router = createHashRouter([
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <LoadingOverlay />,
    children: [
      { index: true, element: <Home />, loader: authLoader },
      {
        path: "kainDalamPerjalanan",
        loader: authLoader,
        children: [
          { index: true, element: <KainDalamPerjalanan /> },
          { path: "beliKain", element: <BeliKain /> },
          {
            path: "editNotaPembelianKain/:notaId",
            element: <EditNotaPembelianKain />,
          },
        ],
      },
      {
        path: "kainDiGudang",
        loader: authLoader,
        children: [{ index: true, element: <KainDiGudang /> }],
      },
      {
        path: "daftarKaryawan",
        loader: authLoader,
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
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
