"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Plus,
  Search,
  ShoppingCart,
  Smartphone,
  X,
  Zap,
  QrCode,
  Home,
  LayoutGrid,
  User,
} from "lucide-react";
import {
  EXISTING_HOMEPAGE_SHORTCUTS,
  EXISTING_TOP_CATEGORIES,
  PRODUCTS,
  REAL_BANNERS,
  formatRupiah,
  type Product,
} from "@/data/catalog";
import { KlikLogo } from "@/components/shared/KlikLogo";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { AnnotationPin } from "@/components/shared/AnnotationPin";

interface ExistingViewProps {
  isMobile: boolean;
  showAnnotations: boolean;
  activeAnnotation: string | null;
  onSelectAnnotation: (id: string | null) => void;
  resetSignal: number;
}

export function ExistingView({
  isMobile,
  showAnnotations,
  activeAnnotation,
  onSelectAnnotation,
  resetSignal,
}: ExistingViewProps) {
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [hoveredCatIndex, setHoveredCatIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showXpressModal, setShowXpressModal] = useState(false);

  React.useEffect(() => {
    setShowInitialPopup(true);
    setCategoryMenuOpen(false);
    setSubmittedQuery("");
    setSearchInput("");
    setSelectedProduct(null);
    setShowLoginModal(false);
    setShowXpressModal(false);
  }, [resetSignal]);

  const filteredProducts = submittedQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(submittedQuery.toLowerCase()) ||
          p.keywords.some((k) => k.includes(submittedQuery.toLowerCase()))
      )
    : PRODUCTS;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedProduct(null);
    setSubmittedQuery(searchInput.trim() || "minyak goreng");
    if (!searchInput.trim()) setSearchInput("minyak goreng");
  };

  return (
    <div
      className="relative bg-white text-klik-ink min-h-[760px] flex flex-col"
      onClick={() => {
        setCategoryMenuOpen(false);
        onSelectAnnotation(null);
      }}
    >
      {/* Authentic Existing Klik Indomaret Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-klik-border klik-nav-shadow">
        {!isMobile && (
          <div className="bg-klik-surface h-8 border-b border-klik-border/70">
            <div className="max-w-klik mx-auto h-full px-4 flex items-center justify-between text-xs text-klik-ink-secondary">
              <button
                type="button"
                onClick={() => setShowInitialPopup(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1178D4] via-[#368BE2] to-[#1178D4] text-white font-bold px-3 py-1 rounded-md text-[11.5px]"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Download Klik Indomaret App
              </button>
              <div className="flex items-center gap-5">
                <span className="hover:text-klik-blue cursor-pointer">Tentang Klik Indomaret</span>
                <span className="hover:text-klik-blue cursor-pointer">Produk Terlaris</span>
                <span className="hover:text-klik-blue cursor-pointer">Promo Klik Indomaret</span>
              </div>
            </div>
          </div>
        )}

        <div
          className={`max-w-klik mx-auto px-3 ${
            isMobile ? "py-2.5" : "px-4 pt-2.5 pb-2"
          } flex items-center gap-2.5`}
        >
          <button
            type="button"
            onClick={() => {
              setSubmittedQuery("");
              setSelectedProduct(null);
              setSearchInput("");
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
                className="inline-flex items-center gap-1 text-sm text-klik-ink-secondary hover:text-klik-blue px-2 py-1.5 rounded-md"
              >
                <span>Kategori</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute -top-2 -right-2">
                <AnnotationPin
                  annotationId="mece-categories"
                  visible={showAnnotations}
                  activeId={activeAnnotation}
                  onSelect={onSelectAnnotation}
                />
              </div>

              {categoryMenuOpen && (
                <div className="absolute left-0 top-9 w-[740px] bg-white border border-klik-border rounded-lg shadow-2xl flex z-50 overflow-hidden">
                  <div className="w-[225px] bg-[#F8FAFC] border-r border-klik-border max-h-[340px] overflow-y-auto klik-scrollbar py-1">
                    {EXISTING_TOP_CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.name}
                        type="button"
                        onMouseEnter={() => setHoveredCatIndex(idx)}
                        onClick={() => {
                          setHoveredCatIndex(idx);
                          setCategoryMenuOpen(false);
                          setSubmittedQuery(cat.name === "Dapur & Bahan Masakan" ? "minyak" : "");
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                          hoveredCatIndex === idx
                            ? "bg-klik-blue-soft text-klik-blue font-semibold"
                            : "text-klik-ink-secondary hover:bg-slate-100"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 p-4 max-h-[340px] overflow-y-auto klik-scrollbar">
                    <div className="pb-2 mb-3 border-b border-klik-border">
                      <h3 className="text-sm font-bold text-klik-ink">
                        {EXISTING_TOP_CATEGORIES[hoveredCatIndex].name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {EXISTING_TOP_CATEGORIES[hoveredCatIndex].subGroups.map((sg) => (
                        <div key={sg.heading}>
                          <p className="text-xs font-bold text-klik-ink mb-1.5">{sg.heading}</p>
                          {sg.links.length > 0 && (
                            <ul className="space-y-1">
                              {sg.links.map((lk, li) => (
                                <li
                                  key={`${lk}-${li}`}
                                  onClick={() => {
                                    setCategoryMenuOpen(false);
                                    const q = lk.toLowerCase().includes("minyak")
                                      ? "minyak goreng"
                                      : lk;
                                    setSearchInput(q);
                                    setSubmittedQuery(q);
                                  }}
                                  className="text-xs text-klik-ink-secondary hover:text-klik-blue cursor-pointer"
                                >
                                  {lk}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSearch} className="flex-1 flex items-center">
            <div className="w-full h-10 rounded-lg border border-klik-border-input flex items-center pl-3 pr-1 bg-white focus-within:border-klik-blue">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari di Klik Indomaret"
                className="w-full text-sm text-klik-ink placeholder:text-klik-ink-subtle focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label="Cari"
                className="h-8 w-8 rounded-md bg-klik-blue text-white flex items-center justify-center shrink-0 hover:bg-klik-blue-hover"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              aria-label="Keranjang"
              className="p-2 text-klik-ink-secondary hover:text-klik-blue"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <div className="absolute -top-1 -right-1">
              <AnnotationPin
                annotationId="guest-cart"
                visible={showAnnotations}
                activeId={activeAnnotation}
                onSelect={onSelectAnnotation}
                align="right"
              />
            </div>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="h-8 px-3 rounded-md border border-klik-blue text-klik-blue text-sm hover:bg-klik-blue-soft"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="h-8 px-3 rounded-md bg-klik-blue text-white text-sm hover:bg-klik-blue-hover"
              >
                Daftar
              </button>
            </div>
          )}
        </div>

        <div
          className={`max-w-klik mx-auto ${
            isMobile ? "px-3 pb-2" : "px-4 pb-2.5"
          } flex items-center gap-3 text-xs`}
        >
          <div className="relative inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowXpressModal(true)}
              className="h-6 px-2.5 rounded-md bg-klik-amber text-white font-medium inline-flex items-center gap-1 hover:bg-klik-amber-hover"
            >
              <Zap className="w-3 h-3 fill-white" />
              <span>Belanja Xpress</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <AnnotationPin
              annotationId="header-location"
              visible={showAnnotations}
              activeId={activeAnnotation}
              onSelect={onSelectAnnotation}
            />
          </div>
          <button
            type="button"
            onClick={() => setShowXpressModal(true)}
            className="inline-flex items-center gap-1 text-klik-ink-secondary hover:text-klik-blue"
          >
            <MapPin className="w-3.5 h-3.5 text-klik-ink-muted" />
            <span>
              Area <strong className="text-klik-ink">Jakarta</strong>
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-klik w-full mx-auto px-3 sm:px-4 py-4 pb-16">
        {selectedProduct ? (
          <div>
            <div className="text-xs text-klik-ink-muted mb-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="hover:text-klik-blue"
              >
                Home
              </button>
              <span>&gt;</span>
              <span className="truncate">{selectedProduct.name}</span>
            </div>

            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-12"} gap-6`}>
              <div className={isMobile ? "" : "col-span-5"}>
                <div className="rounded-lg border border-klik-surface overflow-hidden p-4 bg-white klik-card-shadow">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-[260px] object-contain"
                  />
                </div>
              </div>
              <div className={`${isMobile ? "" : "col-span-7"} space-y-3`}>
                <h1 className="text-lg font-bold text-klik-ink">
                  {selectedProduct.name.replace("2L", "2l")}
                </h1>
                <p className="text-2xl font-bold text-klik-ink">
                  {formatRupiah(selectedProduct.originalPrice ?? selectedProduct.price)}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="h-10 px-6 rounded-md bg-klik-blue text-white text-sm font-semibold hover:bg-klik-blue-hover"
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : submittedQuery ? (
          <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-5`}>
            {!isMobile && (
              <aside className="w-[210px] shrink-0 rounded-lg border border-klik-border p-3.5 self-start space-y-4">
                <p className="text-sm font-bold text-klik-ink">Filter</p>
                <div>
                  <p className="text-xs font-semibold text-klik-ink mb-2">Kategori</p>
                  <p className="text-xs text-klik-ink-secondary">Dapur &amp; Bahan Masakan</p>
                </div>
                <div className="border-t border-klik-border pt-3">
                  <p className="text-xs font-semibold text-klik-ink mb-2">Harga</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      disabled
                      placeholder="Rp Harga Minimum"
                      className="w-full h-8 px-2 text-xs border border-klik-border-input rounded-md bg-slate-50"
                    />
                    <input
                      type="text"
                      disabled
                      placeholder="Rp Harga Maximum"
                      className="w-full h-8 px-2 text-xs border border-klik-border-input rounded-md bg-slate-50"
                    />
                  </div>
                </div>
                <div className="border-t border-klik-border pt-3">
                  <p className="text-xs font-semibold text-klik-ink mb-2">Brand</p>
                  <div className="space-y-1.5 text-xs text-klik-ink-secondary">
                    {["Barco", "Indomaret", "Indomie", "Kara", "Diamond"].map((b) => (
                      <label key={b} className="flex items-center gap-2">
                        <input type="checkbox" disabled className="rounded" />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-klik-ink">
                    {submittedQuery}{" "}
                    <span className="font-normal text-klik-ink-muted">
                      ({filteredProducts.length} produk)
                    </span>
                  </p>
                  <AnnotationPin
                    annotationId="product-card"
                    visible={showAnnotations}
                    activeId={activeAnnotation}
                    onSelect={onSelectAnnotation}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedQuery("");
                    setSearchInput("");
                  }}
                  className="text-xs text-klik-blue hover:underline"
                >
                  Kembali ke Beranda
                </button>
              </div>

              <div
                className={`grid ${
                  isMobile ? "grid-cols-2 gap-2.5" : "grid-cols-3 lg:grid-cols-4 gap-3.5"
                }`}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group relative rounded-lg border border-klik-surface bg-white klik-card-shadow overflow-hidden cursor-pointer flex flex-col"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLoginModal(true);
                      }}
                      className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-klik-blue text-white flex items-center justify-center shadow hover:bg-klik-blue-hover"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <ProductVisual product={product} compact={isMobile} />
                    <div className="px-3 pb-3 pt-1 flex-1 flex flex-col justify-between">
                      <h2 className="text-[14px] leading-[18px] text-klik-ink line-clamp-2 min-h-[36px]">
                        {product.shortName}
                      </h2>
                      <p className="text-[14px] font-semibold text-klik-ink mt-2">
                        {formatRupiah(product.originalPrice ?? product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Authentic Cluttered Existing Homepage with Real Klik Indomaret Banners & Photos */
          <div className="space-y-5">
            <section className="relative">
              <div className="absolute -top-2 right-2 z-20">
                <AnnotationPin
                  annotationId="hero-clutter"
                  visible={showAnnotations}
                  activeId={activeAnnotation}
                  onSelect={onSelectAnnotation}
                  align="right"
                />
              </div>
              <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-2.5`}>
                {(isMobile
                  ? REAL_BANNERS.existingHeroAll.slice(0, 1)
                  : REAL_BANNERS.existingHeroAll
                ).map((src, idx) => (
                  <div
                    key={src}
                    className="rounded-lg overflow-hidden border border-klik-border bg-white aspect-[1240/445]"
                  >
                    <img
                      src={src}
                      alt={`Banner Promo Klik Indomaret ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 9 Authentic Homepage Category Cards with Real Product Thumbnails */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <h1 className="text-[16px] font-semibold text-klik-ink">Kategori Belanja</h1>
                <button
                  type="button"
                  onClick={() => setCategoryMenuOpen(true)}
                  className="text-xs font-medium text-klik-blue hover:underline"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-1 klik-scrollbar">
                {EXISTING_HOMEPAGE_SHORTCUTS.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      const q = idx === 1 ? "minyak goreng" : idx === 0 ? "indomie" : "susu";
                      setSearchInput(q);
                      setSubmittedQuery(q);
                    }}
                    className="w-[106px] h-[94px] shrink-0 rounded-lg border border-klik-border bg-white p-2 shadow-sm text-left flex flex-col justify-between hover:border-klik-blue overflow-hidden"
                  >
                    <span className="text-[11.5px] font-bold text-klik-ink-muted leading-tight line-clamp-2">
                      {item.label}
                    </span>
                    <img
                      src={item.thumbUrl}
                      alt={item.label}
                      className="self-end h-10 w-10 object-contain"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Promo Lainnya: 3 More Real Promo Banners (1 / 17) */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-[16px] font-semibold text-klik-ink">Promo Lainnya</h2>
                <span className="text-xs text-klik-blue">Lihat Semua</span>
              </div>
              <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-2.5`}>
                {(isMobile
                  ? REAL_BANNERS.existingPromoLainnya.slice(0, 1)
                  : REAL_BANNERS.existingPromoLainnya
                ).map((src, idx) => (
                  <div
                    key={src}
                    className="rounded-lg overflow-hidden border border-klik-border bg-white aspect-[1240/445]"
                  >
                    <img
                      src={src}
                      alt={`Promo Lainnya ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Super Brand Day Row */}
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-[16px] font-semibold text-klik-ink">
                  Super Brand Day - Rumah Indofood
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("minyak goreng");
                    setSubmittedQuery("minyak goreng");
                  }}
                  className="text-xs font-medium text-klik-blue hover:underline"
                >
                  Lihat Semua
                </button>
              </div>
              <div className={`grid ${isMobile ? "grid-cols-2 gap-2.5" : "grid-cols-5 gap-3"}`}>
                {PRODUCTS.slice(0, isMobile ? 4 : 5).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className="group relative rounded-lg border border-klik-surface bg-white klik-card-shadow overflow-hidden cursor-pointer"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLoginModal(true);
                      }}
                      className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-klik-blue text-white flex items-center justify-center shadow"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <ProductVisual product={p} compact />
                    <div className="px-2.5 pb-2.5 pt-1">
                      <h3 className="text-[13px] leading-[17px] text-klik-ink line-clamp-2 min-h-[34px]">
                        {p.shortName}
                      </h3>
                      <p className="text-[13.5px] font-semibold text-klik-ink mt-1.5">
                        {formatRupiah(p.originalPrice ?? p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {isMobile && (
        <nav className="sticky bottom-0 z-30 bg-white border-t border-klik-border h-14 px-2 grid grid-cols-4 items-center text-[10.5px] text-klik-ink-muted">
          <button
            type="button"
            onClick={() => {
              setSubmittedQuery("");
              setSelectedProduct(null);
            }}
            className="flex flex-col items-center gap-0.5 text-klik-blue font-semibold"
          >
            <Home className="w-4 h-4" />
            <span>Beranda</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchInput("minyak goreng");
              setSubmittedQuery("minyak goreng");
            }}
            className="flex flex-col items-center gap-0.5"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Kategori</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="flex flex-col items-center gap-0.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Keranjang</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="flex flex-col items-center gap-0.5"
          >
            <User className="w-4 h-4" />
            <span>Akun</span>
          </button>
        </nav>
      )}

      {/* Initial Blocking QR Modal */}
      {showInitialPopup && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-[100] bg-slate-950/55 flex items-center justify-center p-4"
        >
          <div className="relative bg-white rounded-xl max-w-[340px] w-full overflow-hidden shadow-2xl border border-klik-border">
            <button
              type="button"
              onClick={() => setShowInitialPopup(false)}
              aria-label="Tutup modal promo"
              className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-white text-klik-ink flex items-center justify-center shadow hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="bg-[#1178D4] text-white p-6 text-center">
              <span className="inline-block text-[10px] font-bold bg-[#FDE047] text-[#151823] px-2.5 py-0.5 rounded mb-2">
                HANYA DI APLIKASI
              </span>
              <h3 className="text-xl font-extrabold leading-tight">Serbu Promonya!</h3>
              <p className="text-xs text-sky-100 mt-1">
                Download Klik Indomaret App untuk penawaran eksklusif hari ini.
              </p>
              <div className="mt-4 mx-auto w-28 h-28 bg-white rounded-lg flex flex-col items-center justify-center text-klik-ink p-2">
                <QrCode className="w-16 h-16 text-klik-ink" />
                <span className="text-[9px] font-bold text-klik-blue mt-1">SCAN DI SINI</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Misleading "Belanja Xpress v" -> Opens Address/Login Modal */}
      {showXpressModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4"
          onClick={() => setShowXpressModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[380px] w-full p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-klik-ink">Alamat Pengiriman</h3>
              <button
                type="button"
                onClick={() => setShowXpressModal(false)}
                className="p-1 text-klik-ink-muted hover:text-klik-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-klik-ink-secondary leading-relaxed mb-4">
              Masuk untuk menggunakan alamat tersimpan atau pilih lokasi pengiriman Anda secara
              manual.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowXpressModal(false);
                  setShowLoginModal(true);
                }}
                className="flex-1 h-9 rounded-md bg-klik-blue text-white text-xs font-semibold"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setShowXpressModal(false)}
                className="flex-1 h-9 rounded-md border border-klik-blue text-klik-blue text-xs font-semibold"
              >
                Pilih Lokasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentic Hard Login Wall ("Masuk Akun") */}
      {showLoginModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-[100] bg-slate-950/55 flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[400px] w-full p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-klik-ink">Masuk Akun</h3>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                aria-label="Tutup modal masuk akun"
                className="p-1 text-klik-ink-muted hover:text-klik-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-klik-ink mb-1">
                  Nomor Handphone atau Email
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nomor handphone atau email"
                  className="w-full h-10 px-3 text-sm rounded-lg border border-klik-border-input focus:outline-none focus:border-klik-blue"
                />
              </div>
              <div className="text-right">
                <span className="text-xs text-klik-blue font-medium">Lupa kata sandi?</span>
              </div>
              <button
                type="button"
                disabled
                className="w-full h-10 rounded-lg bg-[#D1D5DB] text-white text-sm font-semibold cursor-not-allowed"
              >
                Selanjutnya
              </button>
              <p className="text-center text-xs text-klik-ink-muted pt-1">
                Belum memiliki akun?{" "}
                <span className="text-klik-blue font-medium">Daftar Sekarang</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
