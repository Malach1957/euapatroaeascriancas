import { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_CARDS, PRODUCTS, formatBRL, HERO_IMAGE } from "./data.js";

export default function App() {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        activeCat === "all" ? true :
        activeCat === "Ofertas" ? !!p.oldPrice :
        p.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [activeCat, query]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const addToCart = (p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    setToast("✅ Produto adicionado!");
    setTimeout(() => setToast(null), 2000);
  };
  const updateQty = (id, d) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i)).filter((i) => i.qty > 0));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const toggleFav = (id) => setFavs((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const finalizarWhatsapp = () => {
    if (!cart.length) return;
    const lines = cart.map((i) => `• ${i.name} (x${i.qty}) — ${formatBRL(i.price * i.qty)}`);
    const msg = `Olá! Quero finalizar meu pedido na Eu a Patroa e as Crianças:%0A%0A${lines.join("%0A")}%0A%0A*Total:* ${formatBRL(cartTotal)}`;
    window.open(`https://wa.me/553197248-0122?text=${msg}`, "_blank");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setActiveCat("all");
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-text">
      <div className="bg-brand-green-dark text-white text-xs">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-center sm:justify-between gap-2 items-center">
          <span><i className="fa-solid fa-truck-fast mr-2" />Entrega para todo o Brasil</span>
          <span className="hidden sm:inline"><i className="fa-solid fa-shield-halved mr-2" />Compra 100% segura</span>
          <span><i className="fa-brands fa-whatsapp mr-2" />Atendimento via WhatsApp</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <a href="#" className="flex items-center gap-2 mr-auto">
            <i className="fa-solid fa-heart text-brand-pink text-2xl" />
            <div className="leading-tight">
              <div className="font-display text-brand-green text-lg sm:text-xl font-bold">Eu a Patroa e as Crianças</div>
              <div className="text-brand-gold text-[11px] font-semibold uppercase tracking-wider">Tudo para o seu lar</div>
            </div>
          </a>
          <form onSubmit={submitSearch} className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:max-w-md">
            <div className="flex">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="O que você procura?" className="flex-1 bg-brand-cream border-2 border-brand-green rounded-l-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-green/30" />
              <button className="bg-brand-green text-white px-5 rounded-r-full hover:bg-brand-green-dark transition"><i className="fa-solid fa-magnifying-glass" /></button>
            </div>
          </form>
          <div className="flex items-center gap-1 sm:gap-3 order-2 md:order-3">
            <button className="hidden sm:flex flex-col items-center text-xs hover:text-brand-green px-2"><i className="fa-regular fa-user text-lg" /><span>Conta</span></button>
            <button className="hidden sm:flex flex-col items-center text-xs hover:text-brand-gold px-2 relative">
              <i className="fa-regular fa-heart text-lg text-brand-gold" /><span>Favoritos</span>
              {favs.length > 0 && <span className="absolute -top-1 right-0 bg-brand-gold text-white text-[10px] rounded-full px-1.5">{favs.length}</span>}
            </button>
            <button onClick={() => setCartOpen(true)} className="flex flex-col items-center text-xs hover:text-brand-pink px-2 relative">
              <i className="fa-solid fa-bag-shopping text-lg" /><span>Carrinho</span>
              {cartCount > 0 && <span className="absolute -top-1 right-0 bg-brand-pink text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileNav((v) => !v)} className="lg:hidden text-brand-green text-xl px-2" aria-label="Menu"><i className="fa-solid fa-bars" /></button>
          </div>
        </div>
        <nav className={`bg-brand-green text-white ${mobileNav ? "block" : "hidden"} lg:block`}>
          <div className="container mx-auto px-4">
            <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-1 lg:gap-6 py-2 text-sm font-semibold">
              {CATEGORIES.map((c) => {
                const isOfertas = c.key === "Ofertas";
                const active = activeCat === c.key;
                return (
                  <li key={c.key}>
                    <button onClick={() => { setActiveCat(c.key); setMobileNav(false); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className={`block w-full lg:w-auto text-left px-3 py-2 rounded transition ${isOfertas ? "bg-brand-pink hover:bg-brand-pink/90 text-white" : active ? "bg-white/15" : "hover:bg-white/10"}`}>{c.label}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <section className="bg-brand-cream">
        <div className="container mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Tudo para o seu <span className="text-brand-pink text-6xl sm:text-7xl lg:text-8xl font-black italic">LAR</span><br />em um só lugar!
            </h1>
            <p className="mt-5 text-lg opacity-80 max-w-xl">Da moda da família às utilidades do dia a dia, brinquedos e material escolar. Produtos selecionados com carinho para deixar a sua casa ainda mais aconchegante.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#produtos" className="bg-brand-pink text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition shadow-lg"><i className="fa-solid fa-bag-shopping mr-2" />Ver produtos</a>
              <button onClick={() => { setActiveCat("Ofertas"); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className="border-2 border-brand-green text-brand-green font-bold px-6 py-3 rounded-full hover:bg-brand-green hover:text-white transition"><i className="fa-solid fa-tag mr-2" />Ofertas da semana</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm opacity-70">
              <span><i className="fa-solid fa-truck text-brand-green mr-2" />Frete grátis*</span>
              <span><i className="fa-solid fa-lock text-brand-green mr-2" />Pagamento seguro</span>
              <span><i className="fa-brands fa-whatsapp text-brand-green mr-2" />WhatsApp</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img src={HERO_IMAGE} alt="Família feliz em casa" className="rounded-3xl shadow-2xl w-full h-[420px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
                <i className="fa-solid fa-heart text-brand-pink text-2xl" />
                <div><div className="text-xs opacity-60">Mais de</div><div className="font-bold text-brand-green">+50 mil famílias felizes</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-brand-cream">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
          {[
            { i: "fa-truck-fast", t: "Entrega Rápida" },
            { i: "fa-credit-card", t: "Parcele em 12x" },
            { i: "fa-shield-halved", t: "Compra Segura" },
            { i: "fa-whatsapp", t: "Atendimento WhatsApp", brand: true },
            { i: "fa-award", t: "Produtos de Qualidade" },
          ].map((b, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <i className={`${b.brand ? "fa-brands" : "fa-solid"} ${b.i} text-brand-green text-2xl`} />
              <span className="font-semibold">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <h2 className="font-display text-3xl sm:text-4xl text-center font-bold text-brand-green">Navegue por categorias</h2>
        <p className="text-center opacity-70 mt-2">Encontre tudo que sua família precisa</p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORY_CARDS.map((c) => (
            <button key={c.key} onClick={() => { setActiveCat(c.key); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition text-left">
              <div className="aspect-[3/2] overflow-hidden"><img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" /></div>
              <div className="p-4"><div className="font-display font-bold text-brand-green">{c.title}</div><div className="text-xs opacity-60">{c.sub}</div></div>
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Novidades para o seu lar", img: "https://picsum.photos/id/64/600/400", cat: "Moda Família" },
            { t: "Tudo para o dia a dia!", img: "https://picsum.photos/id/431/600/400", cat: "Utilidades" },
            { t: "Diversão garantida!", img: "https://picsum.photos/id/177/600/400", cat: "Brinquedos" },
            { t: "Material Escolar", img: "https://picsum.photos/id/42/600/400", cat: "Material Escolar" },
          ].map((b) => (
            <button key={b.t} onClick={() => { setActiveCat(b.cat); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className="relative h-44 rounded-2xl overflow-hidden group shadow-md">
              <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition" />
              <div className="absolute inset-0 flex items-end p-4"><span className="font-display text-white text-xl font-bold drop-shadow">{b.t}</span></div>
            </button>
          ))}
        </div>
      </section>

      <section id="produtos" className="container mx-auto px-4 pb-16">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-green">{activeCat === "all" ? "Nossos produtos" : activeCat}</h2>
            <p className="opacity-70 text-sm mt-1">{filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}{query ? ` para "${query}"` : ""}</p>
          </div>
          {(query || activeCat !== "all") && (
            <button onClick={() => { setQuery(""); setSearch(""); setActiveCat("all"); }} className="text-sm text-brand-pink font-semibold hover:underline">Limpar filtros</button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => {
            const pix = p.price * 0.9;
            const isFav = favs.includes(p.id);
            return (
              <article key={p.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                  {p.badge && <span className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full ${p.badge === "Oferta" ? "bg-brand-pink" : "bg-brand-green"}`}>{p.badge}</span>}
                  <button onClick={() => toggleFav(p.id)} aria-label="Favoritar" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-brand-gold hover:scale-110 transition shadow"><i className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`} /></button>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-[11px] uppercase tracking-wider text-brand-green font-semibold">{p.category}</div>
                  <h3 className="font-display text-lg font-bold mt-1 line-clamp-2">{p.name}</h3>
                  <div className="mt-3">
                    {p.oldPrice && <div className="text-xs opacity-50 line-through">{formatBRL(p.oldPrice)}</div>}
                    <div className="text-2xl font-bold text-brand-pink leading-none">{formatBRL(p.price)}</div>
                    <div className="text-xs text-brand-gold font-semibold mt-1"><i className="fa-brands fa-pix mr-1" />{formatBRL(pix)} no PIX (10% off)</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => addToCart(p)} className="flex-1 bg-brand-pink text-white font-bold py-2.5 rounded-full hover:opacity-90 transition text-sm"><i className="fa-solid fa-cart-plus mr-2" />Adicionar</button>
                    <button onClick={() => toggleFav(p.id)} aria-label="Favorito" className="w-11 h-11 rounded-full border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition flex items-center justify-center"><i className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`} /></button>
                  </div>
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 opacity-60"><i className="fa-regular fa-face-frown text-4xl mb-3" /><p>Nenhum produto encontrado.</p></div>
          )}
        </div>
      </section>

      <footer className="bg-brand-green-dark text-white mt-10">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3"><i className="fa-solid fa-heart text-brand-pink text-xl" /><span className="font-display font-bold text-lg">Eu a Patroa e as Crianças</span></div>
            <p className="text-white/70">A magazine da família brasileira. Produtos com carinho para o seu lar.</p>
            <div className="flex gap-3 mt-4 text-lg">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-pink flex items-center justify-center transition"><i className="fa-brands fa-instagram" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-pink flex items-center justify-center transition"><i className="fa-brands fa-facebook-f" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-whatsapp flex items-center justify-center transition"><i className="fa-brands fa-whatsapp" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-pink flex items-center justify-center transition"><i className="fa-brands fa-tiktok" /></a>
            </div>
          </div>
          <div><h4 className="font-display font-bold mb-3 text-brand-gold">Categorias</h4><ul className="space-y-2 text-white/80"><li>Moda Família</li><li>Moda Infantil</li><li>Cama Mesa Banho</li><li>Brinquedos</li><li>Material Escolar</li></ul></div>
          <div><h4 className="font-display font-bold mb-3 text-brand-gold">Informações</h4><ul className="space-y-2 text-white/80"><li>Sobre a loja</li><li>Trocas e devoluções</li><li>Política de privacidade</li><li>Formas de pagamento</li><li>Política de entrega</li></ul></div>
          <div><h4 className="font-display font-bold mb-3 text-brand-gold">Contato</h4><ul className="space-y-2 text-white/80"><li><i className="fa-brands fa-whatsapp mr-2" />(31) 99999-9999</li><li><i className="fa-regular fa-envelope mr-2" />contato@patroaecriancas.com.br</li><li><i className="fa-regular fa-clock mr-2" />Seg a Sáb, 9h às 18h</li></ul></div>
        </div>
        <div className="border-t border-white/10"><div className="container mx-auto px-4 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} Eu a Patroa e as Crianças — Todos os direitos reservados.</div></div>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-brand-green text-white">
              <h3 className="font-display font-bold text-lg"><i className="fa-solid fa-bag-shopping mr-2" />Meu carrinho</h3>
              <button onClick={() => setCartOpen(false)} className="text-white/90 hover:text-white text-xl"><i className="fa-solid fa-xmark" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 && <div className="text-center py-16 opacity-60"><i className="fa-solid fa-bag-shopping text-4xl mb-3" /><p>Seu carrinho está vazio.</p></div>}
              {cart.map((i) => (
                <div key={i.id} className="flex gap-3 bg-brand-cream rounded-xl p-3">
                  <img src={i.image} alt={i.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">1
                    <div className="font-semibold text-sm line-clamp-2">{i.name}</div>
                    <div className="text-brand-pink font-bold mt-1">{formatBRL(i.price)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(i.id, -1)} className="w-7 h-7 rounded-full bg-white border text-sm">−</button>
                      <span className="font-semibold text-sm w-5 text-center">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, +1)} className="w-7 h-7 rounded-full bg-white border text-sm">+</button>
                      <button onClick={() => removeItem(i.id)} className="ml-auto text-brand-pink text-sm hover:underline"><i className="fa-regular fa-trash-can" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4 space-y-3 bg-white">
              <div className="flex justify-between items-center"><span className="font-semibold">Total</span><span className="text-2xl font-bold text-brand-pink">{formatBRL(cartTotal)}</span></div>
              <button onClick={finalizarWhatsapp} disabled={!cart.length} className="w-full bg-brand-whatsapp text-white font-bold py-3 rounded-full hover:opacity-90 transition disabled:opacity-50"><i className="fa-brands fa-whatsapp mr-2" />Finalizar pelo WhatsApp</button>
              <button onClick={() => setCartOpen(false)} className="w-full border-2 border-brand-green text-brand-green font-bold py-2.5 rounded-full hover:bg-brand-green hover:text-white transition">Continuar comprando</button>
            </div>
          </aside>
        </div>
      )}

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-brand-green text-white px-5 py-3 rounded-full shadow-2xl font-semibold">{toast}</div>}
    </div>
  );
}
