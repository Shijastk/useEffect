import { useState } from "react";

const API_URL = "http://localhost:3001";
const emptyForm = { name: "", phone: "", message: "" };

export default function OrderForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Sending data happens in an EVENT HANDLER, not in useEffect —
  // it is caused by a click, not by the component appearing.
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();

      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="order" className="container-x my-20">
      <div className="mx-auto max-w-xl rounded-[26px] bg-lavender p-8 sm:p-10">
        <h2 className="font-serif text-[32px] font-medium">Place an Order</h2>
        <p className="mt-2 text-muted">Tell us what you would like and we will call you back.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input className="input" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input className="input" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
          <textarea
            className="input h-28 py-3"
            name="message"
            placeholder="What would you like to order?"
            value={form.message}
            onChange={handleChange}
          />
          <button className="btn btn-primary h-12 text-[15px] disabled:opacity-60" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Order"}
          </button>

          {status === "sent" && <p className="text-primary">Thank you! Your order was saved. Check db.json 🎉</p>}
          {status === "error" && <p className="text-pink">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
