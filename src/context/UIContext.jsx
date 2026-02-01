import { createContext, useContext, useState } from "react";
import Modal from "@/components/ui/Modal";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

const UIContext = createContext();

const defaultLoading = {
  id: 1,
  text: "",
};

const defaultModal = {
  id: 1,
  title: "",
  contentText: "",
  nextText: "",
  onNext: () => {},
  closeDisabled: false,
  onClose: () => {},
  children: null,
};

export function UIProvider({ children }) {
  const [activeModal, setActiveModal] = useState(defaultModal);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLoading, setActiveLoading] = useState(defaultLoading);
  const [openLoading, setOpenLoading] = useState(false);

  const showLoading = (text) => {
    setOpenLoading(true);
    setActiveLoading({ ...defaultLoading, text });
  };

  const closeLoading = () => {
    setOpenLoading(false);
    setActiveLoading(defaultLoading);
  };

  const showModal = (params) => {
    setModalOpen(true);
    setActiveModal({ ...defaultModal, ...params });
  };

  const closeModal = (reset) => {
    setModalOpen(false);
    if (!reset) return;
    setActiveModal(defaultModal);
  };

  return (
    <UIContext.Provider
      value={{ showModal, closeModal, showLoading, closeLoading }}
    >
      {children}

      {/* Modal */}
      <Modal
        key={activeModal.id}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title={activeModal.title}
        contentText={activeModal.contentText}
        nextText={activeModal.nextText}
        onNext={activeModal.onNext}
        closeText={activeModal.closeText}
        closeDisabled={activeModal.closeDisabled}
        onClose={activeModal.onClose}
      >
        {activeModal.children}
      </Modal>

      {/* Loading */}
      <LoadingOverlay
        key={Date.now()}
        show={openLoading}
        text={activeLoading.text}
      />
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI di gunakan di luar UIProvider");
  }

  return context;
};
