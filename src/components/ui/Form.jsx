import { forwardRef } from "react";

// =========================
// Form Wrapper
// =========================
export function Form({ children, onSubmit, className = "" }) {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  );
}

// =========================
// Form Group
// =========================
export function FormGroup({ children, className = "" }) {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
}

// =========================
// Label
// =========================
export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

// =========================
// Input (Uncontrolled / default)
// =========================
export const Input = forwardRef(function Input(
  { error, className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={
        `rounded-lg border px-3 py-2 text-sm outline-none transition ` +
        (error
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500") +
        ` ${className}`
      }
    />
  );
});

// =========================
// InputControlled
// =========================
export function InputControlled({
  value,
  onChange,
  error,
  className = "",
  ...props
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value, e)}
      {...props}
      className={
        `rounded-lg border px-3 py-2 text-sm outline-none transition ` +
        (error
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500") +
        ` ${className}`
      }
    />
  );
}

// =========================
// Textarea
// =========================
export const Textarea = forwardRef(function Textarea(
  { error, className = "", value, onChange, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value, e)}
      className={
        `rounded-lg border px-3 py-2 text-sm outline-none transition resize-none ` +
        (error
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500") +
        ` ${className}`
      }
    />
  );
});

// =========================
// Select
// =========================
export function Select({ error, className = "", children, ...props }) {
  return (
    <select
      {...props}
      className={
        `rounded-lg border px-3 py-2 text-sm outline-none transition ` +
        (error
          ? "border-red-500 focus:ring-2 focus:ring-red-500"
          : "border-gray-300 focus:ring-2 focus:ring-blue-500") +
        ` ${className}`
      }
    >
      {children}
    </select>
  );
}

// =========================
// Error Message
// =========================
export function ErrorMessage({ children }) {
  if (!children) return null;
  return <p className="text-xs text-red-500">{children}</p>;
}

// =========================
// Button
// =========================
export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "rounded-lg px-4 py-2 text-sm font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    disabled: "bg-gray-500 text-gray-100 cursor-not-allowed",
  };

  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// =========================
// Custom Select (Controlled)
// =========================n
import { useState, useRef, useEffect } from "react";

export function SelectControlled({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  error,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          `w-full rounded-lg border px-3 py-2 text-left text-sm flex items-center justify-between ` +
          (error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500")
        }
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected?.label || placeholder}
        </span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-lg">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value, opt);
                setOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 ${
                opt.value === value ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
