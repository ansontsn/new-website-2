import React, { useRef, useState } from 'react';
import { CustomizerState } from '../types';
import { FRAME_OPTIONS, FRAME_COLOR_OPTIONS, BACKGROUND_OPTIONS } from '../data/options';
import { Sparkles, Move } from 'lucide-react';

interface AcrylicFramePreviewProps {
  state: CustomizerState;
  onUpdateStickerPosition?: (id: string, x: number, y: number) => void;
  selectedStickerId?: string | null;
  onSelectSticker?: (id: string) => void;
  onUpdateTextPosition?: (x: number, y: number) => void;
  interactive?: boolean;
}

export const AcrylicFramePreview: React.FC<AcrylicFramePreviewProps> = ({
  state,
  onUpdateStickerPosition,
  selectedStickerId,
  onSelectSticker,
  onUpdateTextPosition,
  interactive = true
}) => {
  const frameOpt = FRAME_OPTIONS.find(f => f.id === state.frameStyleId) || FRAME_OPTIONS[0];
  const colorOpt = FRAME_COLOR_OPTIONS.find(c => c.id === state.frameColorId) || FRAME_COLOR_OPTIONS[0];
  const bgOpt = BACKGROUND_OPTIONS.find(b => b.id === state.backgroundId) || BACKGROUND_OPTIONS[0];

  const frameRef = useRef<HTMLDivElement>(null);

  const [isDraggingText, setIsDraggingText] = useState(false);
  const [draggingStickerId, setDraggingStickerId] = useState<string | null>(null);

  // Screw rendering helper
  const renderScrew = (posClass: string) => {
    if (!frameOpt.hasScrews) return null;
    const isGold = frameOpt.screwType === 'gold';
    return (
      <div 
        className={`absolute ${posClass} w-4 h-4 rounded-full z-30 shadow-md flex items-center justify-center pointer-events-none ${
          isGold 
            ? 'bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-100 border border-amber-300' 
            : 'bg-gradient-to-tr from-slate-500 via-slate-200 to-white border border-slate-300'
        }`}
      >
        <div className={`w-2.5 h-[1.5px] rounded-full ${isGold ? 'bg-amber-800/80' : 'bg-slate-700/80'}`} />
      </div>
    );
  };

  // Dragging sticker handling (Mouse + Touch)
  const handleStickerDragStart = (e: React.MouseEvent | React.TouchEvent, stickerId: string) => {
    if (!interactive || state.tier === 'BASIC') return;
    e.stopPropagation();
    onSelectSticker?.(stickerId);
    setDraggingStickerId(stickerId);

    if (!onUpdateStickerPosition) return;
    const frameEl = frameRef.current;
    if (!frameEl) return;

    const rect = frameEl.getBoundingClientRect();

    const getPos = (event: MouseEvent | TouchEvent) => {
      if ('touches' in event && event.touches.length > 0) {
        return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
      }
      return { clientX: (event as MouseEvent).clientX, clientY: (event as MouseEvent).clientY };
    };

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getPos(moveEvent);
      const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
      onUpdateStickerPosition(stickerId, Math.round(x), Math.round(y));
    };

    const onEnd = () => {
      setDraggingStickerId(null);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  };

  // Dragging text handling (Mouse + Touch)
  const handleTextDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!interactive || state.tier === 'BASIC' || !onUpdateTextPosition) return;
    e.stopPropagation();
    setIsDraggingText(true);

    const frameEl = frameRef.current;
    if (!frameEl) return;

    const rect = frameEl.getBoundingClientRect();

    const getPos = (event: MouseEvent | TouchEvent) => {
      if ('touches' in event && event.touches.length > 0) {
        return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
      }
      return { clientX: (event as MouseEvent).clientX, clientY: (event as MouseEvent).clientY };
    };

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = getPos(moveEvent);
      const x = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(8, Math.min(92, ((clientY - rect.top) / rect.height) * 100));
      onUpdateTextPosition(Math.round(x), Math.round(y));
    };

    const onEnd = () => {
      setIsDraggingText(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  };

  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      
      {/* Background ambient spotlight glow based on frame color */}
      <div 
        className="absolute -inset-4 rounded-full blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{ background: colorOpt.glowColor }}
      />

      {/* Main Acrylic Outer Shell (Simulates 8mm High-Transmittance Acrylic) */}
      <div 
        ref={frameRef}
        id="acrylic-display-frame"
        className={`relative w-[300px] sm:w-[320px] h-[460px] sm:h-[490px] ${frameOpt.cornerStyle} transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between overflow-hidden acrylic-card shadow-acrylic ${colorOpt.outerBorder}`}
        style={{
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 25px ${colorOpt.glowColor}25, inset 0 1px 2px rgba(255,255,255,0.4)`
        }}
      >
        {/* 4 Corner Magnetic Fastener Screws */}
        {renderScrew('top-2.5 left-2.5')}
        {renderScrew('top-2.5 right-2.5')}
        {renderScrew('bottom-2.5 left-2.5')}
        {renderScrew('bottom-2.5 right-2.5')}

        {/* Acrylic Edge Glass Refraction Highlights (Top & Left rim) */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] border border-white/20" />
        
        {/* Diagonal Light Reflection Sweep (Simulating glossy acrylic sheet) */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none glass-reflection rotate-25 opacity-70 z-20" />

        {/* Inner Background Layer */}
        <div 
          className={`absolute inset-2 sm:inset-3 rounded-xl overflow-hidden transition-all duration-500 z-0 ${bgOpt.cssClass}`}
          style={
            state.customBgUrl 
              ? { backgroundImage: `url(${state.customBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        >
          {/* Subtle noise/texture overlay for high-end feel */}
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
        </div>

        {/* Inner Recessed Photocard Slot (Standard 54x86mm ratio: ~ 210x330px) */}
        <div className="relative z-10 mx-auto my-auto w-[200px] sm:w-[214px] h-[312px] sm:h-[334px] rounded-xl overflow-hidden p-[3px] bg-white/10 backdrop-blur-sm shadow-2xl border border-white/25 group transition-transform duration-300">
          
          {/* Beveled Card Groove Effect */}
          <div className="relative w-full h-full rounded-[9px] overflow-hidden bg-slate-900 shadow-inner">
            {state.photocardUrl ? (
              <img 
                src={state.photocardUrl} 
                alt={state.photocardName || '收藏小卡'} 
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-4 text-center">
                <Sparkles className="w-8 h-8 text-pink-400 mb-2 opacity-60" />
                <span className="text-xs font-semibold text-slate-300">尚未置入小卡</span>
                <span className="text-[10px] text-slate-500 mt-1">可在左側上傳或選擇示範卡</span>
              </div>
            )}

            {/* Glossy sheen on photocard itself */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

        {/* Stickers & Decos Layer (Only for CUSTOM & PREMIUM tiers) */}
        {state.tier !== 'BASIC' && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {state.stickers.map((sticker) => {
              const isSelected = selectedStickerId === sticker.id;
              const isDraggingThis = draggingStickerId === sticker.id;
              return (
                <div
                  key={sticker.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSticker?.(sticker.id);
                  }}
                  onMouseDown={(e) => handleStickerDragStart(e, sticker.id)}
                  onTouchStart={(e) => handleStickerDragStart(e, sticker.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-grab active:cursor-grabbing transition-transform select-none touch-none ${
                    isSelected || isDraggingThis
                      ? 'ring-2 ring-pink-400 ring-offset-2 ring-offset-black/60 rounded-xl p-1 z-30 scale-110 shadow-lg'
                      : interactive ? 'hover:scale-115 hover:ring-1 hover:ring-pink-300/40 rounded-lg p-0.5' : ''
                  }`}
                  style={{
                    left: `${sticker.x}%`,
                    top: `${sticker.y}%`,
                    fontSize: `${sticker.size}px`,
                    color: sticker.color,
                    transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6)) drop-shadow(0 0 8px rgba(255,255,255,0.4))'
                  }}
                  title="點擊選中或拖曳調整位置"
                >
                  {sticker.symbol}
                  {interactive && (
                    <span className={`absolute -top-2 -right-2 text-[9px] bg-black/90 rounded-full px-1 text-pink-300 border border-pink-500/40 transition-opacity ${
                      isSelected || isDraggingThis ? 'opacity-100 scale-100' : 'opacity-0 hover:opacity-100'
                    }`}>
                      <Move className="w-2.5 h-2.5 inline" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Text Inscription (Only for CUSTOM & PREMIUM tiers) */}
        {state.tier !== 'BASIC' && state.text.content && (
          <div 
            onMouseDown={handleTextDragStart}
            onTouchStart={handleTextDragStart}
            className={`absolute z-30 text-center transform -translate-x-1/2 -translate-y-1/2 select-none touch-none pointer-events-auto ${
              interactive 
                ? isDraggingText 
                  ? 'cursor-grabbing scale-105 ring-2 ring-pink-400 bg-black/60 shadow-2xl rounded-lg px-2 py-0.5' 
                  : 'cursor-grab hover:ring-2 hover:ring-pink-400/80 hover:bg-black/30 rounded-lg px-2 py-0.5 transition-shadow'
                : 'pointer-events-none'
            }`}
            style={{
              left: `${state.text.x}%`,
              top: `${state.text.y}%`,
              fontSize: `${state.text.fontSize}px`,
              color: state.text.color,
              fontFamily: state.text.font,
              transform: `translate(-50%, -50%) rotate(${state.text.rotation}deg)`,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 12px rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em'
            }}
            title={interactive ? '滑鼠按住可自由拖曳至展示框任何位置' : undefined}
          >
            <span className="font-bold tracking-wider uppercase inline-block">
              {state.text.content}
            </span>
            {interactive && (
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] bg-pink-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow border border-white/20 whitespace-nowrap transition-opacity ${
                isDraggingText ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}>
                {isDraggingText ? '移動中...' : '可自由拖曳'}
              </span>
            )}
          </div>
        )}

        {/* Acrylic thickness bottom bevel highlight */}
        <div className="absolute bottom-1 inset-x-4 h-[1px] bg-white/30 rounded-full pointer-events-none" />

      </div>

      {/* Frame dimension / spec badge (clearly designated as Prototype) */}
      <div className="absolute bottom-0 right-4 translate-y-full pt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>PROTOTYPE 54×86mm 插槽 (暫定打樣規格)</span>
      </div>

    </div>
  );
};
