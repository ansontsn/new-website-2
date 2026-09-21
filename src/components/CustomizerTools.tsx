import React, { useState } from 'react';
import { 
  CustomizerState, 
  CustomizationTier, 
  PlacedSticker 
} from '../types';
import { 
  FRAME_OPTIONS, 
  FRAME_COLOR_OPTIONS, 
  BACKGROUND_OPTIONS, 
  STICKER_OPTIONS, 
  FONT_OPTIONS,
  PRESET_PHOTOCARDS
} from '../data/options';
import { 
  Box, 
  Palette, 
  Sparkles, 
  Type, 
  Image as ImageIcon, 
  Lock, 
  Trash2, 
  ArrowUpRight,
  Copy,
  RotateCw,
  Maximize2,
  SlidersHorizontal,
  UploadCloud,
  Info
} from 'lucide-react';

interface CustomizerToolsProps {
  state: CustomizerState;
  onUpdateState: (updates: Partial<CustomizerState>) => void;
  onUpgradeTier: (tier: CustomizationTier) => void;
  selectedStickerId?: string | null;
  onSelectSticker?: (id: string | null) => void;
}

type TabType = 'frame' | 'color' | 'background' | 'photo' | 'stickers' | 'text';

export const CustomizerTools: React.FC<CustomizerToolsProps> = ({
  state,
  onUpdateState,
  onUpgradeTier,
  selectedStickerId,
  onSelectSticker
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('frame');
  const [stickerFilter, setStickerFilter] = useState<'all' | 'star' | 'heart' | 'cyber' | 'cute'>('all');

  // Tier guards
  const isBasic = state.tier === 'BASIC';

  // Sticker actions
  const handleAddSticker = (stickerOptId: string) => {
    const opt = STICKER_OPTIONS.find(s => s.id === stickerOptId);
    if (!opt) return;

    const newId = `stk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newSticker: PlacedSticker = {
      id: newId,
      stickerId: opt.id,
      symbol: opt.symbol,
      x: Math.floor(Math.random() * 40) + 30, // 30-70%
      y: Math.floor(Math.random() * 40) + 30,
      size: 26,
      rotation: Math.floor(Math.random() * 20) - 10,
      color: '#ffffff'
    };

    onUpdateState({ stickers: [...state.stickers, newSticker] });
    onSelectSticker?.(newId);
  };

  const handleUpdateActiveSticker = (updates: Partial<PlacedSticker>) => {
    if (!selectedStickerId) return;
    onUpdateState({
      stickers: state.stickers.map((s) => (s.id === selectedStickerId ? { ...s, ...updates } : s))
    });
  };

  const handleDuplicateSticker = (id: string) => {
    const target = state.stickers.find(s => s.id === id);
    if (!target) return;
    const newId = `stk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const cloned: PlacedSticker = {
      ...target,
      id: newId,
      x: Math.min(90, target.x + 6),
      y: Math.min(90, target.y + 6)
    };
    onUpdateState({ stickers: [...state.stickers, cloned] });
    onSelectSticker?.(newId);
  };

  const handleRemoveSticker = (id: string) => {
    onUpdateState({ stickers: state.stickers.filter(s => s.id !== id) });
    if (selectedStickerId === id) {
      onSelectSticker?.(null);
    }
  };

  const activeSticker = state.stickers.find(s => s.id === selectedStickerId) || null;

  return (
    <div className="flex flex-col h-full bg-[#12141c]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
      
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/[0.02] overflow-x-auto">
        <button
          onClick={() => setActiveTab('frame')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'frame'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Box className="w-3.5 h-3.5 text-pink-400" />
          框體外型
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'color'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-purple-400" />
          框體顏色
        </button>

        <button
          onClick={() => setActiveTab('photo')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'photo'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
          小卡模擬預覽
        </button>

        <button
          onClick={() => setActiveTab('background')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'background'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          主題背景
          {isBasic && <Lock className="w-3 h-3 text-slate-500 ml-0.5" />}
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'stickers'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <span>⭐</span>
          裝飾貼飾
          {isBasic && <Lock className="w-3 h-3 text-slate-500 ml-0.5" />}
        </button>

        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
            activeTab === 'text'
              ? 'bg-white/15 text-white font-semibold shadow-inner'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Type className="w-3.5 h-3.5 text-emerald-400" />
          客製文字
          {isBasic && <Lock className="w-3 h-3 text-slate-500 ml-0.5" />}
        </button>
      </div>

      {/* Tab Panels Content */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
        
        {/* 1. FRAME STYLE */}
        {activeTab === 'frame' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>選擇壓克力展示框型</span>
                <span className="text-xs text-slate-400 font-normal">4 種幾何切面</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                高透亮雙層結構，物理卡槽保護珍貴小卡
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {FRAME_OPTIONS.map((f) => {
                const isSelected = state.frameStyleId === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateState({ frameStyleId: f.id })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{f.name}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-pink-400 ring-2 ring-pink-400/30" />
                      )}
                    </div>
                    <span className="text-[10px] text-pink-300 font-mono block mt-0.5">{f.enName}</span>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {f.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. FRAME COLOR */}
        {activeTab === 'color' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>選擇框體顏色與透光效果</span>
                <span className="text-xs text-slate-400 font-normal">純色/半透/曜黑</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                模擬物理折射光感，襯托小卡視覺焦點
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {FRAME_COLOR_OPTIONS.map((c) => {
                const isSelected = state.frameColorId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onUpdateState({ frameColorId: c.id })}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md flex-shrink-0"
                      style={{ background: c.hex, boxShadow: `0 0 10px ${c.glowColor}` }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-200 block truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {c.id}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PHOTOCARD DEMO & UPLOAD */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>小卡裝框效果模擬</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  純預覽 ‧ 成品僅含框
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                本商品販售實體為<strong>壓克力展示框本體</strong>（不含小卡）。您可在此切換示範卡片，模擬自己心愛的小卡裝入後的視覺風格。
              </p>
            </div>

            {/* Section A: Demo cards available for ALL TIERS */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                選擇示範小卡風格（所有方案皆可試看）：
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_PHOTOCARDS.map((preset) => {
                  const isSelected = state.photocardUrl === preset.url && !state.isCustomPhoto;
                  return (
                    <button
                      key={preset.id}
                      onClick={() =>
                        onUpdateState({
                          photocardUrl: preset.url,
                          photocardName: preset.name,
                          isCustomPhoto: false
                        })
                      }
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500/10 shadow-md ring-1 ring-pink-500/50'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-8 h-12 object-cover rounded-md border border-white/20 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-200 block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-pink-300 truncate block mt-0.5">
                          {(preset as any).desc || '示範小卡'}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Clear / Empty card slot toggle */}
                <button
                  onClick={() =>
                    onUpdateState({
                      photocardUrl: '',
                      photocardName: '純空框展示 (無卡)',
                      isCustomPhoto: false
                    })
                  }
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                    !state.photocardUrl
                      ? 'border-pink-500 bg-pink-500/10 shadow-md ring-1 ring-pink-500/50'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-12 rounded-md border border-dashed border-white/30 flex items-center justify-center text-slate-500 text-xs flex-shrink-0">
                    🔲
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-200 block truncate">
                      純透明空框
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      不放卡片，看純框
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Section B: Custom Photocard Upload (PREMIUM only) */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                上傳您自己的小卡圖片（PREMIUM 方案限定）：
              </span>

              {state.tier === 'PREMIUM' ? (
                <div className="space-y-3">
                  {state.isCustomPhoto && state.photocardUrl ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-pink-500/40">
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={state.photocardUrl} 
                          alt="已上傳小卡" 
                          className="w-10 h-14 object-cover rounded-md border border-white/20 flex-shrink-0" 
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {state.photocardName || '自訂小卡'}
                          </span>
                          <span className="text-[10px] text-pink-400 font-mono">已成功套用</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onUpdateState({ photocardUrl: '', photocardName: '純空框展示', isCustomPhoto: false })}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>清除</span>
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-white/15 hover:border-pink-400/50 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/[0.02] hover:bg-pink-500/5 transition-all">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              onUpdateState({
                                photocardUrl: ev.target.result as string,
                                photocardName: file.name,
                                isCustomPhoto: true
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">點擊上傳個人小卡圖片</span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">支援 PNG, JPG, WEBP（1:1 裝框模擬）</span>
                      </div>
                    </label>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-pink-950/30 border border-purple-500/30 text-center space-y-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto border border-purple-500/30">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">想上傳自己的專屬收藏小卡？</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      個人卡片圖片 1:1 模擬上傳功能為 <strong>PREMIUM 高度客製方案</strong> 專屬開放。
                    </p>
                  </div>
                  <button
                    onClick={() => onUpgradeTier('PREMIUM')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25 transition-all"
                  >
                    <span>升級至 PREMIUM 方案解鎖上傳</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 flex items-start gap-1.5">
              <span className="text-amber-400">⚠️</span>
              <span>再次提醒：此模擬小卡僅為展示比例參考，實體出貨只包含您客製的壓克力展示框。</span>
            </div>

          </div>
        )}

        {/* 4. BACKGROUND SELECTION */}
        {activeTab === 'background' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-white">展示框背景樣式</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                襯托小卡的主題背景（純色、漸層、雷射 Y2K、星塵星空）
              </p>
            </div>

            {isBasic ? (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 text-center space-y-2">
                <Lock className="w-6 h-6 text-pink-400 mx-auto" />
                <h4 className="text-xs font-bold text-pink-300">BASIC 方案僅支援原色透亮</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  主題背景與雷射銀河特效由 CUSTOM / PREMIUM 方案解鎖。
                </p>
                <button
                  onClick={() => onUpgradeTier('CUSTOM')}
                  className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-all"
                >
                  升級方案以選擇主題背景
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {BACKGROUND_OPTIONS.map((bg) => {
                  const isSelected = state.backgroundId === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() => onUpdateState({ backgroundId: bg.id })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-500 bg-pink-500/10 shadow-md'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className={`w-full h-12 rounded-lg border border-white/10 mb-2 ${bg.cssClass}`} />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200 block truncate">
                          {bg.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-pink-400 mt-0.5 block">
                        {bg.priceAddon > 0 ? `+NT$${bg.priceAddon}` : '包含在方案'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 5. DECORATIONS / STICKERS */}
        {activeTab === 'stickers' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>加入潮流裝飾配件</span>
                <span className="text-xs text-slate-400 font-normal">
                  已加入: {state.stickers.length} 枚
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                可自訂貼飾大小、旋轉角度、位置座標，打造極致層次感
              </p>
            </div>

            {isBasic ? (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 text-center space-y-2">
                <Lock className="w-6 h-6 text-pink-400 mx-auto" />
                <h4 className="text-xs font-bold text-pink-300">BASIC 方案不支援貼飾</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  主題裝飾與立體貼飾功能由 CUSTOM / PREMIUM 方案提供。
                </p>
                <button
                  onClick={() => onUpgradeTier('CUSTOM')}
                  className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-all"
                >
                  升級至 CUSTOM 主題款
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Sticker Category Filter */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
                  {[
                    { id: 'all', label: '全部款式' },
                    { id: 'star', label: '✦ 星芒' },
                    { id: 'heart', label: '♡ 愛心' },
                    { id: 'cyber', label: '⚡ 潮流/動漫' },
                    { id: 'cute', label: '🎀 甜美' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setStickerFilter(cat.id as any)}
                      className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap font-medium ${
                        stickerFilter === cat.id
                          ? 'bg-pink-500 text-white font-bold'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Sticker picker grid */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-300">
                      點擊即可置入展示框：
                    </span>
                  </div>

                  {/* Mobile Font Compatibility Notice */}
                  <div className="mb-2 p-2 sm:p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300/90 leading-snug flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      行動端若因系統字型差異出現圖案顯示空白問題，請直接點擊置入，以預覽圖顯現的圖案為主。
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1.5 bg-black/30 rounded-xl border border-white/10">
                    {STICKER_OPTIONS
                      .filter((stk) => stickerFilter === 'all' || stk.category === stickerFilter)
                      .map((stk) => (
                        <button
                          key={stk.id}
                          onClick={() => handleAddSticker(stk.id)}
                          className="h-11 rounded-xl border border-white/10 bg-white/[0.06] hover:border-pink-400 hover:bg-pink-500/20 text-xl flex items-center justify-center transition-all active:scale-90 group text-white select-none"
                          title={`${stk.name} - 點擊置入`}
                        >
                          <span className="group-hover:scale-125 transition-transform text-white font-extrabold flex items-center justify-center select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">
                            {stk.symbol}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* ACTIVE STICKER INSPECTOR (When a sticker is selected) */}
                {activeSticker ? (
                  <div className="p-3.5 rounded-2xl bg-pink-950/20 border border-pink-500/40 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-pink-500/20">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-1 bg-black/50 rounded-lg border border-pink-500/30 text-white font-bold flex items-center justify-center min-w-[38px] min-h-[38px]">
                          {activeSticker.symbol}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            自訂選中貼飾
                          </span>
                          <span className="text-[10px] text-pink-400 font-mono">
                            大小 {activeSticker.size}px ‧ 角度 {activeSticker.rotation}°
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicateSticker(activeSticker.id)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs flex items-center gap-1"
                          title="複製此貼飾"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveSticker(activeSticker.id)}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs flex items-center gap-1"
                          title="刪除此貼飾"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Size Slider */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Maximize2 className="w-3 h-3 text-pink-400" />
                          自訂大小
                        </span>
                        <span className="font-mono text-pink-300 font-bold">{activeSticker.size} px</span>
                      </div>
                      <input
                        type="range"
                        min={14}
                        max={58}
                        value={activeSticker.size}
                        onChange={(e) => handleUpdateActiveSticker({ size: Number(e.target.value) })}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    {/* Rotation Slider & Quick Buttons */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 flex items-center gap-1">
                          <RotateCw className="w-3 h-3 text-pink-400" />
                          旋轉角度
                        </span>
                        <span className="font-mono text-pink-300 font-bold">{activeSticker.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={-180}
                        max={180}
                        value={activeSticker.rotation}
                        onChange={(e) => handleUpdateActiveSticker({ rotation: Number(e.target.value) })}
                        className="w-full accent-pink-500"
                      />
                      <div className="flex items-center justify-between gap-1 pt-1.5">
                        {[-90, -45, 0, 45, 90, 180].map((deg) => (
                          <button
                            key={deg}
                            onClick={() => handleUpdateActiveSticker({ rotation: deg })}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                              activeSticker.rotation === deg
                                ? 'bg-pink-500 text-white font-bold'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                          >
                            {deg > 0 ? `+${deg}°` : `${deg}°`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                        貼飾色彩外觀：
                      </span>
                      <div className="flex items-center gap-2">
                        {[
                          { hex: '#ffffff', name: '純白' },
                          { hex: '#fda4af', name: '櫻粉' },
                          { hex: '#67e8f9', name: '冷藍' },
                          { hex: '#fcd34d', name: '金黃' },
                          { hex: '#c084fc', name: '電馭紫' },
                          { hex: '#1e293b', name: '深曜黑' }
                        ].map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => handleUpdateActiveSticker({ color: c.hex })}
                            className={`w-6 h-6 rounded-full border transition-transform ${
                              activeSticker.color === c.hex
                                ? 'scale-125 border-white ring-2 ring-pink-400'
                                : 'border-white/20 hover:scale-110'
                            }`}
                            style={{ background: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Precise Coordinate Controls */}
                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/5 text-[11px]">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-0.5">
                          <span>水平 X</span>
                          <span className="font-mono text-slate-200">{activeSticker.x}%</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={95}
                          value={activeSticker.x}
                          onChange={(e) => handleUpdateActiveSticker({ x: Number(e.target.value) })}
                          className="w-full accent-pink-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-400 mb-0.5">
                          <span>垂直 Y</span>
                          <span className="font-mono text-slate-200">{activeSticker.y}%</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={95}
                          value={activeSticker.y}
                          onChange={(e) => handleUpdateActiveSticker({ y: Number(e.target.value) })}
                          className="w-full accent-pink-500"
                        />
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
                    💡 點選下方任一已加入的貼飾（或在中央展示框直接點擊），即可解鎖<strong>自訂大小、旋轉與色彩</strong>！
                  </div>
                )}

                {/* Active Stickers Chips List */}
                {state.stickers.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-white/10">
                    <span className="text-xs font-semibold text-slate-400 block">
                      已加入的裝飾清單 (點擊選取編輯):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {state.stickers.map((stk, idx) => {
                        const isSelected = selectedStickerId === stk.id;
                        return (
                          <div
                            key={stk.id}
                            onClick={() => onSelectSticker?.(stk.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-md ring-1 ring-pink-400'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <span className="text-base" style={{ color: stk.color }}>
                              {stk.symbol}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSticker(stk.id);
                              }}
                              className="text-slate-400 hover:text-rose-400 ml-1 p-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg leading-relaxed">
                  💡 <strong>直覺互動提示</strong>：在中央壓克力展示框上，直接按住貼飾即可任意拖曳移動擺放位置！
                </p>

              </div>
            )}
          </div>
        )}

        {/* 6. CUSTOM TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">客製刻字與應援金句</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                印製本命偶像姓名、出道紀念日、名台詞或自訂展示銘文
              </p>
            </div>

            {isBasic ? (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/30 text-center space-y-2">
                <Lock className="w-6 h-6 text-pink-400 mx-auto" />
                <h4 className="text-xs font-bold text-pink-300">BASIC 方案不支援雷雕文字</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  專屬刻字印刷與多樣字體由 CUSTOM / PREMIUM 方案提供。
                </p>
                <button
                  onClick={() => onUpgradeTier('CUSTOM')}
                  className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-all"
                >
                  升級至 CUSTOM 主題款 (+NT$100)
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    輸入文字內容：
                  </label>
                  <input
                    type="text"
                    value={state.text.content}
                    onChange={(e) =>
                      onUpdateState({
                        text: { ...state.text, content: e.target.value }
                      })
                    }
                    placeholder="例: LOVE WONYOUNG, 2026.09.20"
                    maxLength={30}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* 2 Quick Position Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      常用刻字位置：
                    </label>
                    <span className="text-[11px] text-pink-400">亦可在展示框直接拖曳</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: '📌 底部中央銘牌 (推薦)', x: 50, y: 86, rot: 0 },
                      { label: '📌 框體頂部抬頭', x: 50, y: 12, rot: 0 }
                    ].map((pos, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          onUpdateState({
                            text: { ...state.text, x: pos.x, y: pos.y, rotation: pos.rot }
                          })
                        }
                        className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all text-center ${
                          state.text.x === pos.x && state.text.y === pos.y
                            ? 'bg-pink-500/20 border-pink-400 text-pink-200 font-bold'
                            : 'bg-white/[0.03] hover:bg-pink-500/10 border-white/10 hover:border-pink-400/40 text-slate-300'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exact Position Sliders */}
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" />
                    自訂文字精確座標與角度
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>水平 X 座標</span>
                        <span className="font-mono text-pink-300 font-bold">{state.text.x}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={state.text.x}
                        onChange={(e) =>
                          onUpdateState({
                            text: { ...state.text, x: Number(e.target.value) }
                          })
                        }
                        className="w-full accent-pink-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>垂直 Y 座標</span>
                        <span className="font-mono text-pink-300 font-bold">{state.text.y}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={92}
                        value={state.text.y}
                        onChange={(e) =>
                          onUpdateState({
                            text: { ...state.text, y: Number(e.target.value) }
                          })
                        }
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>字體大小</span>
                        <span className="font-mono text-pink-300 font-bold">{state.text.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min={12}
                        max={28}
                        value={state.text.fontSize}
                        onChange={(e) =>
                          onUpdateState({
                            text: { ...state.text, fontSize: Number(e.target.value) }
                          })
                        }
                        className="w-full accent-pink-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                        <span>旋轉傾斜角</span>
                        <span className="font-mono text-pink-300 font-bold">{state.text.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={-180}
                        max={180}
                        value={state.text.rotation}
                        onChange={(e) =>
                          onUpdateState({
                            text: { ...state.text, rotation: Number(e.target.value) }
                          })
                        }
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Choices */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    風格字型選擇：
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {FONT_OPTIONS.map((f) => {
                      const isSelected = state.text.font === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() =>
                            onUpdateState({
                              text: { ...state.text, font: f.id, isSpecialFont: f.isSpecial }
                            })
                          }
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-pink-500 bg-pink-500/10'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <span className={`text-xs font-bold text-slate-200 block ${f.fontClass}`}>
                            {f.name}
                          </span>
                          <span className="text-[10px] text-pink-400 block mt-0.5">
                            {f.isSpecial ? '+NT$20 (特殊設計字體)' : '基礎免費字體'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Color Swatches */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    文字字體色彩：
                  </label>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#ffffff', name: '純白' },
                      { hex: '#12141a', name: '曜石黑' },
                      { hex: '#fda4af', name: '櫻粉' },
                      { hex: '#fcd34d', name: '香檳金' },
                      { hex: '#67e8f9', name: '冰川藍' },
                      { hex: '#c084fc', name: '電馭紫' }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() =>
                          onUpdateState({
                            text: { ...state.text, color: c.hex }
                          })
                        }
                        className={`w-7 h-7 rounded-full border transition-transform ${
                          state.text.color === c.hex
                            ? 'scale-125 border-white ring-2 ring-pink-400'
                            : 'border-white/20 hover:scale-110'
                        }`}
                        style={{ background: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg leading-relaxed">
                  💡 <strong>拖曳提示</strong>：您也可以直接在中央展示框中，用滑鼠直接按住文字拖曳至任意喜歡的位置！
                </p>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
