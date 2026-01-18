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
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  })
    .format(date)
    .replace(",", "");
};
