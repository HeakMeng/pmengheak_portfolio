"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Building2, Code2, GraduationCap, ImageOff, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

/** Keys (not components) so server components can choose a fallback across the client boundary. */
const FALLBACKS = {
  image: ImageOff,
  user: UserRound,
  school: GraduationCap,
  building: Building2,
  code: Code2,
} as const;

type Props = ImageProps & {
  /** SVG icon drawn in place of the image if it fails to load. */
  fallback?: keyof typeof FALLBACKS;
};

/** next/image that degrades to an SVG icon instead of a broken-image glyph. */
export default function SmartImage({ fallback = "image", alt, className, fill, width, height, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const Icon = FALLBACKS[fallback];
    return (
      <span
        role="img"
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn("flex items-center justify-center bg-[#F1ECE3] text-[#141414]/40", fill ? "absolute inset-0" : className)}
      >
        <Icon className="h-1/2 max-h-10 w-1/2 max-w-10" aria-hidden="true" />
      </span>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
