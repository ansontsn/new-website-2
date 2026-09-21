import React from 'react';
import { CustomizationTier } from '../types';
import { Check, Sparkles, Shield, Zap, Crown, ArrowRight } from 'lucide-react';

interface TierSelectorProps {
  currentTier: CustomizationTier;
  onSelectTier: (tier: CustomizationTier) => void;
  onBackToHome: () => void;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  currentTier,
  onSelectTier,
  onBackToHome
}) => {
  const tiers = [
    {
      id: 'BASIC' as CustomizationTier,
      badge: '入門經典',
      name: 'BASIC',
      subName: '基本客製展示框',
      price: '199',
      priceNote: '暫定預估價',
      description: '適合追求極簡質感的收藏者，專注純粹的壓克力光澤與幾何外型。',
      icon: Shield,
      accentColor: 'border-stone-300 bg-white/85 hover:border-stone-400 shadow-sm',
      tagColor: 'bg-stone-100 text-stone-700 border-stone-200',
      btnClass: 'bg-stone-800 hover:bg-stone-900 text-white',
      features: [
        { text: '自由選擇 4 款壓克力幾何框型', included: true },
        { text: '選擇 10 種框體外觀透光顏色', included: true },
        { text: '雙層 8mm 高透壓克力保護卡槽', included: true },
        { text: '支援示範小卡裝框效果模擬預覽', included: true },
        { text: '主題背景與特殊漸層 (12 款)', included: false },
        { text: '潮流貼飾自訂大小與旋轉擺放', included: false },
        { text: '雷雕專屬文字與自由拖曳定位', included: false },
        { text: '個人小卡圖片 1:1 上傳模擬置入', included: false }
      ]
    },
    {
      id: 'CUSTOM' as CustomizationTier,
      badge: '最受歡迎 · 推薦',
      name: 'CUSTOM',
      subName: '主題客製展示框',
      price: '299',
      priceNote: '暫定預估價',
      description: '為特定本命偶像或角色打造專屬氛圍，自由搭配背景、貼飾與應援文字。',
      icon: Zap,
      accentColor: 'border-purple-300/80 bg-white/90 hover:border-purple-400 shadow-md shadow-purple-500/5',
      tagColor: 'bg-purple-100 text-purple-700 border-purple-200',
      btnClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md',
      features: [
        { text: '自由選擇 4 款壓克力幾何框型', included: true },
        { text: '選擇 10 種框體外觀透光顏色', included: true },
        { text: '雙層 8mm 高透壓克力保護卡槽', included: true },
        { text: '支援示範小卡裝框效果模擬預覽', included: true },
        { text: '解鎖 12 款主題背景 (銀河/星空/極光/CD雷射)', included: true },
        { text: '解鎖 24 款潮流裝飾配件 (自由旋轉與自訂大小)', included: true },
        { text: '加入客製刻字與自由拖曳定位', included: true },
        { text: '個人小卡圖片 1:1 上傳模擬置入', included: false }
      ]
    },
    {
      id: 'PREMIUM' as CustomizationTier,
      badge: '全功能解鎖',
      name: 'PREMIUM',
      subName: '高度客製展示框',
      price: '399',
      priceNote: '起 · 自由升級',
      description: '完全掌控設計細節，上傳個人專屬小卡模擬、自由排版位置與專屬字體，極致個人化。',
      icon: Crown,
      accentColor: 'border-pink-300/80 bg-white/90 hover:border-pink-400 shadow-lg shadow-pink-500/10',
      tagColor: 'bg-pink-100 text-pink-700 border-pink-200',
      btnClass: 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md',
      features: [
        { text: '自由選擇 4 款壓克力幾何框型', included: true },
        { text: '選擇 10 種框體外觀透光顏色', included: true },
        { text: '支援示範小卡裝框效果模擬預覽', included: true },
        { text: '解鎖個人專屬小卡 1:1 上傳模擬置入', included: true },
        { text: '自訂背景與專屬素材載入', included: true },
        { text: '解鎖所有潮流貼飾 (自訂大小/旋轉/複製)', included: true },
        { text: '全字體選擇 (含精品 Cinzel / Y2K 潮流體)', included: true },
        { text: '畫布上自由滑鼠拖曳文字與貼飾位置', included: true }
      ]
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Step Indicator & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-600">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STEP 1：選擇客製化程度</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          由你決定你的收藏品應該長什麼樣子
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          我們提供三種不同深度的客製化體驗。從純粹俐落的基礎幾何框，到全功能開放的自訂編輯器，請挑選最符合您收藏需求的方案：
        </p>
      </div>

      {/* 3 Tier Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 items-stretch">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = currentTier === tier.id;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
                tier.accentColor
              } ${isSelected ? 'ring-2 ring-pink-500 scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              {/* Header Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${tier.tagColor}`}>
                    {tier.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {tier.subName}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline gap-2 border-b border-stone-200/80 pb-4">
                  <span className="text-xs text-slate-500">預估</span>
                  <span className="text-4xl font-black text-slate-900 font-mono">
                    NT${tier.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {tier.priceNote}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {tier.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    可自訂項目清單：
                  </span>
                  <ul className="space-y-2 text-xs">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px]">✕</span>
                          </div>
                        )}
                        <span className={feat.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group active:scale-98 ${
                    tier.btnClass
                  }`}
                >
                  <span>選擇此方案 ({tier.name})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Back to Home Link */}
      <div className="text-center pt-4">
        <button
          onClick={onBackToHome}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← 返回首頁介紹
        </button>
      </div>

    </div>
  );
};
