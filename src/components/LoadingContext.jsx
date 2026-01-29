import { createContext, useContext, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const LoadingContext = createContext();

const defaultLoading = {
  id: 1,
  text: "",
};

export function LoadingProvider({ children }) {
  const [activeLoading, setActiveLoading] = useState(defaultLoading);
  const [openLoading, setOpenLoading] = useState(false);

  const showLoading = (text) => {
    setOpenLoading(true);
    setActiveLoading({ ...defaultLoading, text });
  };

  const closeLoading = () => {
    setOpenLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoading, closeLoading }}>
      {children}

      {/* Modal */}
      <LoadingOverlay
        key={activeLoading.id}
        show={openLoading}
        text={activeLoading.text}
      />
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading digunakan di luar LoadingProvider");
  }

  return context;
};
