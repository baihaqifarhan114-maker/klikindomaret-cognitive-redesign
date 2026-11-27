"use client";

import React, { useState } from "react";

interface KlikLogoProps {
  compact?: boolean;
}

export function KlikLogo({ compact = false }: KlikLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/images/klik-logo.png"
        alt="Klik Indomaret"
        className={compact ? "h-5 w-auto object-contain" : "h-6 w-auto object-contain"}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <span className="font-extrabold tracking-tight text-klik-blue text-lg leading-none">
        KLIK
      </span>
      <span className="inline-flex flex-col rounded px-1.5 py-0.5 bg-white border border-klik-border leading-none">
        <span className="h-[2px] w-full bg-[#1178D4] rounded-full mb-[1.5px]" />
        <span className="text-[9px] font-bold text-[#1178D4] tracking-tight">Indomaret</span>
        <span className="flex gap-[1px] mt-[1.5px]">
          <span className="h-[2px] flex-1 bg-[#EE2B2E]" />
          <span className="h-[2px] flex-1 bg-[#F29D0D]" />
        </span>
      </span>
    </div>
  );
}
