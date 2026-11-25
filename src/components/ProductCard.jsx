import { ShoppingCart } from "lucide-react";

// REVISION (Day 1): props — the parent sends one `product` object and an `onAdd` function
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="group rounded-[18px] border border-line bg-white p-3 transition hover:-translate-y-1 hover:shadow-card sm:p-4">
      <div className="aspect-[1.27] overflow-hidden rounded-[14px] bg-lavender">
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 px-1 pb-1">
        <div>
          <h3 className="text-[15px] font-semibold sm:text-[16px]">{product.name}</h3>
          <p className="mt-1.5 text-[17px] font-bold">${product.price.toFixed(2)}</p>
        </div>
        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAdd(product)}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-white hover:bg-primary-dark"
        >
          <ShoppingCart className="size-[18px]" />
        </button>
      </div>
    </article>
  );
}
