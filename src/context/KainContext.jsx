import { createContext, useContext, useEffect, useState } from "react";
import { getKain } from "../services/firebase/warehouseService";

const KainContext = createContext();

export function KainProvider({ ownerId, children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKain = async () => {
    setLoading(true);
    const kain = await getKain(ownerId);
    if (kain.success) {
      setData(kain.data);
      setLoading(false);
    } else {
      setError(kain.error);
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
