import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg viewBox="0 0 100 100" width={32} height={32}>
        <circle cx="50" cy="50" r="48" fill="#FCC63A" />
        <path
          d="M 2,50 A 48,48 0 0,0 98,50 C 98,26 50,26 50,50 C 50,74 2,74 2,50 Z"
          fill="#003DA5"
        />
      </svg>
    ),
    { ...size }
  );
}
