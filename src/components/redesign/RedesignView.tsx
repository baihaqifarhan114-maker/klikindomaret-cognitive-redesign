"use client";

import React, { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Store,
  Tag,
  Trash2,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  PRODUCTS,
  REAL_BANNERS,
  REDESIGN_CATEGORIES,
  STORE_BRANCHES,
  formatRupiah,
  type Product,
  type RedesignCategoryId,
  type StoreBranch,
} from "@/data/catalog";
import { KlikLogo } from "@/components/shared/KlikLogo";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { AnnotationPin } from "@/components/shared/AnnotationPin";
import { CheckoutFlow, type CartEntry } from "@/components/redesign/CheckoutFlow";

interface RedesignViewProps {
  isMobile: boolean;
  showAnnotations: boolean;
  activeAnnotation: string | null;
  onSelectAnnotation: (id: string | null) => void;
  resetSignal: number;
}

const QUICK_SEARCH_CHIPS = ["minyak goreng", "beras", "indomie", "susu", "deterjen"];

export function RedesignView({
  isMobile,
  showAnnotations,
  activeAnnotation,
  onSelectAnnotation,
  resetSignal,
}: RedesignViewProps) {
  const [selectedBranch, setSelectedBranch] = useState<StoreBranch>(STORE_BRANCHES[0]);
  const [deliveryMode, setDeliveryMode] = useState<"xpress" | "pickup">("xpress");
  const [showBranchModal, setShowBranchModal] = useState(false);

  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RedesignCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [promoOnly, setPromoOnly] = useState(false);
  const [hideOutOfStock, setHideOutOfStock] = useState(true);
  const [sortBy, setSortBy] = useState<"relevant" | "lowest">("relevant");
  const [heroIdx, setHeroIdx] = useState(0);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [inCheckout, setInCheckout] = useState(false);

  React.useEffect(() => {
    setSelectedBranch(STORE_BRANCHES[0]);
    setDeliveryMode("xpress");
    setSelectedCategory("all");
    setSearchQuery("");
    setPromoOnly(false);
    setHideOutOfStock(true);
    setSortBy("relevant");
    setCart({});
    setCartDrawerOpen(false);
    setInCheckout(false);
    setCategoryMenuOpen(false);
  }, [resetSignal]);

  const getStock = (p: Product) => p.stockByBranch[selectedBranch.id] ?? 0;

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory) return false;
      if (promoOnly && !p.originalPrice) return false;
      if (hideOutOfStock && getStock(p) <= 0) return false;
      if (q) {
        const hitName = p.name.toLowerCase().includes(q);
        const hitBrand = p.brand.toLowerCase().includes(q);
        const hitKey = p.keywords.some((k) => k.includes(q));
        return hitName || hitBrand || hitKey;
      }
      return true;
    });

    if (sortBy === "lowest") {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [selectedCategory, promoOnly, hideOutOfStock, searchQuery, sortBy, selectedBranch]);

  const hiddenOosCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory) return false;
      if (promoOnly && !p.originalPrice) return false;
      if (q) {
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.includes(q));
        if (!hit) return false;
      }
      return getStock(p) <= 0;
    }).length;
  }, [selectedCategory, promoOnly, searchQuery, selectedBranch]);

  const cartEntries: CartEntry[] = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return product ? { product, qty } : null;
      })
      .filter((x): x is CartEntry => Boolean(x));
  }, [cart]);

  const totalItems = cartEntries.reduce((s, e) => s + e.qty, 0);
  const netSubtotal = cartEntries.reduce((s, e) => s + e.product.price * e.qty, 0);
  const rawSubtotal = cartEntries.reduce(
    (s, e) => s + (e.product.originalPrice ?? e.product.price) * e.qty,
    0
  );
  const productSavings = rawSubtotal - netSubtotal;
  const autoVoucher = netSubtotal >= 50000 ? 5000 : 0;
  const shippingFee =
    deliveryMode === "pickup" || netSubtotal >= selectedBranch.freeShippingThreshold
      ? 0
      : selectedBranch.deliveryFee;
  const freeShipRemaining = Math.max(0, selectedBranch.freeShippingThreshold - netSubtotal);
  const totalPayable = Math.max(0, netSubtotal - autoVoucher + shippingFee);

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[productId] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const activeCategoryObj = REDESIGN_CATEGORIES.find((c) => c.id === selectedCategory);
  const currentHero = REAL_BANNERS.hero[heroIdx];

  return (
    <div
      className="relative bg-[#F7F9FC] text-klik-ink min-h-[760px] flex flex-col"
      onClick={() => {
        setCategoryMenuOpen(false);
        onSelectAnnotation(null);
      }}
    >
      {/* Authentic GDV Klik Indomaret Header (Zero Meta-Copy) */}
      <header className="sticky top-0 z-30 bg-white border-b border-klik-border klik-nav-shadow">
        {!isMobile && (
          <div className="bg-klik-surface h-8 border-b border-klik-border/70">
            <div className="max-w-klik mx-auto h-full px-4 flex items-center justify-between text-xs text-klik-ink-secondary">
              <span className="inline-flex items-center gap-1.5 text-klik-ink-secondary">
                <Smartphone className="w-3.5 h-3.5 text-klik-blue" />
                Download Aplikasi Klik Indomaret
              </span>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setInCheckout(false);
                    setPromoOnly(true);
                    setSelectedCategory("all");
                  }}
                  className="hover:text-klik-blue"
                >
                  Promo Hari Ini
                </button>
                <span className="hover:text-klik-blue cursor-pointer">Tentang Klik Indomaret</span>
                <span className="text-klik-ink-muted">Bantuan 1500-280</span>
              </div>
            </div>
          </div>
        )}

        <div
          className={`max-w-klik mx-auto ${
            isMobile ? "px-3 py-2.5" : "px-4 py-2.5"
          } flex items-center gap-3`}
        >
          <button
            type="button"
            onClick={() => {
              setInCheckout(false);
              setSelectedCategory("all");
              setSearchQuery("");
              setPromoOnly(false);
            }}
            className="shrink-0"
            aria-label="Beranda Klik Indomaret"
          >
            <KlikLogo compact={isMobile} />
          </button>

          {!isMobile && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className={`h-10 px-3 rounded-md text-sm font-medium inline-flex items-center gap-1.5 border klik-press ${
                  categoryMenuOpen
                    ? "border-klik-blue bg-[#EAF4FD] text-klik-blue"
                    : "border-transparent text-klik-ink-secondary hover:bg-klik-surface hover:text-klik-ink"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Kategori</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoryMenuOpen && (
                <div className="absolute left-0 top-11 w-[580px] bg-white border border-klik-border rounded-lg shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-klik-border">
                    <p className="text-sm font-bold text-klik-ink">Kategori Belanja</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("all");
                        setCategoryMenuOpen(false);
                        setInCheckout(false);
                      }}
                      className="text-xs font-semibold text-klik-blue hover:underline"
                    >
                      Semua Produk
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {REDESIGN_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCategoryMenuOpen(false);
                          setInCheckout(false);
                        }}
                        className={`text-left p-2.5 rounded-lg border flex items-center gap-3 klik-press ${
                          selectedCategory === cat.id
                            ? "border-klik-blue bg-[#F0F7FE]"
                            : "border-klik-border hover:border-klik-blue/50 hover:bg-[#F7F9FC]"
                        }`}
                      >
                        <img
                          src={cat.thumbUrl}
                          alt={cat.label}
                          className="h-10 w-10 object-contain shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-klik-ink truncate">{cat.label}</p>
                          <p className="text-[11px] text-klik-ink-muted truncate mt-0.5">
                            {cat.subItems.join(", ")}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Clean Search Input */}
          <div className="flex-1 flex items-center">
            <div
              className={`w-full ${
                isMobile ? "h-11" : "h-10"
              } rounded-lg border border-klik-border-input flex items-center pl-3 pr-1 bg-white focus-within:border-klik-blue`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setInCheckout(false);
                }}
                placeholder="Cari di Klik Indomaret..."
                className="w-full text-sm text-klik-ink placeholder:text-klik-ink-subtle focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus pencarian"
                  className="p-1.5 text-klik-ink-muted hover:text-klik-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                aria-label="Cari produk"
                className="h-8 w-8 rounded-md bg-klik-blue text-white flex items-center justify-center shrink-0 hover:bg-klik-blue-hover klik-press"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Cart Button */}
          <div className="relative flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              aria-label="Buka keranjang belanja"
              className={`relative ${
                isMobile ? "h-11 w-11" : "h-10 px-3.5"
              } rounded-md border border-klik-border hover:border-klik-blue bg-white inline-flex items-center justify-center gap-2 text-klik-ink klik-press`}
            >
              <ShoppingCart className="w-4 h-4 text-klik-blue" />
              {!isMobile && (
                <span className="text-xs font-semibold">
                  Keranjang{totalItems > 0 ? ` (${totalItems})` : ""}
                </span>
              )}
              {totalItems > 0 && isMobile && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-klik-red text-white text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <AnnotationPin
              annotationId="guest-cart"
              visible={showAnnotations}
              activeId={activeAnnotation}
              onSelect={onSelectAnnotation}
              align="right"
            />
          </div>

          {!isMobile && (
            <button
              type="button"
              onClick={() => setShowBranchModal(true)}
              className="h-10 px-3 rounded-md text-xs font-semibold text-klik-blue hover:bg-[#EAF4FD] shrink-0"
            >
              Masuk
            </button>
          )}
        </div>

        {/* Separated Fulfillment Mode & Auto-Detected Store Bar */}
        <div
          className={`max-w-klik mx-auto ${
            isMobile ? "px-3 pb-2.5" : "px-4 pb-2.5"
          } flex flex-wrap items-center justify-between gap-2 text-xs`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex rounded-md bg-klik-surface p-0.5 border border-klik-border"
              role="group"
              aria-label="Mode pengiriman"
            >
              <button
                type="button"
                onClick={() => setDeliveryMode("xpress")}
                className={`px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 klik-press ${
                  deliveryMode === "xpress"
                    ? "bg-klik-amber text-[#151823]"
                    : "text-klik-ink-secondary hover:text-klik-ink"
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>Xpress ≤ 1 Jam</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMode("pickup")}
                className={`px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 klik-press ${
                  deliveryMode === "pickup"
                    ? "bg-[#0B4F8C] text-white"
                    : "text-klik-ink-secondary hover:text-klik-ink"
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Ambil di Toko</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowBranchModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-klik-border bg-white hover:border-klik-blue text-klik-ink max-w-full klik-press"
            >
              <MapPin className="w-3.5 h-3.5 text-klik-blue shrink-0" />
              <span
                className={`font-semibold truncate ${
                  isMobile ? "max-w-[185px]" : "max-w-none"
                }`}
              >
                {selectedBranch.name}
              </span>
              {!isMobile && (
                <span className="text-klik-ink-muted whitespace-nowrap">
                  • {selectedBranch.distanceKm} km
                </span>
              )}
              <span className="h-2 w-2 rounded-full bg-klik-green shrink-0" title="Stok real-time aktif" />
              <ChevronDown className="w-3.5 h-3.5 text-klik-ink-muted shrink-0" />
            </button>

            <AnnotationPin
              annotationId="header-location"
              visible={showAnnotations}
              activeId={activeAnnotation}
              onSelect={onSelectAnnotation}
            />
          </div>

          {!isMobile && (
            <span className="text-[11.5px] text-klik-ink-muted">
              {deliveryMode === "xpress"
                ? `Tiba ${selectedBranch.etaMinutes} • Gratis ongkir min. ${formatRupiah(
                    selectedBranch.freeShippingThreshold
                  )}`
                : "Siap diambil 15 menit • Tanpa biaya kirim"}
            </span>
          )}
        </div>
      </header>

      {inCheckout ? (
        <main className="flex-1 bg-[#F7F9FC]">
          <CheckoutFlow
            items={cartEntries}
            branch={selectedBranch}
            deliveryMode={deliveryMode}
            isMobile={isMobile}
            showAnnotations={showAnnotations}
            activeAnnotation={activeAnnotation}
            onSelectAnnotation={onSelectAnnotation}
            onBackToShop={() => setInCheckout(false)}
            onOrderCompletedClearCart={() => setCart({})}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-klik w-full mx-auto px-3 sm:px-4 py-5 pb-28 space-y-7">
          {/* Authentic Real-Banner Single Hero Carousel (1 banner, zero clutter) */}
          {!searchQuery && selectedCategory === "all" && !promoOnly && (
            <section className="relative rounded-xl overflow-hidden border border-klik-border bg-white klik-card-shadow">
              <div className="absolute top-3 right-3 z-20">
                <AnnotationPin
                  annotationId="hero-clutter"
                  visible={showAnnotations}
                  activeId={activeAnnotation}
                  onSelect={onSelectAnnotation}
                  align="right"
                />
              </div>

              <div
                onClick={() => {
                  if (currentHero.filterMode === "promo") setPromoOnly(true);
                  else setSelectedCategory(currentHero.filterMode);
                }}
                className="relative w-full aspect-[1240/445] cursor-pointer bg-white"
              >
                <img
                  src={currentHero.src}
                  alt={currentHero.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Clean Retail Carousel Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHeroIdx((heroIdx - 1 + REAL_BANNERS.hero.length) % REAL_BANNERS.hero.length);
                }}
                aria-label="Promo sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-klik-ink shadow-md border border-klik-border flex items-center justify-center hover:bg-white klik-press"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHeroIdx((heroIdx + 1) % REAL_BANNERS.hero.length);
                }}
                aria-label="Promo berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-klik-ink shadow-md border border-klik-border flex items-center justify-center hover:bg-white klik-press"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Subtle bottom indicator dots */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-950/35 px-2.5 py-1 rounded-full">
                {REAL_BANNERS.hero.map((b, idx) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHeroIdx(idx);
                    }}
                    aria-label={`Banner ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === heroIdx ? "w-5 bg-white" : "w-1.5 bg-white/55"
                    }`}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 6 MECE Categories — Authentic Klik Indomaret Product-Thumb Cards (Zero Pastel Icon Slop) */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-klik-ink">Kategori Belanja</h1>
                <AnnotationPin
                  annotationId="mece-categories"
                  visible={showAnnotations}
                  activeId={activeAnnotation}
                  onSelect={onSelectAnnotation}
                />
              </div>
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-semibold text-klik-blue hover:underline"
                >
                  Lihat Semua
                </button>
              )}
            </div>

            <div
              className={`grid ${
                isMobile ? "grid-cols-2 gap-2.5" : "grid-cols-3 lg:grid-cols-6 gap-3"
              }`}
            >
              {REDESIGN_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected ? "all" : cat.id)}
                    className={`group rounded-lg border bg-white p-3 text-left min-h-[88px] flex items-end justify-between gap-2 overflow-hidden klik-press ${
                      isSelected
                        ? "border-klik-blue bg-[#F0F7FE] ring-1 ring-klik-blue"
                        : "border-klik-border hover:border-klik-blue/60"
                    }`}
                  >
                    <div className="self-start min-w-0">
                      <p className="text-[12.5px] font-bold text-klik-ink leading-snug">
                        {isMobile ? cat.shortLabel : cat.label}
                      </p>
                      <p className="text-[10.5px] text-klik-ink-muted mt-1 line-clamp-1">
                        {cat.subItems[0]}
                      </p>
                    </div>
                    <img
                      src={cat.thumbUrl}
                      alt={cat.label}
                      className="h-12 w-12 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Catalog Section with Authentic Retail Hierarchy */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-klik-ink">
                  {searchQuery
                    ? `Hasil "${searchQuery}"`
                    : activeCategoryObj
                    ? activeCategoryObj.label
                    : promoOnly
                    ? "Promo Hari Ini"
                    : "Kebutuhan Harian"}
                </h2>
                <span className="text-xs text-klik-ink-muted">
                  ({filteredProducts.length})
                </span>
                <AnnotationPin
                  annotationId="product-card"
                  visible={showAnnotations}
                  activeId={activeAnnotation}
                  onSelect={onSelectAnnotation}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setHideOutOfStock(!hideOutOfStock)}
                  className={`h-8 px-2.5 rounded-md border font-medium inline-flex items-center gap-1.5 klik-press ${
                    hideOutOfStock
                      ? "bg-[#EAF4FD] border-klik-blue/50 text-[#0958AA]"
                      : "bg-white border-klik-border text-klik-ink-secondary"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Stok Tersedia</span>
                  {hideOutOfStock && hiddenOosCount > 0 && (
                    <span className="text-[10px] text-klik-ink-muted">
                      ({hiddenOosCount} habis disembunyikan)
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPromoOnly(!promoOnly)}
                  className={`h-8 px-2.5 rounded-md border font-medium inline-flex items-center gap-1.5 klik-press ${
                    promoOnly
                      ? "bg-klik-red-soft border-klik-red/40 text-klik-red-dark"
                      : "bg-white border-klik-border text-klik-ink-secondary"
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === "relevant" ? "lowest" : "relevant")}
                  className="h-8 px-2.5 rounded-md border border-klik-border bg-white text-klik-ink-secondary font-medium inline-flex items-center gap-1.5 hover:border-klik-blue klik-press"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{sortBy === "relevant" ? "Paling Sesuai" : "Termurah"}</span>
                </button>
              </div>
            </div>

            {/* Quick Search Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
              {QUICK_SEARCH_CHIPS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(searchQuery === term ? "" : term);
                    setSelectedCategory("all");
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium border shrink-0 klik-press ${
                    searchQuery.toLowerCase() === term
                      ? "bg-[#0B4F8C] text-white border-[#0B4F8C]"
                      : "bg-white text-klik-ink-secondary border-klik-border hover:border-klik-blue hover:text-klik-blue"
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-lg border border-klik-border bg-white p-8 text-center space-y-2">
                <p className="text-sm font-semibold text-klik-ink">
                  Produk belum tersedia di {selectedBranch.name}
                </p>
                <p className="text-xs text-klik-ink-muted">
                  Ubah kata kunci pencarian atau pilih cabang Indomaret terdekat lainnya.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPromoOnly(false);
                    setHideOutOfStock(false);
                  }}
                  className="mt-2 h-9 px-4 rounded-md border border-klik-blue text-klik-blue text-xs font-semibold hover:bg-[#EAF4FD]"
                >
                  Tampilkan Semua
                </button>
              </div>
            ) : (
              <div
                className={`grid ${
                  isMobile
                    ? "grid-cols-2 gap-3"
                    : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
                }`}
              >
                {filteredProducts.map((product) => {
                  const stock = getStock(product);
                  const qty = cart[product.id] ?? 0;
                  const isOos = stock <= 0;

                  return (
                    <article
                      key={product.id}
                      className="group rounded-lg border border-klik-border bg-white flex flex-col justify-between overflow-hidden hover:border-klik-blue/50 transition-colors"
                    >
                      <div>
                        <div className="relative border-b border-klik-surface">
                          {product.promoLabel && !isOos && (
                            <span className="absolute top-2 left-2 z-10 text-[10px] font-bold bg-klik-red text-white px-1.5 py-0.5 rounded">
                              {product.promoLabel}
                            </span>
                          )}
                          <ProductVisual
                            product={product}
                            compact={isMobile}
                            outOfStock={isOos}
                          />
                        </div>

                        <div className="p-3 pb-2 space-y-1">
                          <h3 className="text-[13px] font-medium leading-[18px] text-klik-ink min-h-[36px]">
                            {product.name}
                          </h3>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-klik-ink-muted">{product.volume}</span>
                            {isOos ? (
                              <span className="font-semibold text-klik-red">Habis</span>
                            ) : stock <= 5 ? (
                              <span className="font-semibold text-[#B45309]">Sisa {stock}</span>
                            ) : (
                              <span className="font-medium text-klik-green">Stok {stock}</span>
                            )}
                          </div>

                          <div className="pt-1">
                            {product.originalPrice && (
                              <p className="text-[11px] text-klik-ink-subtle line-through leading-none">
                                {formatRupiah(product.originalPrice)}
                              </p>
                            )}
                            <p className="text-[15px] font-bold text-klik-ink leading-tight mt-0.5">
                              {formatRupiah(product.price)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Outline Button — Preserves 1 Primary CTA Hierarchy */}
                      <div className="p-3 pt-1">
                        {isOos ? (
                          <button
                            type="button"
                            onClick={() => setShowBranchModal(true)}
                            className={`w-full ${
                              isMobile ? "h-11" : "h-9"
                            } rounded-md border border-klik-border bg-klik-surface text-klik-ink-secondary text-xs font-semibold hover:border-klik-blue hover:text-klik-blue klik-press`}
                          >
                            Cek Cabang Lain
                          </button>
                        ) : qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, 1)}
                            className={`w-full ${
                              isMobile ? "h-11" : "h-9"
                            } rounded-md border border-klik-blue bg-white text-klik-blue text-xs font-semibold hover:bg-[#EAF4FD] inline-flex items-center justify-center gap-1 klik-press`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah</span>
                          </button>
                        ) : (
                          <div
                            className={`w-full ${
                              isMobile ? "h-11" : "h-9"
                            } rounded-md border border-klik-blue bg-[#EAF4FD] flex items-center justify-between px-1`}
                          >
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, -1)}
                              aria-label="Kurangi jumlah"
                              className="h-7 w-7 rounded bg-white text-klik-blue border border-klik-blue/30 flex items-center justify-center hover:bg-klik-blue hover:text-white klik-press"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-[#0958AA]">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, 1)}
                              disabled={qty >= stock}
                              aria-label="Tambah jumlah"
                              className="h-7 w-7 rounded bg-klik-blue text-white flex items-center justify-center hover:bg-klik-blue-hover disabled:opacity-40 klik-press"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Single Primary CTA Bar: Floating Guest Cart */}
      {!inCheckout && totalItems > 0 && (
        <div
          className={`sticky ${
            isMobile ? "bottom-14" : "bottom-4"
          } z-30 px-3 sm:px-4 pb-2 pointer-events-none`}
        >
          <div className="max-w-[640px] mx-auto pointer-events-auto rounded-lg bg-[#0B4F8C] text-white px-4 py-3 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">
                  {totalItems} barang • {formatRupiah(totalPayable)}
                </p>
                <p className="text-[11px] text-sky-100 truncate">
                  {autoVoucher > 0
                    ? `Voucher Rp 5.000 terpasang • Hemat ${formatRupiah(
                        productSavings + autoVoucher
                      )}`
                    : freeShipRemaining > 0
                    ? `Tambah ${formatRupiah(freeShipRemaining)} lagi untuk Gratis Ongkir`
                    : "Gratis ongkir Xpress aktif"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCartDrawerOpen(true)}
              className="h-9 px-4 rounded-md bg-[#F29D0D] text-[#151823] text-xs font-bold hover:bg-[#DA8D0B] shrink-0 klik-press"
            >
              Lihat Keranjang
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <nav className="sticky bottom-0 z-30 bg-white border-t border-klik-border h-14 px-2 grid grid-cols-4 items-center text-[10.5px] text-klik-ink-muted">
          <button
            type="button"
            onClick={() => {
              setInCheckout(false);
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className={`flex flex-col items-center gap-0.5 ${
              !inCheckout && selectedCategory === "all"
                ? "text-klik-blue font-bold"
                : "text-klik-ink-muted"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInCheckout(false);
              setSelectedCategory("bahan-pokok");
            }}
            className={`flex flex-col items-center gap-0.5 ${
              !inCheckout && selectedCategory !== "all"
                ? "text-klik-blue font-bold"
                : "text-klik-ink-muted"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Kategori</span>
          </button>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Keranjang</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 right-4 h-4 min-w-[16px] px-1 rounded-full bg-klik-red text-white text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowBranchModal(true)}
            className="flex flex-col items-center gap-0.5"
          >
            <User className="w-4 h-4" />
            <span>Cabang</span>
          </button>
        </nav>
      )}

      {/* Guest Cart Drawer */}
      {cartDrawerOpen && (
        <div
          className={`${
            isMobile ? "absolute" : "fixed"
          } inset-0 z-[100] bg-slate-950/45 flex justify-end`}
          onClick={() => setCartDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[400px] bg-white h-full flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-klik-border flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-klik-ink">Keranjang ({totalItems})</h2>
                <p className="text-xs text-klik-ink-muted">{selectedBranch.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                aria-label="Tutup keranjang"
                className="p-1.5 rounded-md hover:bg-klik-surface text-klik-ink-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cartEntries.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <ShoppingCart className="w-10 h-10 text-klik-ink-subtle" />
                <p className="text-sm font-semibold text-klik-ink">Keranjang belanja kosong</p>
                <p className="text-xs text-klik-ink-muted">
                  Pilih produk kebutuhan harian Anda untuk mulai berbelanja.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 klik-scrollbar">
                  <div className="rounded-lg bg-[#EAF4FD] px-3 py-2.5 text-xs text-[#0958AA] flex items-center gap-2">
                    <Truck className="w-4 h-4 shrink-0" />
                    {shippingFee === 0 ? (
                      <span className="font-semibold">Gratis ongkir Xpress aktif</span>
                    ) : (
                      <span>
                        Tambah <strong>{formatRupiah(freeShipRemaining)}</strong> untuk Gratis
                        Ongkir
                      </span>
                    )}
                  </div>

                  {autoVoucher > 0 && (
                    <div className="rounded-lg bg-klik-green-soft px-3 py-2 text-xs text-klik-green font-semibold flex items-center justify-between">
                      <span>Voucher Belanja Rp 5.000</span>
                      <span>Terpasang</span>
                    </div>
                  )}

                  <ul className="divide-y divide-klik-border">
                    {cartEntries.map(({ product, qty }) => (
                      <li key={product.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-11 w-11 object-contain rounded border border-klik-border p-0.5 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-klik-ink leading-snug line-clamp-2">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs font-bold text-klik-ink">
                                {formatRupiah(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-[10.5px] text-klik-ink-subtle line-through">
                                  {formatRupiah(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, -1)}
                            aria-label="Kurangi"
                            className="h-7 w-7 rounded border border-klik-border flex items-center justify-center hover:border-klik-blue"
                          >
                            {qty === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-klik-red" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="w-5 text-center text-xs font-bold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, 1)}
                            aria-label="Tambah"
                            className="h-7 w-7 rounded bg-klik-blue text-white flex items-center justify-center hover:bg-klik-blue-hover"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border-t border-klik-border bg-[#F7F9FC] space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-klik-ink-secondary">
                      <span>Subtotal</span>
                      <span>{formatRupiah(netSubtotal)}</span>
                    </div>
                    {autoVoucher > 0 && (
                      <div className="flex justify-between text-klik-green font-medium">
                        <span>Voucher otomatis</span>
                        <span>-{formatRupiah(autoVoucher)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-klik-ink-secondary">
                      <span>Ongkos kirim</span>
                      <span>{shippingFee === 0 ? "Gratis" : formatRupiah(shippingFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-klik-ink pt-1.5 border-t border-klik-border">
                      <span>Total</span>
                      <span>{formatRupiah(totalPayable)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      setInCheckout(true);
                    }}
                    className="w-full h-11 rounded-md bg-klik-blue text-white text-xs font-bold hover:bg-klik-blue-hover klik-press"
                  >
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Nearest Branch Picker */}
      {showBranchModal && (
        <div
          role="dialog"
          aria-modal="true"
          className={`${
            isMobile ? "absolute" : "fixed"
          } inset-0 z-[100] bg-slate-950/45 flex items-center justify-center p-4`}
          onClick={() => setShowBranchModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[420px] w-full p-5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-klik-ink">Pilih Cabang Indomaret</h3>
                <p className="text-xs text-klik-ink-muted">
                  Stok produk menyesuaikan ketersediaan cabang terpilih
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBranchModal(false)}
                className="p-1 text-klik-ink-muted hover:text-klik-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {STORE_BRANCHES.map((b) => {
                const active = b.id === selectedBranch.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBranch(b);
                      setShowBranchModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border klik-press ${
                      active
                        ? "border-klik-blue bg-[#F0F7FE]"
                        : "border-klik-border hover:bg-[#F7F9FC]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-klik-ink">{b.name}</span>
                      <span className="text-[11px] font-semibold text-klik-blue">
                        {b.distanceKm} km • {b.etaMinutes}
                      </span>
                    </div>
                    <p className="text-[11px] text-klik-ink-muted mt-0.5">{b.address}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
