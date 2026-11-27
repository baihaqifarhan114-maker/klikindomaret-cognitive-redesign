"use client";

import React from "react";
import { COGNITIVE_ANNOTATIONS, type CognitiveAnnotation } from "@/data/catalog";
import { X } from "lucide-react";

interface AnnotationPinProps {
  annotationId: string;
  visible: boolean;
  activeId: string | null;
  onSelect: (id: string | null) => void;
  align?: "left" | "right";
}

export function AnnotationPin({
  annotationId,
  visible,
  activeId,
  onSelect,
  align = "left",
}: AnnotationPinProps) {
  if (!visible) return null;

  const item = COGNITIVE_ANNOTATIONS.find((a) => a.id === annotationId);
  if (!item) return null;

  const isOpen = activeId === item.id;

  return (
    <div className="relative inline-flex items-center z-40">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isOpen ? null : item.id);
        }}
        title={`Teori #${item.number}: ${item.title}`}
        className={`h-6 w-6 rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-md transition-transform ${
          isOpen
            ? "bg-klik-red text-white scale-110"
            : "bg-[#0F172A] text-[#FDE047] hover:scale-110"
        }`}
      >
        {item.number}
      </button>

      {isOpen && (
        <AnnotationCard
          item={item}
          align={align}
          onClose={() => onSelect(null)}
        />
      )}
    </div>
  );
}

function AnnotationCard({
  item,
  align,
  onClose,
}: {
  item: CognitiveAnnotation;
  align: "left" | "right";
  onClose: () => void;
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute top-8 ${
        align === "right" ? "right-0" : "left-0"
      } w-[300px] sm:w-[328px] rounded-lg bg-[#0F172A] text-white p-3.5 shadow-xl border border-slate-700 z-50 text-left`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="inline-block text-[10px] font-semibold text-[#FDE047] bg-slate-800 px-2 py-0.5 rounded">
            #{item.number} {item.theory}
          </span>
          <h4 className="text-[13px] font-bold text-white mt-1 leading-snug">
            {item.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded"
          aria-label="Tutup anotasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1.5 text-[11.5px] leading-relaxed">
        <p className="text-slate-300">
          <span className="font-semibold text-rose-300">Eksisting:</span> {item.existingIssue}
        </p>
        <p className="text-slate-200">
          <span className="font-semibold text-sky-300">Perbaikan:</span> {item.redesignFix}
        </p>
        <p className="text-emerald-300 font-medium pt-1 border-t border-slate-700">
          Dampak: {item.impactMetric}
        </p>
      </div>
    </div>
  );
}
