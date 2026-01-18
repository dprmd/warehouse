import { createHashRouter, RouterProvider } from "react-router-dom";
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

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "kainDalamPerjalanan",
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
  return <RouterProvider router={router} />;
}
