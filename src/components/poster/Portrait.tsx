"use client";

import { useState } from "react";
import Image from "next/image";
import { PROFILE } from "@/data/portfolio";

/**
 * Hero portrait. Primary source is the editorial cut (`PROFILE.photo` →
 * /images/heak-editorial.png). Until that file lands in /public/images, the
 * load fails and we swap to `PROFILE.photoFallback` (/images/heak-cutout.png).
 * Both should be transparent waist-up PNGs, roughly 4:5.
 */
export default function Portrait() {
  const [src, setSrc] = useState<string>(PROFILE.photo);

  return (
    <Image
      src={src}
      alt={`Portrait of ${PROFILE.name}`}
      width={1200}
      height={1500}
      sizes="(min-width: 1024px) 460px, (min-width: 640px) 380px, 78vw"
      loading="eager"
      fetchPriority="high"
      onError={() => {
        if (src !== PROFILE.photoFallback) setSrc(PROFILE.photoFallback);
      }}
      className="portrait-fade h-auto w-full select-none"
      draggable={false}
    />
  );
}
