"use client";

import React from "react";
import {
  BarChart3,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  LayoutTemplate,
  X,
  Info,
  RotateCcw,
} from "lucide-react";
import { BENCHMARK_METRICS } from "@/data/catalog";

export type PrototypeMode = "existing" | "redesign";
export type ViewportMode = "auto" | "desktop" | "mobile";

interface DemoToolbarProps {
  mode: PrototypeMode;
  setMode: (m: PrototypeMode) => void;
  viewport: ViewportMode;
  setViewport: (v: ViewportMode) => void;
  showAnnotations: boolean;
  setShowAnnotations: (v: boolean) => void;
  showMetricsDrawer: boolean;
  setShowMetricsDrawer: (v: boolean) => void;
  cleanView: boolean;
  setCleanView: (v: boolean) => void;
  onResetDemo: () => void;
}

export function DemoToolbar({
  mode,
  setMode,
  viewport,
  setViewport,
  showAnnotations,
  setShowAnnotations,
  showMetricsDrawer,
  setShowMetricsDrawer,
  cleanView,
  setCleanView,
  onResetDemo,
}: DemoToolbarProps) {
  if (cleanView) {
    return (
      <button
        type="button"
        onClick={() => setCleanView(false)}
        className="fixed bottom-4 right-4 z-[90] flex items-center gap-2 rounded-full bg-[#0B192C] text-white px-3.5 py-2 text-xs font-semibold shadow-lg border border-slate-700 hover:bg-slate-800 klik-press"
      >
        <Eye className="w-3.5 h-3.5 text-[#F29D0D]" />
        Kontrol Demo ({mode === "redesign" ? "Redesign" : "Eksisting"})
      </button>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-[80] w-full bg-[#0B192C] text-white border-b border-slate-800 px-3 sm:px-4 py-1.5">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#F29D0D]" />
            <span className="text-xs font-semibold tracking-tight text-slate-100">
              Demo Rekayasa Kognitif
            </span>
          </div>

          {/* Center: Mode & Responsive Viewport */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex rounded-md bg-slate-900 p-0.5 border border-slate-700"
              role="group"
              aria-label="Mode tampilan"
            >
              <button
                type="button"
                onClick={() => setMode("existing")}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  mode === "existing"
                    ? "bg-[#EE2B2E] text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Eksisting
              </button>
              <button
                type="button"
                onClick={() => setMode("redesign")}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                  mode === "redesign"
                    ? "bg-[#1178D4] text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Redesign
              </button>
            </div>

            <div
              className="hidden md:inline-flex rounded-md bg-slate-900 p-0.5 border border-slate-700"
              role="group"
              aria-label="Ukuran layar"
            >
              <button
                type="button"
                onClick={() => setViewport("auto")}
                title="Responsif alami mengikuti layar perangkat"
                className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                  viewport === "auto"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                <span>Auto</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                  viewport === "desktop"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                  viewport === "mobile"
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border flex items-center gap-1.5 transition-colors ${
                showAnnotations
                  ? "bg-[#F29D0D] text-[#151823] border-[#F29D0D]"
                  : "bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800"
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Pin Teori</span>
            </button>

            <button
              type="button"
              onClick={() => setShowMetricsDrawer(true)}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-900 text-slate-200 border border-slate-700 hover:bg-slate-800 flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Data &amp; Metrik</span>
            </button>

            <button
              type="button"
              onClick={onResetDemo}
              title="Reset demo"
              className="p-1.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setCleanView(true)}
              title="Sembunyikan bar demo"
              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-900 text-slate-300 border border-slate-700 hover:text-white flex items-center gap-1"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Clean</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics & Evidence Side Drawer */}
      {showMetricsDrawer && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/50 flex justify-end"
          onClick={() => setShowMetricsDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[440px] bg-white h-full overflow-y-auto p-5 shadow-2xl text-klik-ink"
          >
            <div className="flex items-center justify-between pb-3 border-b border-klik-border">
              <div>
                <h2 className="text-base font-bold text-klik-ink">
                  Bukti Empiris &amp; Evaluasi Terukur
                </h2>
                <p className="text-xs text-klik-ink-muted">
                  Inspeksi live, 350 ulasan store, dan literatur sekunder
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMetricsDrawer(false)}
                aria-label="Tutup panel metrik"
                className="p-1.5 rounded-md hover:bg-klik-surface text-klik-ink-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-5">
              <section>
                <h3 className="text-xs font-bold text-[#0B4F8C] mb-2">
                  Rating Toko Aplikasi (27 Nov 2026)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-klik-border p-3 bg-[#F7F9FC]">
                    <p className="text-[11px] font-semibold text-klik-ink-muted">Google Play</p>
                    <p className="text-xl font-bold text-klik-ink mt-0.5">
                      {BENCHMARK_METRICS.storeRatings.googlePlay.klik}
                      <span className="text-xs font-normal text-klik-ink-muted"> / 5</span>
                    </p>
                    <p className="text-[11px] text-[#0B4F8C] font-semibold mt-0.5">
                      -0,66★ vs Alfagift (4,19)
                    </p>
                    <p className="text-[10.5px] text-klik-ink-muted mt-1">
                      208.567 rating • 32,8% ★1
                    </p>
                  </div>
                  <div className="rounded-lg border border-klik-border p-3 bg-[#F7F9FC]">
                    <p className="text-[11px] font-semibold text-klik-ink-muted">Apple App Store</p>
                    <p className="text-xl font-bold text-klik-ink mt-0.5">
                      {BENCHMARK_METRICS.storeRatings.appStore.klik}
                      <span className="text-xs font-normal text-klik-ink-muted"> / 5</span>
                    </p>
                    <p className="text-[11px] text-[#0B4F8C] font-semibold mt-0.5">
                      -0,77★ vs Alfagift (4,29)
                    </p>
                    <p className="text-[10.5px] text-klik-ink-muted mt-1">
                      25.435 rating • 94% ulasan baru ≤3★
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-[#0B4F8C] mb-2">
                  Evaluasi Eksisting vs Redesign
                </h3>
                <div className="rounded-lg border border-klik-border overflow-hidden">
                  <table className="w-full text-[11.5px]">
                    <thead className="bg-[#0B4F8C] text-white">
                      <tr>
                        <th className="text-left px-2.5 py-2 font-semibold">Indikator</th>
                        <th className="text-left px-2.5 py-2 font-semibold">Eksisting</th>
                        <th className="text-left px-2.5 py-2 font-semibold">Redesign</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-klik-border">
                      {BENCHMARK_METRICS.modelComparison.map((row) => (
                        <tr key={row.metric} className="bg-white">
                          <td className="px-2.5 py-2 font-medium text-klik-ink">{row.metric}</td>
                          <td className="px-2.5 py-2 text-klik-ink-secondary">{row.existing}</td>
                          <td className="px-2.5 py-2 font-semibold text-[#0B4F8C]">
                            {row.redesign}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-[#0B4F8C] mb-2">Rujukan Jurnal Sekunder</h3>
                <ul className="space-y-2 text-[11.5px] text-klik-ink-secondary leading-relaxed">
                  <li className="rounded-md bg-[#F7F9FC] p-2.5">
                    <strong className="text-klik-ink">Latifah &amp; Hasan (2026, SISTEMASI):</strong>{" "}
                    SUS Klik Indomaret <strong>42,04</strong> naik ke <strong>77,58</strong> (+35,54
                    poin) setelah redesign.
                  </li>
                  <li className="rounded-md bg-[#F7F9FC] p-2.5">
                    <strong className="text-klik-ink">Arini dkk. (2025, JUSIFOR):</strong> NASA-TLX
                    pembayaran (n = 50) kategori <strong>Agak Tinggi</strong>, tertinggi pada{" "}
                    <em>Mental Demand</em> dan <em>Performance</em>.
                  </li>
                  <li className="rounded-md bg-[#F7F9FC] p-2.5">
                    <strong className="text-klik-ink">Studi Komparasi UBSI (2025):</strong> SUS Klik
                    Indomaret <strong>62,88</strong> vs Alfagift <strong>72,45</strong>.
                  </li>
                  <li className="rounded-md bg-[#F7F9FC] p-2.5">
                    <strong className="text-klik-ink">
                      Yuwono &amp; Anggraeni (2023, GESTALT) &amp; Ayatulloh (2026, UB):
                    </strong>{" "}
                    Kompleksitas visual menghambat pemindaian; pola <em>Eliminating Redundancy</em>{" "}
                    menurunkan beban kognitif.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
