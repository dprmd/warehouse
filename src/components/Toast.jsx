export default function Toast({ type, message }) {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  return (
    <div
      role="alert"
      className={`rounded-lg px-4 py-3 text-sm text-white shadow-lg animate-slide-in ${styles[type]}`}
    >
      {message}
    </div>
  );
}
