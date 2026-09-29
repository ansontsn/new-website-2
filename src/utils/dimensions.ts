export const FRAME_WIDTH_MM = 85;
export const FRAME_HEIGHT_MM = 115;
export const CARD_WIDTH_MIN_MM = 50;
export const CARD_WIDTH_MAX_MM = 63;
export const CARD_HEIGHT_MIN_MM = 70;
export const CARD_HEIGHT_MAX_MM = 90;
export const MAGNET_DIAMETER_MM = 6;
export const MAGNET_CENTERS_MM = [
  { xMm: 8, yMm: 8 },
  { xMm: 77, yMm: 8 },
  { xMm: 8, yMm: 107 },
  { xMm: 77, yMm: 107 }
] as const;

export const CARD_SIZE_PRESETS = [
  { label: '55 × 85 mm', widthMm: 55, heightMm: 85 },
  { label: '54 × 86 mm', widthMm: 54, heightMm: 86 },
  { label: '63 × 88 mm', widthMm: 63, heightMm: 88 },
  { label: '60 × 90 mm', widthMm: 60, heightMm: 90 }
] as const;

export const centeredCardPosition = (widthMm: number, heightMm: number) => ({
  xMm: (FRAME_WIDTH_MM - widthMm) / 2,
  yMm: (FRAME_HEIGHT_MM - heightMm) / 2
});

export const mmToPx = (mm: number, scale: number) => mm * scale;
export const pxToMm = (px: number, scale: number) => px / scale;

export type CardAnchor =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export const getCardAnchorMm = (anchor: CardAnchor, widthMm: number, heightMm: number) => {
  const { xMm, yMm } = centeredCardPosition(widthMm, heightMm);
  const x = anchor.endsWith('left') ? xMm : anchor.endsWith('right') ? xMm + widthMm : xMm + widthMm / 2;
  const y = anchor.startsWith('top') ? yMm : anchor.startsWith('bottom') ? yMm + heightMm : yMm + heightMm / 2;
  return { xMm: x, yMm: y };
};

export const isCardSizeSupported = (widthMm: number, heightMm: number) =>
  Number.isFinite(widthMm) && Number.isFinite(heightMm) &&
  widthMm >= CARD_WIDTH_MIN_MM && widthMm <= CARD_WIDTH_MAX_MM &&
  heightMm >= CARD_HEIGHT_MIN_MM && heightMm <= CARD_HEIGHT_MAX_MM;
