import { formatNumber } from "@/lib/function";
import { getFinalPrice } from "@/lib/function";

export default function ProductCard({ cardData }) {
  if (!cardData) return null;
  const {
    fotoProduk,
    namaProduk,
    price,
    hpp,
    stock = 0,
    discount = 0,
    discountType,
  } = cardData;

  const finalPrice = getFinalPrice(price, discount, discountType);

  return (
    <div className="w-full max-w-sm rounded-xl border bg-white shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden min-w-96">
      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {fotoProduk ? (
          <img
            src={fotoProduk}
            alt={namaProduk}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg truncate">{namaProduk}</h3>

        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">
            Rp {formatNumber(finalPrice)}
          </span>
          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">
              Rp {formatNumber(price)}
            </span>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Stok: {stock}</span>
          {finalPrice - hpp >= 1 ? (
            <span>Profit: Rp {formatNumber(finalPrice - hpp)}</span>
          ) : null}
          {finalPrice - hpp <= 0 ? (
            <span>Rugi: Rp {formatNumber(finalPrice - hpp)}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
