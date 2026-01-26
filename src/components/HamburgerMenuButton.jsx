export default function HamburgerMenuButton({ open = false, onToggle }) {
  return (
    <button
      onClick={() => onToggle?.(!open)}
      aria-label="Toggle navigation"
      className="relative w-10 h-10 flex items-center justify-center"
    >
      <div className="relative w-6 h-6">
        {/* Top line */}
        <span
          className={`absolute left-0 top-1/2 h-0.5 w-6 bg-gray-800
            transition-all duration-500
            ${open ? "rotate-45 translate-y-0" : "-translate-y-2"}
          `}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Middle line */}
        <span
          className={`absolute left-0 top-1/2 h-0.5 w-6 bg-gray-800
            transition-all duration-300
            ${open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}
          `}
        />

        {/* Bottom line */}
        <span
          className={`absolute left-0 top-1/2 h-0.5 w-6 bg-gray-800
            transition-all duration-500
            ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}
          `}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </button>
  );
}
