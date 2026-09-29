import React from 'react';
import { STICKER_OPTIONS } from '../data/options';

interface StickerArtworkProps {
  stickerId: string;
  fallback?: string;
  className?: string;
}

export const StickerArtwork: React.FC<StickerArtworkProps> = ({ stickerId, fallback, className = '' }) => {
  const option = STICKER_OPTIONS.find(sticker => sticker.id === stickerId);

  // Older saved designs may still contain the previous emoji stickers.
  if (!option) return <span className={className}>{fallback || '✦'}</span>;

  return <img src={option.imageSrc} alt="" draggable={false} className={`block object-contain ${className}`} />;
};
