import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { CustomizationTier } from '../types';

interface NavbarProps {
  currentView: 'home' | 'tiers' | 'customizer' | 'confirmation' | 'about';
  onNavigate: (view: 'home' | 'tiers' | 'customizer' | 'confirmation' | 'about') => void;
  tier: CustomizationTier;
  totalPrice?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  tier,
  totalPrice
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0e14]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 p-[1.5px] shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0f1118] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400 animate-pulse-subtle" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg bg-gradient-to-r from-white via-slate-200 to-pink-300 bg-clip-text text-transparent">
                LUMINA FRAME
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5">小卡客製化展示框</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 text-xs font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              currentView === 'home'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            首頁
          </button>
          <button
            onClick={() => onNavigate('tiers')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              currentView === 'tiers'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            方案選擇
          </button>
          <button
            onClick={() => onNavigate('customizer')}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === 'customizer'
                ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 font-semibold border border-pink-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            客製化編輯器
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              currentView === 'about'
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            關於概念
          </button>
        </nav>

        {/* Action Button & Status */}
        <div className="flex items-center gap-3">
          {currentView === 'customizer' && totalPrice !== undefined && (
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] uppercase tracking-wider text-pink-400 font-mono">
                {tier} 方案
              </span>
              <span className="text-sm font-bold text-white">NT${totalPrice}</span>
            </div>
          )}

          <button
            onClick={() => {
              if (currentView === 'home') onNavigate('tiers');
              else if (currentView === 'tiers') onNavigate('customizer');
              else if (currentView === 'about') onNavigate('tiers');
              else onNavigate('tiers');
            }}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{currentView === 'customizer' ? '切換方案' : '開始客製化'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
