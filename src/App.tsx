import { useState } from "react";

type Page = "home" | "shop" | "product" | "cart" | "contact";
type Product = {
  id: number;
  name: string;
  category: "Hoodies" | "T-Shirts";
  price: number;
  color: string;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Everyday Heavy Hoodie", category: "Hoodies", price: 84, color: "Sage", image: "https://images.unsplash.com/photo-1685354218056-cb10c98b8c88?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Core Zip Hoodie", category: "Hoodies", price: 92, color: "Onyx", image: "https://images.unsplash.com/photo-1616335599168-2ecd8293ae35?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Studio Oversized Tee", category: "T-Shirts", price: 48, color: "Bone", image: "https://images.unsplash.com/photo-1789110854086-fd55cb767e94?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Form Boxy Tee", category: "T-Shirts", price: 44, color: "Black", image: "https://images.unsplash.com/photo-1789110854055-fc924935fd09?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Archive Blue Hoodie", category: "Hoodies", price: 88, color: "Cobalt", image: "https://images.unsplash.com/photo-1640837159351-f58475279ae8?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Weekend Relaxed Tee", category: "T-Shirts", price: 46, color: "Cream", image: "https://images.unsplash.com/photo-1780566759999-4dbaa4218959?auto=format&fit=crop&w=900&q=85" },
];

const galleryPhotos = [
  "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1561151593-7059b6b4ff57?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1565978771542-0db9ab9ad3de?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1619708443838-df616a72bb74?auto=format&fit=crop&w=1000&q=85",
];
const galleryLabels = ["Front", "Back", "Left side", "Right side", "Full"];
const colorOptions = [
  { name: "Oxblood", value: "#741f2c" },
  { name: "Onyx", value: "#22201e" },
  { name: "Stone", value: "#b8ad9d" },
  { name: "Forest", value: "#34463b" },
];

