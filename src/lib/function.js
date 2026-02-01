export const normalizeString = (str) => {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
};

export const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const raw = (num) => {
  return Number(num.replace(/\./g, ""));
};

export const validateNumber = (e) => {
  // Hilangkan titik dulu biar bisa di-parse
  let raw = e.target.value.replace(/\./g, "");
  // Pastikan hanya angka
  if (!/^\d*$/.test(raw)) return;
  else return raw;
};

export const toCamelCase = (str) => {
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("");
};

export const formatTanggalJamIndonesia = (ms) => {
  const date = new Date(ms);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(date)
    .replace(",", "");
};

export const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

export const isSameObject = (oldData, newData) =>
  JSON.stringify(oldData) === JSON.stringify(newData);

export function getFinalPrice(price, discount, discountType) {
  const p = Number(price) || 0;
  const d = Number(discount) || 0;

  if (!d) return p;

  if (discountType === "percent") {
    return Math.max(p - p * (d / 100), 0);
  }

  return Math.max(p - d, 0);
}
