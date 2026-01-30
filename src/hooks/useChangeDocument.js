import { useKain } from "@/context/KainContext";
import { useKaryawan } from "@/context/KaryawanContext";
import { useSupplier } from "@/context/SupplierContext";
import { useUI } from "@/context/UIContext";
import { isSameObject } from "@/lib/function";
import { deleteDocument, updateDocument } from "@/services/firebase/docService";
import { toast } from "sonner";

export const useChangeDocument = () => {
  const { showLoading, closeLoading, closeModal } = useUI();
  const { data: kain, setData: updateKain } = useKain();
  const { data: karyawan, setData: updateKaryawan } = useKaryawan();
  const { data: supplier, setData: updateSupplier } = useSupplier();

  const context = {
    karyawanContext: {
      currentData: karyawan,
      updateData: updateKaryawan,
    },
    kainContext: {
      currentData: kain,
      updateData: updateKain,
    },
    supplierContext: {
      currentData: supplier,
      updateData: updateSupplier,
    },
  };

  const editDocument = async (
    oldDoc,
    newDoc,
    loadingText,
    operationName,
    collectionName,
    messageOnSucces,
    contextName,
  ) => {
    if (isSameObject(oldDoc, newDoc)) {
      closeModal();
      toast.error("Tidak Ada Yang Di Ubah", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }

    try {
      showLoading(loadingText);
      const res = await updateDocument(
        operationName,
        collectionName,
        newDoc.id,
        newDoc,
        messageOnSucces,
      );

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });
        closeModal();
        return;
      }

      toast.info(res.message, {
        position: "top-center",
        duration: 1500,
      });
      const newData = context[contextName].currentData.map((item) => {
        if (item.id === newDoc.id) {
          return newDoc;
        }

        return item;
      });
      context[contextName].updateData(newData);
      closeModal();
    } finally {
      closeLoading();
    }
  };

  const hapusDocument = async (
    loadingText,
    operationName,
    collectionName,
    docId,
    messageOnSucces,
    contextName,
  ) => {
    try {
      closeModal();
      showLoading(loadingText);
      const res = await deleteDocument(
        operationName,
        collectionName,
        docId,
        messageOnSucces,
      );

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });
        return;
      }

      toast.info(res.message, {
        position: "top-center",
        duration: 1500,
      });

      // OPTIMISTIC UI
      context[contextName].updateData(
        context[contextName].currentData.filter((item) => item.id !== docId),
      );
    } finally {
      closeLoading();
    }
  };

  return {
    editDocument,
    hapusDocument,
  };
};
