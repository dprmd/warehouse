import { getDocuments } from "@/services/firebase/docService";
import { createContext, useContext, useEffect, useState } from "react";

const KainContext = createContext();

export function KainProvider({ ownerId, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKain = async () => {
    setLoading(true);
    const kain = await getDocuments(
      "Ambil List Kain",
      "kain",
      ownerId,
      "newToOld",
    );
    if (kain.success) {
      setData(kain.data);
      setLoading(false);
    } else {
      setError(kain.error);
      setLoading(false);
      console.log(kain.error);
    }
  };

  useEffect(() => {
    if (ownerId) {
      fetchKain();
    }
  }, [ownerId]);

  return (
    <KainContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        refetch: fetchKain,
      }}
    >
      {children}
    </KainContext.Provider>
  );
}

export const useKain = () => useContext(KainContext);
