/**
 * Summit Seeker logo mark — a minimalist twin-peak mountain with a snowcap,
 * tying into the pixel-art mountain hero. Inline SVG, accent-colored,
 * no external assets.
 */
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* back peak */}
      <path d="M13.2 20 18 9.5 22.8 20Z" fill="var(--accent)" opacity="0.45" />
      {/* front peak */}
      <path d="M1.2 20 9 4l7.8 16Z" fill="var(--accent)" />
      {/* snowcap on the front peak */}
      <path d="M9 4 6.7 8.7l1.5-.9 1.6 1.2 1.5-1.1 1.1.8Z" fill="#fff" opacity="0.9" />
    </svg>
  );
}
