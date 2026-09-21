import React, { useState } from 'react';
import { CustomizationTier, CustomizerState } from './types';
import { PRESET_PHOTOCARDS, INITIAL_TEXT_CONFIG } from './data/options';
import { calculatePrice } from './utils/pricing';
import { AppView, Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TierSelector } from './components/TierSelector';
import { CustomizerTools } from './components/CustomizerTools';
import { AcrylicFramePreview } from './components/AcrylicFramePreview';
import { PriceSummary } from './components/PriceSummary';
import { DesignConfirmation } from './components/DesignConfirmation';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AboutSection } from './components/AboutSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { SubmitDesignModal } from './components/SubmitDesignModal';
import { SubmissionSuccessView } from './components/SubmissionSuccessView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DesignSubmission } from './types';
import { Download, Loader2, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';

export const App: React.FC = () => {
  // Navigation View State (URL Sync)
  const getInitialView = (): AppView => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  };

  const [currentView, setCurrentView] = useState<AppView>(getInitialView);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<DesignSubmission | null>(null);

  // Sync URL with browser back/forward
  React.useEffect(() => {
    const onPopState = () => {
      if (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin') {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [currentView]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname === '/admin') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Core Customizer State
  const [customizerState, setCustomizerState] = useState<CustomizerState>({
    tier: 'CUSTOM',
    frameStyleId: 'acrylic-classic',
    frameColorId: 'clear',
    backgroundId: 'bg-transparent',
    customBgUrl: null,
    photocardUrl: PRESET_PHOTOCARDS[0].url,
    photocardName: PRESET_PHOTOCARDS[0].name,
    isCustomPhoto: false,
    stickers: [
      {
        id: 'init-stk-1',
        stickerId: 'star-4pt',
        symbol: '✦',
        x: 18,
        y: 12,
        size: 20,
        rotation: -8,
        color: '#fbcfe8'
      },
      {
        id: 'init-stk-2',
        stickerId: 'star-gold',
        symbol: '⭐',
        x: 82,
        y: 14,
        size: 18,
        rotation: 12,
        color: '#fef08a'
      }
    ],
    text: INITIAL_TEXT_CONFIG
  });

  // Active selected sticker for rotation/size inspector
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>('init-stk-1');

  // Calculate live dynamic price
  const priceBreakdown = calculatePrice(customizerState);

  // State update handlers
  const handleUpdateState = (updates: Partial<CustomizerState>) => {
    setCustomizerState((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateStickerPosition = (id: string, x: number, y: number) => {
    setCustomizerState((prev) => ({
      ...prev,
      stickers: prev.stickers.map((s) => (s.id === id ? { ...s, x, y } : s))
    }));
  };

  const handleUpdateTextPosition = (x: number, y: number) => {
    setCustomizerState((prev) => ({
      ...prev,
      text: { ...prev.text, x, y }
    }));
  };

  const handleSelectTier = (tier: CustomizationTier) => {
    // If selecting BASIC, clean up items not supported in BASIC
    if (tier === 'BASIC') {
      setCustomizerState((prev) => ({
        ...prev,
        tier,
        backgroundId: 'bg-transparent',
        customBgUrl: null,
        stickers: [],
        text: { ...prev.text, content: '' }
      }));
    } else {
      setCustomizerState((prev) => ({
        ...prev,
        tier
      }));
    }
    setCurrentView('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isDownloadingLive, setIsDownloadingLive] = useState(false);

  const handleDownloadLiveMockup = async () => {
    setSelectedStickerId(null);
    setIsDownloadingLive(true);
    try {
      await new Promise(r => setTimeout(r, 120));
      const node = document.getElementById('acrylic-display-frame');
      if (!node) {
        alert('找不到展示框元件，請重新整理頁面。');
        return;
      }

      const dataUrl = await toPng(node, {
        quality: 0.98,
        pixelRatio: 2.5,
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `LUMINA-FRAME-${customizerState.tier}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download live error:', err);
      alert('圖片生成失敗，請稍候重試！');
    } finally {
      setIsDownloadingLive(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col selection:bg-pink-500 selection:text-white pb-32 lg:pb-0">
      
      {/* Top Navigation (Hidden in Admin view to allow dedicated admin layout) */}
      {currentView !== 'admin' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          tier={customizerState.tier}
          totalPrice={priceBreakdown.totalPrice}
          onFinishDesign={() => handleNavigate('confirmation')}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME LANDING PAGE */}
        {currentView === 'home' && (
          <HeroSection
            onStartCustomizing={() => handleNavigate('tiers')}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          />
        )}

        {/* VIEW 2: TIER SELECTOR */}
        {currentView === 'tiers' && (
          <TierSelector
            currentTier={customizerState.tier}
            onSelectTier={handleSelectTier}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {/* VIEW 3: CORE CUSTOMIZER (3-COLUMN DESKTOP / STACKED MOBILE) */}
        {currentView === 'customizer' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            
            {/* Top customizer breadcrumb bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-600 font-bold border border-pink-500/20">
                  {customizerState.tier} 方案
                </span>
                <span className="text-xs text-slate-700 font-medium">
                  {customizerState.tier === 'BASIC'
                    ? '基本款：僅開放框型與邊緣顏色'
                    : customizerState.tier === 'CUSTOM'
                    ? '主題款：開放框型、顏色、背景、貼飾與文字'
                    : '高度客製：全功能解鎖、小卡上傳、自由拖曳擺放'}
                </span>
              </div>

              <button
                onClick={() => handleNavigate('tiers')}
                className="text-xs text-slate-500 hover:text-pink-600 transition-colors underline underline-offset-4"
              >
                更換客製化程度方案 →
              </button>
            </div>

            {/* Main 3-Column Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Column 1: Left Tools (4 cols) */}
              <div className="lg:col-span-4 order-2 lg:order-1 h-[620px] lg:sticky lg:top-24">
                <CustomizerTools
                  state={customizerState}
                  onUpdateState={handleUpdateState}
                  onUpgradeTier={handleSelectTier}
                  selectedStickerId={selectedStickerId}
                  onSelectSticker={setSelectedStickerId}
                />
              </div>

              {/* Column 2: Center Acrylic Frame Live Preview (4 cols) */}
              <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center min-h-[500px] lg:sticky lg:top-24">
                <AcrylicFramePreview
                  state={customizerState}
                  onUpdateStickerPosition={handleUpdateStickerPosition}
                  selectedStickerId={selectedStickerId}
                  onSelectSticker={setSelectedStickerId}
                  onUpdateTextPosition={handleUpdateTextPosition}
                  interactive={true}
                />
                <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3.5 w-full max-w-sm px-2">
                  <button
                    onClick={handleDownloadLiveMockup}
                    disabled={isDownloadingLive}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/85 hover:bg-white text-slate-700 hover:text-slate-900 border border-stone-200/80 hover:border-pink-500/40 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                    title="匯出當前卡框高畫質 PNG 圖片"
                  >
                    {isDownloadingLive ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-500" />
                        <span>生成相片中...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-pink-500" />
                        <span>下載相片 (PNG)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleNavigate('confirmation')}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>完成設計 ➔</span>
                  </button>
                </div>
              </div>

              {/* Column 3: Right Summary & Live Pricing (4 cols) */}
              <div className="hidden lg:block lg:col-span-4 order-3 h-[580px] lg:sticky lg:top-24">
                <PriceSummary
                  state={customizerState}
                  priceBreakdown={priceBreakdown}
                  onFinishDesign={() => handleNavigate('confirmation')}
                />
              </div>

            </div>

            {/* Mobile Bottom Sticky Bar */}
            <MobileStickyBar
              priceBreakdown={priceBreakdown}
              onFinishDesign={() => handleNavigate('confirmation')}
            />

          </div>
        )}

        {/* VIEW 4: DESIGN CONFIRMATION & MOCKUP SHOWCASE */}
        {currentView === 'confirmation' && (
          <DesignConfirmation
            state={customizerState}
            priceBreakdown={priceBreakdown}
            onModifyDesign={() => handleNavigate('customizer')}
            onChangeTier={() => handleNavigate('tiers')}
            onSubmitDesign={() => setIsSubmitModalOpen(true)}
          />
        )}

        {/* VIEW 5: ABOUT & PROTOTYPE CONCEPT */}
        {currentView === 'about' && (
          <AboutSection
            onStartCustomizing={() => handleNavigate('tiers')}
          />
        )}

        {/* VIEW 6: SUBMISSION SUCCESS SCREEN */}
        {currentView === 'success' && lastSubmission && (
          <SubmissionSuccessView
            submission={lastSubmission}
            onReset={() => {
              setLastSubmission(null);
              handleNavigate('home');
            }}
          />
        )}

        {/* VIEW 7: ADMIN DASHBOARD */}
        {currentView === 'admin' && (
          <AdminDashboard onBackToStore={() => handleNavigate('home')} />
        )}

      </main>

      {/* Submit Design Modal Dialog */}
      <SubmitDesignModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        state={customizerState}
        priceBreakdown={priceBreakdown}
        onSuccess={(submission) => {
          setLastSubmission(submission);
          handleNavigate('success');
        }}
      />

      {/* How it works guide modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStartCustomizing={() => {
          setIsHowItWorksOpen(false);
          handleNavigate('tiers');
        }}
      />

      {/* Clean Footer (Hidden in Admin view) */}
      {currentView !== 'admin' && (
        <footer className="mt-auto border-t border-stone-200 bg-[#FAF8F5]/80 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-semibold text-slate-700">
              LUMINA FRAME · K-pop / 二次元收藏小卡客製化展示框互動平台
            </p>
            <p className="text-[11px] text-slate-500">
              企管系畢業專題 MVP 研究 Prototype ‧ 專利打樣與展示概念 ‧ 規格與價格均為暫定測試資料
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <span>© 2026 LUMINA FRAME 畢業專題研究團隊</span>
              <span>•</span>
              <button
                onClick={() => handleNavigate('admin')}
                className="text-slate-500 hover:text-purple-600 underline underline-offset-2 transition-colors font-medium"
              >
                管理者後台 (/admin)
              </button>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
};
export default App;
