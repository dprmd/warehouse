export default function FloatingAddButton({ onClick, title = "Tambah" }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full bg-blue-600 text-white
        shadow-lg transition
        hover:bg-blue-700 hover:shadow-xl
        focus:outline-none focus:ring-4 focus:ring-blue-300
        active:scale-95
      "
    >
      <i className="bi bi-plus text-2xl"></i>
    </button>
  );
}
