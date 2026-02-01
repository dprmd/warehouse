import { useSupplier } from "@/context/SupplierContext";
import { formatPrice, formatTanggalJamIndonesia } from "@/lib/function";

export default function ListMerge({ cardData }) {
  if (!cardData) return null;
  const { namaKain, quantity, quantityType, status, price, merged, from } =
    cardData;
  const { data: currentSupplier } = useSupplier();
  const supplierName = currentSupplier.find(
    (item) => item.id === from,
  ).supplierName;

  const STATUS_CONFIG = {
    ARRIVED_AT_WAREHOUSE: {
      label: "ARRIVED AT WAREHOUSE",
      statusStyle: "bg-green-100 text-green-700",
      mergedLabel: "Merged",
      notMergedLabel: "Not Merged",
      mergedStyle: "bi bi-check-circle bg-blue-100 text-blue-700",
      notMergedStyle: "bi bi-x-circle bg-red-100 text-red-700",
    },
  };
  const config = STATUS_CONFIG[status];

  return (
    <div className="rounded-2xl border border-gray-400 bg-white p-4 shadow-sm hover:shadow-md transition min-w-96">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold truncate w-60">{namaKain}</h3>
          <p className="text-sm text-gray-500">{supplierName}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm">
          {quantity} {quantityType}
        </span>
        <span className="font-bold text-base">{formatPrice(price)}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${config.statusStyle}`}
        >
          {config.label}
        </span>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${merged ? config.mergedStyle : config.notMergedStyle}`}
        >
          <span className="ml-1">
            {merged ? config.mergedLabel : config.notMergedLabel}
          </span>
        </span>
      </div>
    </div>
  );
}
