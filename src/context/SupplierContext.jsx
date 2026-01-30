import { getDocuments } from "@/services/firebase/docService";
import { createContext, useContext, useEffect, useState } from "react";

const SupplierContext = createContext();

export function SupplierProvider({ ownerId, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplier = async () => {
    setLoading(true);
    const supplier = await getDocuments(
      "Ambil List Supplier",
      "supplier",
      ownerId,
    );
    if (supplier.success) {
      setData(supplier.data);
      setLoading(false);
    } else {
      setError(supplier.error);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (ownerId) {
      fetchSupplier();
    }
  }, [ownerId]);

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
