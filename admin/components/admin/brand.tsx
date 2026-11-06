/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

/** The symbol in navy on light screens and white on dark ones, where navy would disappear. */
function Symbol({ width, height }: { width: number; height: number }) {
  return (
    <>
      <img className="sl-logo-light" src="/brand/symbol.png" alt="" width={width} height={height} />
      <img className="sl-logo-dark" src="/brand/symbol-white.png" alt="" width={width} height={height} />
    </>
  );
}

/** Surface Legend branding in the admin: symbol and name where Payload asks for a logo, symbol alone in the top bar. */
export function Logo() {
  return (
    <div className="sl-logo sl-wordmark sl-wordmark--large">
      <Symbol width={50} height={45} />
      <span>Surface Legend</span>
    </div>
  );
}

export function Icon() {
  return (
    <span className="sl-wordmark">
      <Symbol width={28} height={25} />
    </span>
  );
}

/** Top of the side menu: the logo, linking to the dashboard. */
export function NavBrand() {
  return (
    <Link className="sl-nav-brand sl-wordmark" href="/admin" aria-label="Surface Legend admin, dashboard">
      <Symbol width={36} height={32} />
      <span>Surface Legend</span>
    </Link>
  );
}
