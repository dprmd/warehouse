import { useKain } from "@/context/KainContext";
import { useKaryawan } from "@/context/KaryawanContext";
import { useProduk } from "@/context/ProdukContext";
import { useSupplier } from "@/context/SupplierContext";
import { useUI } from "@/context/UIContext";
import { isSameObject } from "@/lib/function";
import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "@/services/firebase/docService";
import { toast } from "sonner";

export const useChangeDocument = () => {
  const { showLoading, closeLoading, closeModal } = useUI();
  const { data: kain, setData: updateKain } = useKain();
  const { data: karyawan, setData: updateKaryawan } = useKaryawan();
  const { data: supplier, setData: updateSupplier } = useSupplier();
  const { data: produk, setData: updateProduk } = useProduk();

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
    produkContext: {
      currentData: produk,
      updateData: updateProduk,
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
    skipOldDoc = false,
  ) => {
    if (!skipOldDoc) {
      if (isSameObject(oldDoc, newDoc)) {
        closeModal();
        toast.error("Tidak Ada Yang Di Ubah", {
          position: "top-center",
          duration: 1500,
        });
        return;
      }
    }

    const oldData = context[contextName].currentData;

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

        // OPTIMISTIC UI
        context[contextName].updateData([...oldData]);
        closeModal();
        return;
      }

      toast.success(res.message, {
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
    const oldData = context[contextName].currentData;
    try {
      closeModal();
      showLoading(loadingText);

      // OPTIMISTIC UI
      context[contextName].updateData(
        context[contextName].currentData.filter((item) => item.id !== docId),
      );

      toast.success("Berhasil Menghapus", {
        position: "top-right",
        duration: 3000,
        onAutoClose: async () => {
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

            // OPTIMISTIC UI
            context[contextName].updateData([...oldData]);
            return;
          }
        },
        action: {
          label: "Undo",
          onClick: () => {
            // OPTIMISTIC UI
            context[contextName].updateData([...oldData]);
          },
        },
      });
    } finally {
      closeLoading();
    }
  };

  const tambahDocument = async (
    loadingText,
    operationName,
    collectionName,
    newDocument,
    messageOnSucces,
    contextName,
    placement,
  ) => {
    const oldData = context[contextName].currentData;
    try {
      showLoading(loadingText);
      const res = await createDocument(
        operationName,
        collectionName,
        newDocument,
        messageOnSucces,
      );

      if (!res.success) {
        toast.error(res.message, {
          position: "top-center",
          duration: 1500,
        });

        // OPTIMISTIC UI
        context[contextName].updateData([...oldData]);
        closeModal();
        return;
      }

      toast.success(res.message, {
        position: "top-center",
        duration: 1500,
      });

      // OPTIMISTIC UI
      if (placement === "upper") {
        context[contextName].updateData([
          { ...newDocument, id: res.docId },
          ...context[contextName].currentData,
        ]);
      }

      if (placement === "lower") {
        context[contextName].updateData([
          ...context[contextName].currentData,
          { ...newDocument, id: res.docId },
        ]);
      }
      closeModal();
    } finally {
      closeLoading();
    }
  };

  return {
    editDocument,
    hapusDocument,
    tambahDocument,
  };
};
