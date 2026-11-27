"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  QrCode,
  RefreshCw,
  Send,
  ShieldCheck,
  Store,
  Truck,
  X,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import {
  formatRupiah,
  type Product,
  type StoreBranch,
} from "@/data/catalog";
import { AnnotationPin } from "@/components/shared/AnnotationPin";

export interface CartEntry {
  product: Product;
  qty: number;
}

interface CheckoutFlowProps {
  items: CartEntry[];
  branch: StoreBranch;
  deliveryMode: "xpress" | "pickup";
  isMobile: boolean;
  showAnnotations: boolean;
  activeAnnotation: string | null;
  onSelectAnnotation: (id: string | null) => void;
  onBackToShop: () => void;
  onOrderCompletedClearCart: () => void;
}

type PaymentMethodId = "qris" | "bca-va" | "isaku" | "shopeepay";

const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  sublabel: string;
  recommended?: boolean;
}[] = [
  {
    id: "qris",
    label: "QRIS",
    sublabel: "Semua bank & e-wallet • Verifikasi instan",
    recommended: true,
  },
  {
    id: "bca-va",
    label: "BCA Virtual Account",
    sublabel: "Tanpa biaya admin",
  },
  {
    id: "isaku",
    label: "i.saku",
    sublabel: "Saldo terhubung",
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    sublabel: "Tersedia",
  },
];

