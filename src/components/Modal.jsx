import { useEffect } from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  onClose,
  title,

  // 👉 opsional
  contentText,
  children,

  // 👉 tombol next
  nextText,
  onNext,
  nextDisabled = false,
  closeDisabled = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showNext = nextText && onNext;

  return (
    <div className="px-2 fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        {/* Optional content text */}
        {contentText && (
          <p className="mb-4 text-sm text-gray-600">{contentText}</p>
        )}

        {/* Custom content */}
        {children && <div className="text-sm text-gray-700">{children}</div>}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          {!closeDisabled && (
            <button
              onClick={() => {
                onClose();
                setIsOpen(false);
              }}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
            >
              Tutup
            </button>
          )}

          {showNext && (
            <button
              onClick={onNext}
              disabled={nextDisabled}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white
                         hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {nextText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
