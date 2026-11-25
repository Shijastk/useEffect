import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import OrderForm from "./components/OrderForm";

const API_URL = "http://localhost:3001";

export default function App() {
  const [products, setProducts] = useState([]); // the data
  const [loading, setLoading] = useState(true); // are we waiting?
  const [error, setError] = useState(null); // did something go wrong?
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // STEP 1: an effect that runs after EVERY render (no dependency array)
  // useEffect(() => { console.log("rendered") });

  // STEP 2: an effect that runs ONCE, after the first render (empty array)
  // useEffect(() => { console.log("mounted") }, []);

  // STEP 3-6: fetch products. Runs once, and again every time `search` changes.
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/products?q=${search}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    // CLEANUP: if `search` changes before the answer arrives, cancel the old request
    return () => controller.abort();
  }, [search]);

  // A second, small effect: keep the browser tab title in sync with the cart
  useEffect(() => {
    document.title = `(${cart.length}) Anti Bakery`;
  }, [cart.length]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <>
      <Navbar cartCount={cart.length} />

      <main>
        <section className="container-x mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-[32px] font-medium sm:text-[40px]">Our Bestsellers</h2>
            <input
              className="input max-w-xs"
              placeholder="Search cakes, cookies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading && <p className="mt-8 text-muted">Loading fresh cakes... 🧁</p>}

          {error && (
            <p className="mt-8 rounded-xl bg-pink-soft p-4 text-pink">
              Could not load products: {error}. Is <code>npm run api</code> running?
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="mt-8 text-muted">No products match "{search}".</p>
          )}

          {!loading && !error && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        <OrderForm />
      </main>
    </>
  );
}
