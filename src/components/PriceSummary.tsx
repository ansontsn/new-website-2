import React from 'react';
import { CustomizerState, PriceBreakdown } from '../types';
import { FRAME_OPTIONS, FRAME_COLOR_OPTIONS, BACKGROUND_OPTIONS } from '../data/options';
import { ArrowRight, Tag, Info, Check } from 'lucide-react';

interface PriceSummaryProps {
  state: CustomizerState;
  priceBreakdown: PriceBreakdown;
  onFinishDesign: () => void;
}

const TIER_BADGES: Record<string, { label: string; color: string }> = {
  BASIC: { label: 'BASIC 基本款', color: 'text-slate-300 bg-slate-800 border-slate-700' },
  CUSTOM: { label: 'CUSTOM 主題款', color: 'text-purple-300 bg-purple-950/60 border-purple-800' },
  PREMIUM: { label: 'PREMIUM 高度客製', color: 'text-pink-300 bg-pink-950/60 border-pink-800' }
};

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  state,
  priceBreakdown,
  onFinishDesign
}) => {
  const frameOpt = FRAME_OPTIONS.find(f => f.id === state.frameStyleId) || FRAME_OPTIONS[0];
  const colorOpt = FRAME_COLOR_OPTIONS.find(c => c.id === state.frameColorId) || FRAME_COLOR_OPTIONS[0];
  const bgOpt = BACKGROUND_OPTIONS.find(b => b.id === state.backgroundId) || BACKGROUND_OPTIONS[0];
  const badge = TIER_BADGES[state.tier] || TIER_BADGES.BASIC;

  return (
    <div className="flex flex-col h-full bg-[#12141c]/90 rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl justify-between">
      <div className="space-y-4">
        
        {/* Header & Current Tier */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-pink-400" />
              目前方案與配置
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">
            展示框配置清單
          </h2>
        </div>

        {/* Selected Config List */}
        <div className="space-y-2 py-2 border-y border-white/10 text-xs text-slate-300">
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">框型規格:</span>
            <span className="font-semibold text-white truncate max-w-[140px] text-right">
              {frameOpt.name}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">框體色系:</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full border border-white/40" 
                style={{ background: colorOpt.hex }}
              />
              {colorOpt.name.split(' ')[0]}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">背景樣式:</span>
            <span className="font-semibold text-white truncate max-w-[140px] text-right">
              {state.tier === 'BASIC' ? '原色透亮 (基本)' : bgOpt.name}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">潮流貼飾:</span>
            <span className="font-semibold text-white">
              {state.tier === 'BASIC' ? '無' : `${state.stickers.length} 枚`}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">客製文字:</span>
            <span className="font-semibold text-white truncate max-w-[130px] text-right">
              {state.tier === 'BASIC' || !state.text.content ? '無' : state.text.content}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">小卡預覽:</span>
            <span className="font-semibold text-white">
              {state.isCustomPhoto ? '個人上傳卡片模擬' : state.photocardUrl ? '示範卡模擬' : '純空框展示'}
            </span>
          </div>
        </div>

        {/* Dynamic Pricing Engine Breakdown */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
            動態價格明細
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>{badge.label} 基礎價格</span>
              <span className="font-mono font-bold text-white">NT${priceBreakdown.basePrice}</span>
            </div>

            {priceBreakdown.addons.map((addon, index) => (
              <div key={index} className="flex justify-between text-pink-300/90 text-[11px]">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-pink-400" />
                  {addon.label}
                </span>
                <span className="font-mono font-semibold">+NT${addon.amount}</span>
              </div>
            ))}
          </div>

          {/* Grand Total Price */}
          <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                即時試算總額
              </span>
              <span className="text-xs text-pink-400">
                {priceBreakdown.addons.length > 0 ? '包含客製選配項目' : '基本方案價'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent font-mono">
                NT${priceBreakdown.totalPrice}
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Disclaimer */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
          <p className="leading-tight">
            * 實體商品為客製壓克力展示框（出貨不含小卡）。金額為概念樣品預估打樣參考價。
          </p>
        </div>

      </div>

      {/* Primary CTA: Finish Design */}
      <div className="pt-4">
        <button
          onClick={onFinishDesign}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-pink-500/25 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2.5 group"
        >
          <img src="/logo.png" alt="ONLYFRAME" className="w-4 h-4 rounded object-contain shadow-xs" />
          <span>完成設計 ‧ 查看成品</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
