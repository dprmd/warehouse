import { getDocuments } from "@/services/firebase/docService";
import { createContext, useContext, useEffect, useState } from "react";

const ProdukContext = createContext();

export function ProdukProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchProduk = async () => {
    setLoading(true);
    const produk = await getDocuments(
      "Ambil List Produk",
      "produk",
      userId,
      "newToOld",
    );
    if (produk.success) {
      setData(produk.data);
      setLoading(false);
    } else {
      setError(produk.error);
      setLoading(false);
      console.log(produk.error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProduk();
    }
  }, [userId]);

  return (
    <ProdukContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        refetch: fetchProduk,
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
}

export const useProduk = () => useContext(ProdukContext);
