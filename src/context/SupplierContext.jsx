import { getDocuments } from "@/services/firebase/docService";
import { createContext, useContext, useEffect, useState } from "react";

const SupplierContext = createContext();

export function SupplierProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchSupplier = async () => {
    setLoading(true);
    const supplier = await getDocuments(
      "Ambil List Supplier",
      "supplier",
      userId,
      "oldToNew",
    );
    if (supplier.success) {
      setData(supplier.data);
      setLoading(false);
    } else {
      setError(supplier.error);
      setLoading(false);
      console.log(supplier.error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSupplier();
    }
  }, [userId]);

  return (
    <SupplierContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        refetch: fetchSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}

export const useSupplier = () => useContext(SupplierContext);
