/**
 * Textura de grano sutil vía SVG feTurbulence, como data URI — sin assets
 * externos. Se usa como capa de background-image junto a gradientes para
 * dar sensación de superficie real (metal, papel, foto) en vez de flat.
 */
const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.35" />
</svg>`;

export const grainLayer = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;
