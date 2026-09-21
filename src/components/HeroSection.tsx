import React from 'react';
import { Sparkles, ArrowRight, Layers, Eye, Sliders } from 'lucide-react';

interface HeroSectionProps {
  onStartCustomizing: () => void;
  onOpenHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCustomizing,
  onOpenHowItWorks
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-500/10 via-amber-400/10 to-purple-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200/80 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>企管系專題 MVP · 收藏品客製化互動展示平台</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              打造屬於你的
              <span className="block mt-1 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                收藏小卡客製展示框
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              從基本款到完全客製，由你決定你的收藏品應該長什麼樣子。
              專為 K-pop 偶像小卡、二次元動漫與手遊角色設計的高透壓克力展示系統。
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm">
                <Sliders className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <span>自由掌握客製深度</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm">
                <Eye className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>即時光影 3D 預覽</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 p-2.5 rounded-xl bg-white/80 border border-stone-200/80 shadow-sm">
                <Layers className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>實時透明動態計價</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onStartCustomizing}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-pink-200" />
                <span>開始客製化</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenHowItWorks}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-sm sm:text-base bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-stone-300/80 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>看看怎麼製作</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 pt-2">
              * 目前為 Prototype 概念產品，所有規格與預估價格供畢業專題打樣評估使用。
            </p>
          </div>

          {/* Right Column: Pure CSS/HTML 3D Acrylic Frame Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group cursor-pointer" onClick={onStartCustomizing}>
              
              {/* Decorative background glow rings */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-pink-500/30 to-purple-600/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 3D Floating Acrylic Mockup Container */}
              <div className="relative w-[280px] sm:w-[310px] h-[430px] sm:h-[460px] rounded-2xl p-4 sm:p-5 acrylic-card shadow-acrylic border border-white/25 flex flex-col justify-between overflow-hidden animate-float">
                
                {/* 4 Corner Chrome Magnetic Screws */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full screw-head z-30 flex items-center justify-center">
                  <div className="w-2 h-[1px] bg-slate-800" />
                </div>
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full screw-head z-30 flex items-center justify-center">
                  <div className="w-2 h-[1px] bg-slate-800" />
                </div>
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full screw-head z-30 flex items-center justify-center">
                  <div className="w-2 h-[1px] bg-slate-800" />
                </div>
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full screw-head z-30 flex items-center justify-center">
                  <div className="w-2 h-[1px] bg-slate-800" />
                </div>

                {/* Glass Light Reflection Beam */}
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none glass-reflection rotate-25 opacity-70 z-20" />

                {/* Inner Gradient Nebula Background */}
                <div className="absolute inset-2 sm:inset-3 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-black z-0">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:12px_12px]" />
                </div>

                {/* Floating Stickers on Acrylic Face */}
                <div className="absolute top-8 left-8 text-pink-300 text-xl drop-shadow-md z-20">✦</div>
                <div className="absolute top-10 right-8 text-yellow-300 text-lg drop-shadow-md z-20">⭐</div>
                <div className="absolute bottom-16 right-8 text-rose-400 text-base drop-shadow-md z-20">♡</div>
                <div className="absolute bottom-24 left-7 text-purple-300 text-sm drop-shadow-md z-20">✧</div>

                {/* Embedded Photocard Slot (Pure CSS Mockup) */}
                <div className="relative z-10 mx-auto my-auto w-[185px] sm:w-[200px] h-[285px] sm:h-[305px] rounded-xl overflow-hidden p-[2px] bg-white/20 shadow-2xl border border-white/40">
                  <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-rose-400 via-pink-600 to-indigo-950 flex flex-col justify-between p-4 relative overflow-hidden">
                    
                    {/* Idol Silhouette / Avatar Placeholder */}
                    <div className="w-20 h-20 rounded-full mx-auto mt-4 bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>

                    {/* Card Content Text */}
                    <div className="text-center pb-2 z-10">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-pink-200 block">
                        LIMITED EDITION
                      </span>
                      <h4 className="text-base font-black tracking-wider text-white">
                        WONYOUNG ♡
                      </h4>
                      <span className="text-[9px] text-pink-300 font-semibold tracking-widest block mt-0.5">
                        2026 WORLD TOUR
                      </span>
                    </div>

                    {/* Laser Hologram Glare on Card */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Engraved Text on Acrylic Foot */}
                <div className="relative z-20 text-center pb-1">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-slate-300 uppercase px-3 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/10">
                    ONLYFRAME ACRYLIC 01
                  </span>
                </div>

              </div>

              {/* Click to Customize Hint Tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-pink-500 text-white font-bold text-xs shadow-lg shadow-pink-500/40 flex items-center gap-1.5 whitespace-nowrap animate-bounce">
                <Sparkles className="w-3 h-3" />
                <span>點擊立即試做</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
