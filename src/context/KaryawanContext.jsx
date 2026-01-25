import { createContext, useContext, useEffect, useState } from "react";
import { getDaftarKaryawan } from "../services/firebase/employee";

const KaryawanContext = createContext();

export function KaryawanProvider({ ownerId, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKaryawan = async () => {
    setLoading(true);
    const karyawan = await getDaftarKaryawan(ownerId);
    if (karyawan.success) {
      setData(karyawan.data);
      setLoading(false);
    } else {
      setError(karyawan.error);
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
        data: data.reverse(),
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
