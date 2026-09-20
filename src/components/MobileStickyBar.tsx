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
    <div className="lg:hidden fixed bottom-14 sm:bottom-12 inset-x-3 z-40 bg-[#12141c]/95 border border-pink-500/40 p-3 rounded-2xl backdrop-blur-xl flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
      <div className="pl-1.5">
        <span className="text-[10px] text-slate-400 uppercase font-mono block tracking-wider">
          預估打樣總額
        </span>
        <div className="text-xl font-black text-pink-400 font-mono leading-none mt-0.5">
          NT${priceBreakdown.totalPrice}
        </div>
      </div>

      <button
        onClick={onFinishDesign}
        className="py-2.5 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/30 flex items-center gap-1.5 active:scale-95 transition-all"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>完成設計</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
