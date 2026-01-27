import { createContext, useContext, useState } from "react";
import Modal from "./Modal";

const ModalContext = createContext();

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

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(defaultModal);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (params) => {
    setModalOpen(true);
    setActiveModal({ ...defaultModal, ...params });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
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
        closeDisabled={activeModal.closeDisabled}
        onClose={activeModal.onClose}
        children={activeModal.children}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal digunakan di luar ModalProvider");
  }

  return context;
};
