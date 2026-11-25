import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const links = ["Home", "Menu", "About Us", "Contact"];

// REVISION (Day 1 + Day 2): a component, a list with .map(), and useState for the mobile menu
export default function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <nav className="container-x flex h-20 items-center justify-between">
        <a href="#" className="font-script text-[44px] leading-none text-primary">
          Anti
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="text-[15px] font-medium hover:text-primary">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <button aria-label="Cart" className="relative hover:text-primary">
            <ShoppingBag className="size-[22px]" strokeWidth={1.7} />
            <span className="absolute -right-1.5 -top-1.5 grid size-[16px] place-items-center rounded-full bg-pink text-[9px] font-bold text-white">
              {cartCount}
            </span>
          </button>
          <a href="#order" className="btn btn-primary hidden h-10 px-6 text-sm sm:inline-flex">
            Order Now
          </a>
          <button aria-label="Toggle menu" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="container-x flex flex-col border-t border-line py-3 lg:hidden">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="block py-3 font-medium hover:text-primary">
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
