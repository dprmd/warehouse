import { useEffect } from "react";

export default function Alert({
  show,
  type = "info", // success | error | warning | info
  message,
  onClose,
  autoClose = false,
  duration = 3000,
}) {
  useEffect(() => {
    if (autoClose && show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, duration, onClose]);

  if (!show) return null;

  const styles = {
    success: "bg-green-50 text-green-700 border-green-200",
    error: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-lg border p-4 text-sm shadow-sm ${styles[type]}`}
      role="alert"
    >
      <span>{message}</span>

      <button
        onClick={onClose}
        className="text-lg leading-none opacity-60 transition hover:opacity-100"
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
}
