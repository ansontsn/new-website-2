import { CustomizerState, PriceBreakdown, PriceItem } from '../types';
import { BACKGROUND_OPTIONS, FONT_OPTIONS } from '../data/options';

export function calculatePrice(state: CustomizerState): PriceBreakdown {
  const addons: PriceItem[] = [];

  const BASE_PRICES: Record<string, number> = { BASIC: 199, CUSTOM: 299, PREMIUM: 399 };
  const basePrice = BASE_PRICES[state.tier] || 199;

  // Special background (+30)
  const bg = BACKGROUND_OPTIONS.find(b => b.id === state.backgroundId);
  if (bg && bg.isSpecial) {
    addons.push({ label: `特殊背景 (${bg.name})`, amount: 30 });
  } else if (state.customBgUrl) {
    addons.push({ label: '自訂上傳專屬背景', amount: 30 });
  }

  // Addon: Custom text (+20)
  if (state.text.content && state.text.content.trim().length > 0 && state.tier !== 'BASIC') {
    addons.push({ label: '客製化雷雕／印刷文字', amount: 20 });
  }

  // Addon: Special font (+20)
  const fontOpt = FONT_OPTIONS.find(f => f.id === state.text.font);
  if (fontOpt && fontOpt.isSpecial && state.tier !== 'BASIC') {
    addons.push({ label: `特殊字體選配 (${fontOpt.name})`, amount: 20 });
  }

  // Addon: Extra decorations (> 2 stickers: +20)
  if (state.stickers.length > 2 && state.tier !== 'BASIC') {
    addons.push({ label: `額外裝飾配件 (${state.stickers.length}枚)`, amount: 20 });
  }

  const totalPrice = basePrice + addons.reduce((sum, item) => sum + item.amount, 0);

  return {
    basePrice,
    addons,
    totalPrice
  };
}
