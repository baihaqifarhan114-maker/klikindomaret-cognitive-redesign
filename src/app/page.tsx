"use client";

import React, { useEffect, useState } from "react";
import { DemoToolbar, type PrototypeMode, type ViewportMode } from "@/components/DemoToolbar";
import { ExistingView } from "@/components/existing/ExistingView";
import { RedesignView } from "@/components/redesign/RedesignView";

export default function PrototypePage() {
  const [mode, setMode] = useState<PrototypeMode>("redesign");
  const [viewport, setViewport] = useState<ViewportMode>("auto");
  const [nativeMobile, setNativeMobile] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [showMetricsDrawer, setShowMetricsDrawer] = useState(false);
  const [cleanView, setCleanView] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  // True natural responsive detection: Desktop on laptop, Mobile on phone automatically
  useEffect(() => {
    const check = () => setNativeMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSimulatedPhone = viewport === "mobile" && !nativeMobile;
  const effectiveMobile = viewport === "mobile" || (viewport === "auto" && nativeMobile);

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF2F7]">
      <DemoToolbar
        mode={mode}
        setMode={(m) => {
          setMode(m);
          setActiveAnnotation(null);
        }}
        viewport={viewport}
        setViewport={setViewport}
        showAnnotations={showAnnotations}
        setShowAnnotations={(v) => {
          setShowAnnotations(v);
          if (!v) setActiveAnnotation(null);
        }}
        showMetricsDrawer={showMetricsDrawer}
        setShowMetricsDrawer={setShowMetricsDrawer}
        cleanView={cleanView}
        setCleanView={setCleanView}
        onResetDemo={() => {
          setResetSignal((n) => n + 1);
          setActiveAnnotation(null);
        }}
      />

      {isSimulatedPhone ? (
        /* Desktop Preview of 390px Mobile Frame */
        <div className="flex-1 flex items-start justify-center py-6 px-4">
          <div className="w-[390px] max-w-full rounded-[32px] border-[8px] border-[#0B192C] bg-white shadow-2xl overflow-hidden flex flex-col">
            <div className="h-7 bg-white px-5 flex items-center justify-between text-[11px] font-semibold text-klik-ink border-b border-klik-border/50 select-none">
              <span>09:41</span>
              <span className="h-3.5 w-20 rounded-full bg-[#0B192C]" />
              <span>5G • 100%</span>
            </div>

            <div className="h-[740px] overflow-y-auto klik-scrollbar relative">
              {mode === "existing" ? (
                <ExistingView
                  isMobile
                  showAnnotations={showAnnotations}
                  activeAnnotation={activeAnnotation}
                  onSelectAnnotation={setActiveAnnotation}
                  resetSignal={resetSignal}
                />
              ) : (
                <RedesignView
                  isMobile
                  showAnnotations={showAnnotations}
                  activeAnnotation={activeAnnotation}
                  onSelectAnnotation={setActiveAnnotation}
                  resetSignal={resetSignal}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Native Responsive View (Full Desktop on laptop, Full Mobile on phone) */
        <div className="flex-1 bg-[#F7F9FC]">
          {mode === "existing" ? (
            <ExistingView
              isMobile={effectiveMobile}
              showAnnotations={showAnnotations}
              activeAnnotation={activeAnnotation}
              onSelectAnnotation={setActiveAnnotation}
              resetSignal={resetSignal}
            />
          ) : (
            <RedesignView
              isMobile={effectiveMobile}
              showAnnotations={showAnnotations}
              activeAnnotation={activeAnnotation}
              onSelectAnnotation={setActiveAnnotation}
              resetSignal={resetSignal}
            />
          )}
        </div>
      )}
    </div>
  );
}