function Icon({ name, className = "size-5" }: { name: "bag" | "arrow" | "menu" | "close" | "minus" | "plus" | "trash"; className?: string }) {
  const paths = {
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selected, setSelected] = useState(products[0]);
  const [galleryView, setGalleryView] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name);
  const [filter, setFilter] = useState("All");
  const [size, setSize] = useState("M");
  const [cart, setCart] = useState<Record<number, number>>({ 3: 1 });
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const navigate = (next: Page) => {
    setPage(next);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openProduct = (product: Product) => {
    setSelected(product);
    setGalleryView(0);
    setSelectedColor(product.color);
    navigate("product");
  };
  const addToCart = () => {
    setCart((current) => ({ ...current, [selected.id]: (current[selected.id] || 0) + 1 }));
    setNotice(`${selected.name} · ${selectedColor} · ${size} added to bag`);
    setTimeout(() => setNotice(""), 2400);
  };
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartItems = products.filter((product) => cart[product.id]);
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const Header = () => (
    <>
      <div className="bg-[#741f2c] px-4 py-2 text-center text-[11px] font-semibold tracking-[.16em] text-white uppercase">Free shipping on orders over $100</div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f4ed]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate("home")} className="text-xl font-black tracking-[-.05em]">COMMON/FORM</button>
          <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
            {(["home", "shop", "contact"] as Page[]).map((item) => <button key={item} onClick={() => navigate(item)} className={`nav-link capitalize ${page === item ? "active" : ""}`}>{item}</button>)}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("cart")} className="relative flex items-center gap-2 text-sm font-semibold" aria-label="Open shopping bag">
              <Icon name="bag" /><span className="hidden sm:inline">Bag</span><span className="flex size-5 items-center justify-center rounded-full bg-black text-[10px] text-white">{cartCount}</span>
            </button>
            <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Icon name={menu ? "close" : "menu"} /></button>
          </div>
        </div>
        {menu && <div className="border-t border-black/10 bg-[#f7f4ed] p-5 md:hidden">{(["home", "shop", "contact"] as Page[]).map((item) => <button key={item} onClick={() => navigate(item)} className="block w-full border-b border-black/10 py-4 text-left text-xl capitalize">{item}</button>)}</div>}
      </header>
    </>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <article className="group cursor-pointer" onClick={() => openProduct(product)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e5dc]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <button className="absolute right-4 bottom-4 translate-y-2 bg-white px-5 py-3 text-xs font-bold opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">View product</button>
      </div>
      <div className="flex justify-between gap-4 pt-4">
        <div><h3 className="font-semibold">{product.name}</h3><p className="mt-1 text-sm text-black/50">{product.color}</p></div>
        <p className="font-semibold">${product.price}</p>
      </div>
    </article>
  );

  const Home = () => (
    <main>
      <section className="mx-auto grid min-h-[680px] max-w-[1440px] grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20">
          <p className="mb-6 text-xs font-bold tracking-[.22em] text-[#741f2c] uppercase">Spring / Summer 2025</p>
          <h1 className="max-w-2xl text-6xl leading-[.88] font-black tracking-[-.065em] sm:text-7xl lg:text-[104px]">Made for<br />every day.</h1>
          <p className="mt-8 max-w-md text-base leading-7 text-black/60">Elevated essentials, considered down to the last stitch. Heavyweight comfort made to live in.</p>
          <button onClick={() => navigate("shop")} className="mt-10 flex w-fit items-center gap-8 bg-[#1d1b19] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#741f2c]">Shop the collection <Icon name="arrow" /></button>
        </div>
        <div className="relative min-h-[560px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1643104896927-813af6d10f8a?auto=format&fit=crop&w=1200&q=90" alt="Model wearing relaxed streetwear" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute right-5 bottom-5 bg-[#f7f4ed] px-5 py-4 text-xs"><span className="block font-bold">NEW DROP 01</span><span className="mt-1 block text-black/50">Built for the in-between</span></div>
        </div>
      </section>
      <section className="border-y border-black/10 bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Freshly landed</p><h2 className="section-title">The new uniform</h2></div><button onClick={() => navigate("shop")} className="hidden items-center gap-3 text-sm font-bold md:flex">View all <Icon name="arrow" /></button></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
      <section className="grid bg-[#211d1a] text-white md:grid-cols-2">
        <div className="min-h-[500px]"><img src="https://images.unsplash.com/photo-1789110854055-fc924935fd09?auto=format&fit=crop&w=1100&q=85" alt="Black oversized t-shirt" className="h-full w-full object-cover object-top" /></div>
        <div className="flex flex-col justify-center px-7 py-20 md:px-16"><p className="eyebrow !text-[#d8a7a0]">Our standard</p><h2 className="mt-4 text-5xl font-semibold tracking-[-.035em] md:text-7xl">Less noise.<br />Better clothes.</h2><p className="mt-7 max-w-md leading-7 text-white/65">We focus on responsible fabrics, exacting fits, and the pieces you reach for without thinking.</p></div>
      </section>
    </main>
  );

  const Shop = () => {
    const visible = filter === "All" ? products : products.filter((product) => product.category === filter);
    return <main className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-10 md:flex-row md:items-end">
        <div><p className="eyebrow">Shop all</p><h1 className="section-title mt-2">Essentials, refined.</h1></div>
        <p className="max-w-sm text-sm leading-6 text-black/55">Everyday layers in premium, substantial cotton. Designed to get better with wear.</p>
      </div>
      <div className="my-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex gap-2">{["All", "Hoodies", "T-Shirts"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${filter === item ? "border-black bg-black text-white" : "border-black/20 hover:border-black"}`}>{item}</button>)}</div>
        <span className="text-xs text-black/45">{visible.length} PRODUCTS</span>
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </main>;
  };

  const ProductPage = () => (
    <>
    <main className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.15fr_.85fr]">
      <div className="min-h-0 bg-[#e9e5dc] p-3 md:p-5 lg:h-[720px] xl:h-[790px]">
        <div className="grid h-full grid-rows-[1fr_auto] gap-3 md:grid-cols-[92px_1fr] md:grid-rows-1 md:gap-5">
          <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
            {[selected.image, ...galleryPhotos].map((image, index) => (
              <button
                key={`${selected.id}-${index}`}
                onClick={() => setGalleryView(index)}
                className={`group relative aspect-[4/5] w-[72px] shrink-0 overflow-hidden border-2 bg-white md:w-full md:min-h-0 ${galleryView === index ? "border-[#741f2c]" : "border-transparent"}`}
                aria-label={`View ${galleryLabels[index]} preview`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
                <span className={`absolute inset-x-0 bottom-0 bg-black/70 px-1 py-1.5 text-[8px] font-bold tracking-wide text-white uppercase transition ${galleryView === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{galleryLabels[index]}</span>
              </button>
            ))}
          </div>
          <div className="order-1 min-h-0 overflow-hidden bg-[#dedbd3] md:order-2">
            <img
              key={galleryView}
              src={[selected.image, ...galleryPhotos][galleryView]}
              alt={`${selected.name} — ${galleryLabels[galleryView]} preview`}
              className="h-full w-full animate-[gallery-in_.3s_ease-out] object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-14 md:px-16 lg:px-20">
        <button onClick={() => navigate("shop")} className="mb-10 w-fit text-xs font-bold tracking-widest text-black/45 uppercase">← Back to shop</button>
        <p className="eyebrow">{selected.category}</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-.045em] md:text-6xl">{selected.name}</h1>
        <div className="mt-5 flex items-center gap-3"><p className="text-xl font-semibold">${selected.price}.00</p><p className="text-base text-black/35 line-through">${Math.round(selected.price * 1.25)}.00</p><span className="rounded-full bg-[#741f2c]/10 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#741f2c] uppercase">Save 20%</span></div>
        <p className="mt-7 max-w-lg leading-7 text-black/55">A relaxed essential cut from substantial 460gsm cotton. Garment washed for a broken-in feel from day one, with shape that holds season after season.</p>
        <div className="mt-9 border-t border-black/10 pt-8">
          <div className="mb-4 flex items-center justify-between text-sm"><span className="font-bold">Select color</span><span className="text-black/45">{selectedColor}</span></div>
          <div className="flex gap-3">{colorOptions.map((color) => <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`flex size-10 items-center justify-center rounded-full border transition ${selectedColor === color.name ? "border-black" : "border-transparent"}`} aria-label={`Select ${color.name}`} title={color.name}><span className="size-7 rounded-full border border-black/10" style={{ backgroundColor: color.value }} /></button>)}</div>
        </div>
        <div className="mt-8"><div className="mb-4 flex justify-between text-sm"><span className="font-bold">Select size</span><button className="text-black/50 underline">Size guide</button></div><div className="grid grid-cols-5 gap-2">{["XS", "S", "M", "L", "XL"].map((item) => <button key={item} onClick={() => setSize(item)} className={`border py-3 text-sm font-bold ${size === item ? "border-black bg-black text-white" : "border-black/20"}`}>{item}</button>)}</div></div>
        <button onClick={addToCart} className="mt-6 flex w-full items-center justify-center gap-4 bg-[#741f2c] py-5 font-bold text-white transition hover:bg-[#1d1b19]"><Icon name="bag" />Add to bag — ${selected.price}</button>
        <div className="mt-8 grid grid-cols-3 border-y border-black/10 py-5 text-center text-[10px] font-bold tracking-wider uppercase"><span>Premium cotton</span><span>Easy returns</span><span>Secure checkout</span></div>
      </div>
    </main>
    <section className="border-y border-black/10 bg-white px-5 py-20 md:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div><p className="eyebrow">The details</p><h2 className="mt-3 text-4xl md:text-5xl">Made to live in.</h2></div>
        <div><p className="text-lg leading-8 text-black/65">Built around comfort without compromising structure, this {selected.category === "Hoodies" ? "hoodie" : "T-shirt"} uses long-staple cotton for a smooth hand feel and lasting shape. The relaxed silhouette layers naturally and is finished with reinforced seams at every stress point.</p><div className="mt-10 grid gap-7 border-t border-black/10 pt-8 sm:grid-cols-3"><div><p className="text-xs font-bold tracking-wider uppercase">Fabric</p><p className="mt-2 text-sm leading-6 text-black/50">100% premium cotton, pre-washed for softness.</p></div><div><p className="text-xs font-bold tracking-wider uppercase">Fit</p><p className="mt-2 text-sm leading-6 text-black/50">Relaxed, true to size. Size down for a closer fit.</p></div><div><p className="text-xs font-bold tracking-wider uppercase">Care</p><p className="mt-2 text-sm leading-6 text-black/50">Cold wash inside out. Hang dry for best results.</p></div></div></div>
      </div>
    </section>
    <section className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1360px]"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">You may also like</p><h2 className="mt-3 text-4xl md:text-5xl">Related products</h2></div><button onClick={() => navigate("shop")} className="hidden items-center gap-3 text-sm font-bold sm:flex">Shop all <Icon name="arrow" /></button></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.filter((product) => product.id !== selected.id).sort((a, b) => Number(b.category === selected.category) - Number(a.category === selected.category)).slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div></div>
    </section>
    </>
  );

  const Cart = () => (
    <main className="mx-auto min-h-[70vh] max-w-[1200px] px-5 py-16 md:px-10">
      <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-8"><h1 className="section-title">Your bag</h1><span className="text-sm text-black/50">{cartCount} {cartCount === 1 ? "item" : "items"}</span></div>
      {!cartItems.length ? <div className="py-24 text-center"><h2 className="text-3xl font-bold">Your bag is feeling light.</h2><button onClick={() => navigate("shop")} className="mt-8 bg-black px-8 py-4 text-sm font-bold text-white">Explore the collection</button></div> :
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>{cartItems.map((product) => <div key={product.id} className="grid grid-cols-[110px_1fr] gap-5 border-b border-black/10 py-6 sm:grid-cols-[140px_1fr_auto]">
          <img src={product.image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" />
          <div className="flex flex-col justify-between py-1"><div><p className="text-xs text-black/45">{product.category}</p><h3 className="mt-1 font-bold">{product.name}</h3><p className="mt-1 text-sm text-black/50">{product.color} / M</p></div><div className="mt-4 flex w-fit items-center border border-black/15"><button onClick={() => setCart((c) => ({ ...c, [product.id]: Math.max(1, c[product.id] - 1) }))} className="p-2"><Icon name="minus" className="size-4" /></button><span className="w-8 text-center text-sm">{cart[product.id]}</span><button onClick={() => setCart((c) => ({ ...c, [product.id]: c[product.id] + 1 }))} className="p-2"><Icon name="plus" className="size-4" /></button></div></div>
          <div className="col-start-2 flex items-center justify-between sm:col-start-3 sm:flex-col sm:items-end"><p className="font-bold">${product.price * cart[product.id]}</p><button onClick={() => setCart((c) => { const next = { ...c }; delete next[product.id]; return next; })} className="text-black/40 hover:text-[#741f2c]" aria-label={`Remove ${product.name}`}><Icon name="trash" /></button></div>
        </div>)}</div>
        <aside className="h-fit bg-white p-7"><h2 className="text-xl font-bold">Order summary</h2><div className="mt-7 space-y-4 border-b border-black/10 pb-6 text-sm"><div className="flex justify-between"><span className="text-black/55">Subtotal</span><span>${subtotal}.00</span></div><div className="flex justify-between"><span className="text-black/55">Shipping</span><span>{subtotal >= 100 ? "Free" : "$8.00"}</span></div></div><div className="flex justify-between py-6 text-lg font-bold"><span>Total</span><span>${subtotal + (subtotal >= 100 ? 0 : 8)}.00</span></div><button className="w-full bg-[#741f2c] py-4 font-bold text-white hover:bg-[#1d1b19]">Secure checkout</button><p className="mt-4 text-center text-xs text-black/40">Taxes calculated at checkout</p></aside>
      </div>}
    </main>
  );

  const Contact = () => (
    <main className="mx-auto grid min-h-[720px] max-w-[1440px] md:grid-cols-2">
      <div className="bg-[#211d1a] px-7 py-20 text-white md:px-16 lg:px-24"><p className="eyebrow !text-[#d8a7a0]">Get in touch</p><h1 className="mt-5 text-6xl font-semibold tracking-[-.04em] lg:text-8xl">We’re here<br />to help.</h1><p className="mt-8 max-w-md leading-7 text-white/60">Questions about fit, fabric, your order, or anything else? Our small team answers every message.</p><div className="mt-16 space-y-7 text-sm"><div><p className="text-white/40">Email</p><p className="mt-1 font-bold">hello@commonform.co</p></div><div><p className="text-white/40">Customer care</p><p className="mt-1 font-bold">Mon–Fri, 9am–5pm EST</p></div></div></div>
      <form onSubmit={(event) => { event.preventDefault(); setNotice("Message sent — we’ll be in touch soon"); }} className="flex flex-col justify-center px-7 py-16 md:px-16 lg:px-24"><h2 className="text-3xl font-bold">Send us a note</h2><div className="mt-10 grid gap-7 sm:grid-cols-2"><label className="field">First name<input required placeholder="Alex" /></label><label className="field">Email<input required type="email" placeholder="alex@email.com" /></label></div><label className="field mt-7">Topic<select><option>Order support</option><option>Sizing & product</option><option>Returns</option><option>Something else</option></select></label><label className="field mt-7">Message<textarea required rows={5} placeholder="How can we help?" /></label><button className="mt-8 flex w-fit items-center gap-8 bg-black px-8 py-4 text-sm font-bold text-white">Send message <Icon name="arrow" /></button></form>
    </main>
  );

  return <div className="min-h-screen bg-[#f7f4ed] text-[#1d1b19]"><Header />{page === "home" && <Home />}{page === "shop" && <Shop />}{page === "product" && <ProductPage />}{page === "cart" && <Cart />}{page === "contact" && <Contact />}
    {notice && <div className="fixed right-5 bottom-24 z-50 bg-[#1d1b19] px-6 py-4 text-sm font-semibold text-white shadow-2xl">{notice}</div>}
    <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true"><path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.78L2 22l5.37-1.4A9.98 9.98 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.1-1.12l-.3-.18-3.19.84.85-3.1-.2-.32a8.1 8.1 0 1 1 6.94 3.88Zm4.44-6.05c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21a7.37 7.37 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.25-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.31-.75-1.8-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03 0 1.19.87 2.35.99 2.51.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"/></svg>
    </a>
    <footer className="relative border-t border-white/10 bg-[#211d1a] px-5 pt-16 pb-7 text-white md:px-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_.7fr_.8fr_1fr]">
          <div><button onClick={() => navigate("home")} className="text-2xl font-bold tracking-[-.04em]">COMMON/FORM</button><p className="mt-4 max-w-xs text-sm leading-6 text-white/50">Premium everyday clothing, thoughtfully cut and responsibly made for a wardrobe that lasts.</p></div>
          <div><p className="mb-5 text-xs font-bold tracking-[.18em] text-white/40 uppercase">Explore</p><div className="flex flex-col items-start gap-3 text-sm"><button onClick={() => navigate("shop")}>Shop all</button><button onClick={() => navigate("shop")}>Hoodies</button><button onClick={() => navigate("shop")}>T-Shirts</button></div></div>
          <div><p className="mb-5 text-xs font-bold tracking-[.18em] text-white/40 uppercase">Help</p><div className="flex flex-col items-start gap-3 text-sm"><button onClick={() => navigate("contact")}>Contact</button><span>Shipping & returns</span><span>Size guide</span></div></div>
          <div><p className="mb-5 text-xs font-bold tracking-[.18em] text-white/40 uppercase">Contact</p><a href="mailto:hello@commonform.co" className="text-sm underline decoration-white/25 underline-offset-4 hover:decoration-white">hello@commonform.co</a><div className="mt-6 flex gap-4 text-sm text-white/60"><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></div></div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row"><span>© 2025 Common/Form. All rights reserved.</span><span>Privacy · Terms</span></div>
      </div>
    </footer>
  </div>;
}
