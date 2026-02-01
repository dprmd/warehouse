import { createHashRouter, RouterProvider } from "react-router-dom";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import { KainProvider } from "./context/KainContext";
import { KaryawanProvider } from "./context/KaryawanContext";
import { ProdukProvider } from "./context/ProdukContext";
import { SupplierProvider } from "./context/SupplierContext";
import { UserProvider } from "./context/UserContext";
import { authLoader } from "./lib/authLoader";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KainDiGudang from "./pages/warehouse/ARRIVED_AT_WAREHOUSE/KainDiGudang";
import MergeKain from "./pages/warehouse/ARRIVED_AT_WAREHOUSE/MergeKain";
import DaftarKaryawan from "./pages/warehouse/EMPLOYEE/DaftarKaryawan";
import KainDalamPerjalanan from "./pages/warehouse/IN_TRANSIT/KainDalamPerjalanan";
import DaftarProduk from "./pages/warehouse/PRODUK/DaftarProduk";
import DaftarSupplier from "./pages/warehouse/SUPPLIERS/DaftarSupplier";

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
        children: [{ index: true, element: <KainDalamPerjalanan /> }],
      },
      {
        path: "kainDiGudang",
        children: [
          { index: true, element: <KainDiGudang /> },
          { path: "mergeKain/:id", element: <MergeKain /> },
        ],
      },
      {
        path: "daftarKaryawan",
        children: [{ index: true, element: <DaftarKaryawan /> }],
      },
      {
        path: "daftarSupplier",
        children: [{ index: true, element: <DaftarSupplier /> }],
      },
      {
        path: "daftarProduk",
        children: [{ index: true, element: <DaftarProduk /> }],
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
    <ProdukProvider>
      <SupplierProvider>
        <KaryawanProvider>
          <UserProvider>
            <KainProvider>
              <RouterProvider router={router} />
            </KainProvider>
          </UserProvider>
        </KaryawanProvider>
      </SupplierProvider>
    </ProdukProvider>
  );
}
