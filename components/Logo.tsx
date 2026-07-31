/**
 * Brand mark for PhysioVisit.
 *
 * A gable roof and walls (care delivered at home) enclosing an ascending arc
 * that ends in a joint dot (range of motion restored). Drawn on a 32px grid in
 * the same stroke language as the icon set, so it sits naturally beside them.
 *
 * Colour comes from `currentColor`: white inside the gradient tile in the nav
 * and footer, blue when used bare.
 */
import { site } from '@/data/site';

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Heavier strokes for small renderings such as favicons. */
  strokeWidth?: number;
}

export function LogoMark({ size = 20, className, strokeWidth = 2.2 }: LogoMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* roof */}
      <path d="M4.6 13.8 16 5l11.4 8.8" />
      {/* walls */}
      <path d="M7.5 12.3v12.9a1.9 1.9 0 0 0 1.9 1.9h13.2a1.9 1.9 0 0 0 1.9-1.9V12.3" />
      {/* range-of-motion arc */}
      <path d="M11.2 22.4c.9-4.2 3.9-6.3 8-6.5" />
      {/* joint */}
      <circle cx="20.9" cy="15.8" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Whichever mark `site.brandLogo` selects. The drawn mark sits inside the blue
 * gradient tile; the supplied artwork is full-colour, so it renders bare.
 */
export function BrandLogo() {
  if (site.brandLogo === 'mark') {
    return (
      <span className="logo-mark">
        <LogoMark size={20} />
      </span>
    );
  }

  return (
    <img
      className="logo-image"
      src={`/logo-${site.brandLogo}.png`}
      alt=""
      width={256}
      height={256}
    />
  );
}

export default LogoMark;
