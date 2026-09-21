export type CustomizationTier = 'BASIC' | 'CUSTOM' | 'PREMIUM';

export interface FrameOption {
  id: string;
  name: string;
  enName: string;
  description: string;
  cornerStyle: 'rounded-2xl' | 'rounded-lg' | 'rounded-3xl' | 'rounded-none';
  borderWidth: string;
  hasScrews: boolean;
  screwType: 'silver' | 'gold' | 'black';
  priceAddon: number;
}

export interface FrameColorOption {
  id: string;
  name: string;
  hex: string;
  glowColor: string;
  outerBorder: string;
  innerGlow: string;
}

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'pattern' | 'galaxy' | 'y2k' | 'custom';
  cssClass: string;
  backgroundStyle?: string;
  priceAddon: number;
  isSpecial: boolean;
}

export interface StickerOption {
  id: string;
  symbol: string;
  name: string;
  category: 'star' | 'heart' | 'cyber' | 'cute';
  priceAddon: number;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  symbol: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // px
  rotation: number; // deg
  color: string;
}

export interface TextConfig {
  content: string;
  font: string;
  fontSize: number;
  color: string;
  rotation: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  isSpecialFont: boolean;
}

export interface CustomizerState {
  tier: CustomizationTier;
  frameStyleId: string;
  frameColorId: string;
  backgroundId: string;
  customBgUrl: string | null;
  photocardUrl: string;
  photocardName: string;
  isCustomPhoto: boolean;
  stickers: PlacedSticker[];
  text: TextConfig;
}

export interface PriceItem {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  basePrice: number;
  addons: PriceItem[];
  totalPrice: number;
}

export type SubmissionStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface DesignSubmission {
  id: string;
  submission_code: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  plan: CustomizationTier;
  plan_name: string;
  base_price: number;
  final_price: number;
  card_image_url: string;
  frame_style: string;
  frame_color: string;
  background: string;
  decorations: string;
  custom_text: string;
  font: string;
  design_data: Record<string, any>;
  preview_image_url: string;
  status: SubmissionStatus;
}
