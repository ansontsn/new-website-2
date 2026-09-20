import React from 'react';
import { PriceBreakdown } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MobileStickyBarProps {
  priceBreakdown: PriceBreakdown;
  onFinishDesign: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  priceBreakdown,
  onFinishDesign
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0c0e14]/95 border-t border-white/10 p-3.5 backdrop-blur-xl flex items-center justify-between shadow-2xl">
      <div>
        <span className="text-[10px] text-slate-400 uppercase font-mono block">
          預估打樣總額
        </span>
        <div className="text-xl font-black text-pink-400 font-mono">
          NT${priceBreakdown.totalPrice}
        </div>
      </div>

      <button
        onClick={onFinishDesign}
        className="py-2.5 px-5 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 flex items-center gap-1.5 active:scale-95 transition-all"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>完成設計</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
