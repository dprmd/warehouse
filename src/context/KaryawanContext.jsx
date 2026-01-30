import { getDocuments } from "@/services/firebase/docService";
import { createContext, useContext, useEffect, useState } from "react";

const KaryawanContext = createContext();

export function KaryawanProvider({ ownerId, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKaryawan = async () => {
    setLoading(true);
    const karyawan = await getDocuments(
      "Ambil List Karyawan",
      "karyawan",
      ownerId,
    );
    if (karyawan.success) {
      setData(karyawan.data);
      setLoading(false);
    } else {
      setError(karyawan.error);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (ownerId) {
      fetchKaryawan();
    }
  }, [ownerId]);

  return (
    <KaryawanContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        refetch: fetchKaryawan,
      }}
    >
      {children}
    </KaryawanContext.Provider>
  );
}

export const useKaryawan = () => useContext(KaryawanContext);