export function CheckoutFlow({
  items,
  branch,
  deliveryMode,
  isMobile,
  showAnnotations,
  activeAnnotation,
  onSelectAnnotation,
  onBackToShop,
  onOrderCompletedClearCart,
}: CheckoutFlowProps) {
  const [step, setStep] = useState<"checkout" | "status">("checkout");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("qris");
  const [oosPolicy, setOosPolicy] = useState<"substitute" | "refund-origin">("substitute");
  const [sliderValue, setSliderValue] = useState(0);
  const [orderCancelled, setOrderCancelled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSecondsLeft, setCancelSecondsLeft] = useState(298);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "store" | "user"; text: string; time: string }[]
  >([
    {
      sender: "store",
      text: `Halo, pesanan Anda sedang disiapkan di ${branch.name}. Semua barang tersedia di rak.`,
      time: "Baru saja",
    },
  ]);

  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    orderCode: string;
    total: number;
    methodLabel: string;
    itemCount: number;
  } | null>(null);

  const rawTotal = items.reduce(
    (sum, e) => sum + (e.product.originalPrice ?? e.product.price) * e.qty,
    0
  );
  const netSubtotal = items.reduce((sum, e) => sum + e.product.price * e.qty, 0);
  const productDiscount = rawTotal - netSubtotal;
  const autoVoucher = netSubtotal >= 50000 ? 5000 : 0;
  const shippingFee =
    deliveryMode === "pickup" || netSubtotal >= branch.freeShippingThreshold
      ? 0
      : branch.deliveryFee;
  const grandTotal = Math.max(0, netSubtotal - autoVoucher + shippingFee);
  const totalQty = items.reduce((sum, e) => sum + e.qty, 0);

  useEffect(() => {
    if (step !== "status" || orderCancelled) return;
    const timer = setInterval(() => {
      setCancelSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, orderCancelled]);

  const handleConfirmOrder = () => {
    const methodObj = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
    setConfirmedSnapshot({
      orderCode: "KLI-2611-8842",
      total: grandTotal,
      methodLabel: methodObj?.label ?? "QRIS",
      itemCount: totalQty,
    });
    setStep("status");
    onOrderCompletedClearCart();
  };

  const handleSliderChange = (val: number) => {
    setSliderValue(val);
    if (val >= 94) {
      handleConfirmOrder();
    }
  };

  const formatTimer = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text, time: "Baru saja" },
      {
        sender: "store",
        text: "Baik kak, catatan sudah diteruskan ke staf cabang dan kurir Xpress.",
        time: "Baru saja",
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="max-w-klik mx-auto px-3 sm:px-4 py-5 pb-14">
      {/* Top Back + Clean Stepper */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-klik-blue hover:text-klik-blue-hover min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === "status" ? "Kembali Belanja" : "Kembali ke Katalog"}</span>
        </button>

        <div className="flex items-center gap-2">
          <ol className="hidden sm:flex items-center gap-2 text-xs">
            {[
              { num: 1, label: "Keranjang", done: true, active: false },
              {
                num: 2,
                label: "Pembayaran",
                done: step === "status",
                active: step === "checkout",
              },
              {
                num: 3,
                label: "Status Pesanan",
                done: false,
                active: step === "status",
              },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <li
                  className={`inline-flex items-center gap-1.5 ${
                    s.active
                      ? "text-klik-blue font-bold"
                      : s.done
                      ? "text-klik-ink font-medium"
                      : "text-klik-ink-muted"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      s.active
                        ? "bg-klik-blue text-white"
                        : s.done
                        ? "bg-[#0B4F8C] text-white"
                        : "bg-slate-200 text-klik-ink-muted"
                    }`}
                  >
                    {s.done ? "✓" : s.num}
                  </span>
                  <span>{s.label}</span>
                </li>
                {idx < 2 && <span className="text-slate-300">/</span>}
              </React.Fragment>
            ))}
          </ol>

          <AnnotationPin
            annotationId="single-checkout"
            visible={showAnnotations}
            activeId={activeAnnotation}
            onSelect={onSelectAnnotation}
            align="right"
          />
        </div>
      </div>

      {step === "checkout" ? (
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-12"} gap-6 items-start`}>
          {/* Left: Flattened Clean Surface (No nested cards) */}
          <div
            className={`${
              isMobile ? "" : "col-span-7"
            } bg-white rounded-lg border border-klik-border divide-y divide-klik-border`}
          >
            {/* 1. Pengiriman */}
            <section className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h2 className="text-sm font-bold text-klik-ink flex items-center gap-2">
                  {deliveryMode === "xpress" ? (
                    <Truck className="w-4 h-4 text-klik-blue" />
                  ) : (
                    <Store className="w-4 h-4 text-klik-blue" />
                  )}
                  {deliveryMode === "xpress" ? "Pengiriman Xpress" : "Ambil di Toko"}
                </h2>
                <span className="text-xs font-semibold text-klik-blue">
                  {deliveryMode === "xpress" ? `Est. ${branch.etaMinutes}` : "Siap 15 menit"}
                </span>
              </div>
              <p className="text-xs font-semibold text-klik-ink">{branch.name}</p>
              <p className="text-xs text-klik-ink-muted mt-0.5 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  {branch.address} ({branch.distanceKm} km)
                </span>
              </p>
            </section>

            {/* 2. Preferensi Stok Kosong */}
            <section className="p-4 sm:p-5">
              <h2 className="text-sm font-bold text-klik-ink flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-klik-amber" />
                Jika barang habis di rak
              </h2>
              <div className="space-y-2">
                <label
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer klik-press ${
                    oosPolicy === "substitute"
                      ? "border-klik-blue bg-[#F0F7FE]"
                      : "border-klik-border hover:bg-[#F7F9FC]"
                  }`}
                >
                  <input
                    type="radio"
                    name="oosPolicy"
                    checked={oosPolicy === "substitute"}
                    onChange={() => setOosPolicy("substitute")}
                    className="mt-0.5 accent-klik-blue"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-klik-ink">
                      Konfirmasi barang pengganti lewat chat
                    </p>
                    <p className="text-klik-ink-muted mt-0.5">
                      Staf cabang menawarkan merek atau ukuran setara sebelum membatalkan item.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer klik-press ${
                    oosPolicy === "refund-origin"
                      ? "border-klik-blue bg-[#F0F7FE]"
                      : "border-klik-border hover:bg-[#F7F9FC]"
                  }`}
                >
                  <input
                    type="radio"
                    name="oosPolicy"
                    checked={oosPolicy === "refund-origin"}
                    onChange={() => setOosPolicy("refund-origin")}
                    className="mt-0.5 accent-klik-blue"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-klik-ink">
                      Batalkan item &amp; kembalikan dana ke pembayaran asal
                    </p>
                    <p className="text-klik-ink-muted mt-0.5">
                      Dana otomatis kembali ke QRIS atau rekening asal.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* 3. Metode Pembayaran */}
            <section className="p-4 sm:p-5">
              <h2 className="text-sm font-bold text-klik-ink flex items-center gap-2 mb-3">
                <Wallet className="w-4 h-4 text-klik-blue" />
                Metode Pembayaran
              </h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer min-h-[48px] klik-press ${
                      paymentMethod === m.id
                        ? "border-klik-blue bg-[#F0F7FE]"
                        : "border-klik-border hover:bg-[#F7F9FC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="accent-klik-blue"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-klik-ink">{m.label}</span>
                          {m.recommended && (
                            <span className="text-[10px] font-semibold bg-[#0B4F8C] text-white px-1.5 py-0.5 rounded">
                              Instan
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-klik-ink-muted mt-0.5">{m.sublabel}</p>
                      </div>
                    </div>
                    {m.id === "qris" && <QrCode className="w-5 h-5 text-klik-blue shrink-0" />}
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Clean Summary & Primary CTA */}
          <div className={isMobile ? "" : "col-span-5"}>
            <section className="rounded-lg border border-klik-border bg-white p-4 sm:p-5 sticky top-24 space-y-4">
              <div>
                <h2 className="text-sm font-bold text-klik-ink mb-2.5">
                  Ringkasan Pesanan ({totalQty} barang)
                </h2>
                <ul className="divide-y divide-klik-border/70 max-h-[190px] overflow-y-auto klik-scrollbar">
                  {items.map((entry) => (
                    <li
                      key={entry.product.id}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={entry.product.imageUrl}
                          alt={entry.product.name}
                          className="h-9 w-9 object-contain rounded border border-klik-border bg-white shrink-0 p-0.5"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-klik-ink truncate">
                            {entry.product.name}
                          </p>
                          <p className="text-[11px] text-klik-ink-muted">
                            {entry.qty} × {formatRupiah(entry.product.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-klik-ink shrink-0">
                        {formatRupiah(entry.product.price * entry.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 text-xs border-t border-klik-border pt-3">
                <div className="flex justify-between text-klik-ink-secondary">
                  <span>Harga normal</span>
                  <span>{formatRupiah(rawTotal)}</span>
                </div>
                {productDiscount > 0 && (
                  <div className="flex justify-between text-klik-green font-medium">
                    <span>Diskon katalog</span>
                    <span>-{formatRupiah(productDiscount)}</span>
                  </div>
                )}
                {autoVoucher > 0 && (
                  <div className="flex justify-between text-klik-green font-medium">
                    <span>Voucher otomatis</span>
                    <span>-{formatRupiah(autoVoucher)}</span>
                  </div>
                )}
                <div className="flex justify-between text-klik-ink-secondary">
                  <span>Ongkos kirim</span>
                  <span className={shippingFee === 0 ? "text-klik-green font-semibold" : ""}>
                    {shippingFee === 0 ? "Gratis" : formatRupiah(shippingFee)}
                  </span>
                </div>
              </div>

              {/* Total Payment Chunk */}
              <div className="border-t border-klik-border pt-3 flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-medium text-klik-ink-muted">Total Bayar</p>
                  <p className="text-2xl font-bold text-klik-ink tracking-tight">
                    {formatRupiah(grandTotal)}
                  </p>
                </div>
                {productDiscount + autoVoucher > 0 && (
                  <span className="text-[11px] font-semibold text-klik-green inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Hemat {formatRupiah(productDiscount + autoVoucher)}
                  </span>
                )}
              </div>

              {/* Forcing Function Slide-to-Pay + Single Primary CTA */}
              <div className="space-y-2.5 pt-1">
                <div className="relative h-12 rounded-lg bg-[#EAF4FD] border border-klik-blue/40 overflow-hidden flex items-center px-3">
                  <div
                    className="absolute inset-y-0 left-0 bg-klik-blue/20"
                    style={{ width: `${sliderValue}%` }}
                  />
                  <span className="relative z-10 w-full text-center text-xs font-semibold text-[#0958AA] pointer-events-none">
                    {sliderValue < 20
                      ? `Geser ke kanan untuk bayar • ${formatRupiah(grandTotal)}`
                      : "Lepaskan setelah penuh ke kanan..."}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    onMouseUp={() => {
                      if (sliderValue < 94) setSliderValue(0);
                    }}
                    onTouchEnd={() => {
                      if (sliderValue < 94) setSliderValue(0);
                    }}
                    aria-label="Geser untuk bayar"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full h-11 rounded-md bg-klik-blue text-white text-sm font-semibold hover:bg-klik-blue-hover klik-press"
                >
                  Bayar {formatRupiah(grandTotal)}
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        /* Order Status + Direct Store Chat + 5-Minute Cancel */
        <div className="max-w-[660px] mx-auto">
          <section className="rounded-lg border border-klik-border bg-white p-5 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-klik-border">
              <div className="flex items-start gap-3">
                {orderCancelled ? (
                  <AlertTriangle className="w-6 h-6 text-klik-red shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-klik-green shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-[11px] font-medium text-klik-ink-muted">
                    Pesanan #{confirmedSnapshot?.orderCode}
                  </span>
                  <h2 className="text-base font-bold text-klik-ink">
                    {orderCancelled
                      ? "Pesanan Dibatalkan"
                      : "Pembayaran Berhasil • Sedang Disiapkan"}
                  </h2>
                  <p className="text-xs text-klik-ink-secondary mt-0.5">
                    {orderCancelled
                      ? `Dana ${formatRupiah(
                          confirmedSnapshot?.total ?? 0
                        )} dikembalikan ke ${confirmedSnapshot?.methodLabel} (1–5 menit).`
                      : `${branch.name} • ${confirmedSnapshot?.methodLabel}`}
                  </p>
                </div>
              </div>
              <span className="text-base font-bold text-klik-ink">
                {formatRupiah(confirmedSnapshot?.total ?? 0)}
              </span>
            </div>

            {!orderCancelled && (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-md bg-[#F7F9FC] p-3 border border-klik-border">
                  <p className="font-bold text-klik-ink">1. Diterima</p>
                  <p className="text-[11px] text-klik-ink-muted mt-0.5">Stok cabang dikunci</p>
                </div>
                <div className="rounded-md bg-[#EAF4FD] p-3 border border-klik-blue/40">
                  <p className="font-bold text-[#0958AA]">2. Disiapkan</p>
                  <p className="text-[11px] text-klik-ink-secondary mt-0.5">
                    {confirmedSnapshot?.itemCount} barang dikemas
                  </p>
                </div>
                <div className="rounded-md bg-white p-3 border border-klik-border">
                  <p className="font-semibold text-klik-ink-muted">
                    3. {deliveryMode === "xpress" ? "Diantar Kurir" : "Siap Diambil"}
                  </p>
                  <p className="text-[11px] text-klik-ink-muted mt-0.5">
                    Est. {deliveryMode === "xpress" ? branch.etaMinutes : "15 menit"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowChatDrawer(true)}
                className="flex-1 min-w-[160px] h-11 px-4 rounded-md bg-klik-blue text-white text-xs font-semibold hover:bg-klik-blue-hover inline-flex items-center justify-center gap-2 klik-press"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Toko / Kurir
              </button>

              {!orderCancelled && (
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="flex-1 min-w-[180px] h-11 px-4 rounded-md border border-klik-border text-klik-ink-secondary text-xs font-semibold hover:border-klik-red hover:text-klik-red inline-flex items-center justify-center gap-2 klik-press"
                >
                  <Clock className="w-4 h-4" />
                  Batalkan Pesanan ({formatTimer(cancelSecondsLeft)})
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      {showCancelModal && (
        <div
          role="dialog"
          aria-modal="true"
          className={`${
            isMobile ? "absolute" : "fixed"
          } inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4`}
          onClick={() => setShowCancelModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-[380px] w-full p-5 shadow-2xl space-y-3"
          >
            <h3 className="text-base font-bold text-klik-ink">Batalkan Pesanan?</h3>
            <p className="text-xs text-klik-ink-secondary leading-relaxed">
              Pesanan belum diserahkan ke kurir. Dana{" "}
              <strong>{formatRupiah(confirmedSnapshot?.total ?? 0)}</strong> dikembalikan langsung
              ke {confirmedSnapshot?.methodLabel}.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 h-10 rounded-md border border-klik-border text-xs font-semibold text-klik-ink-secondary hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderCancelled(true);
                  setShowCancelModal(false);
                }}
                className="flex-1 h-10 rounded-md bg-klik-red text-white text-xs font-semibold hover:bg-klik-red-dark"
              >
                Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {showChatDrawer && (
        <div
          className={`${
            isMobile ? "absolute" : "fixed"
          } inset-0 z-[100] bg-slate-950/45 flex justify-end`}
          onClick={() => setShowChatDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[360px] bg-white h-full flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-klik-border flex items-center justify-between bg-[#0B4F8C] text-white">
              <div>
                <h3 className="text-sm font-bold">{branch.name}</h3>
                <p className="text-[11px] text-sky-100">Staf Cabang &amp; Kurir Xpress</p>
              </div>
              <button
                type="button"
                onClick={() => setShowChatDrawer(false)}
                aria-label="Tutup chat"
                className="p-1 rounded hover:bg-white/15"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#F7F9FC]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-klik-blue text-white"
                        : "bg-white border border-klik-border text-klik-ink"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-klik-ink-muted mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form
              onSubmit={sendChat}
              className="p-3 border-t border-klik-border bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tulis pesan ke cabang..."
                className="flex-1 h-10 px-3 text-xs rounded-lg border border-klik-border-input focus:outline-none focus:border-klik-blue"
              />
              <button
                type="submit"
                aria-label="Kirim pesan"
                className="h-10 w-10 rounded-lg bg-klik-blue text-white flex items-center justify-center hover:bg-klik-blue-hover"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
