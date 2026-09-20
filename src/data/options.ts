import { 
  FrameOption, 
  FrameColorOption, 
  BackgroundOption, 
  StickerOption,
  TextConfig
} from '../types';

export const FRAME_OPTIONS: FrameOption[] = [
  {
    id: 'acrylic-classic',
    name: '經典雙層厚壓克力',
    enName: 'Classic Dual Acrylic',
    description: '8mm 雙層透亮壓克力結構，四角強磁吸附，經典高透展示',
    cornerStyle: 'rounded-2xl',
    borderWidth: 'border-2',
    hasScrews: true,
    screwType: 'silver',
    priceAddon: 0
  },
  {
    id: 'acrylic-bevel',
    name: '精緻斜邊鑽石切角',
    enName: 'Diamond Beveled',
    description: '四邊 45° 鑽石拋光倒角，折射立體晶透光澤',
    cornerStyle: 'rounded-3xl',
    borderWidth: 'border-[3px]',
    hasScrews: true,
    screwType: 'silver',
    priceAddon: 0
  },
  {
    id: 'acrylic-minimal',
    name: '極簡無界微浮雕',
    enName: 'Borderless Floating',
    description: '極窄邊框設計，聚焦卡面本體，極簡北歐藝廊感',
    cornerStyle: 'rounded-lg',
    borderWidth: 'border',
    hasScrews: false,
    screwType: 'silver',
    priceAddon: 0
  },
  {
    id: 'acrylic-gold-screw',
    name: '輕奢曜金磁吸款',
    enName: 'Gilded Magnetic',
    description: '四角訂製曜金磁吸固定五金，奢華收藏質感',
    cornerStyle: 'rounded-2xl',
    borderWidth: 'border-2',
    hasScrews: true,
    screwType: 'gold',
    priceAddon: 0
  }
];

export const FRAME_COLOR_OPTIONS: FrameColorOption[] = [
  {
    id: 'clear',
    name: '極光高透 (Clear Glass)',
    hex: 'rgba(255, 255, 255, 0.18)',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    outerBorder: 'border-white/25',
    innerGlow: 'shadow-[inset_0_0_15px_rgba(255,255,255,0.25)]'
  },
  {
    id: 'obsidian',
    name: '曜石霧黑 (Obsidian Black)',
    hex: '#12141a',
    glowColor: 'rgba(30, 41, 59, 0.7)',
    outerBorder: 'border-slate-700/80',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(0,0,0,0.85)]'
  },
  {
    id: 'pearl-white',
    name: '珍珠柔白 (Pearl White)',
    hex: '#f8fafc',
    glowColor: 'rgba(241, 245, 249, 0.65)',
    outerBorder: 'border-slate-300/80',
    innerGlow: 'shadow-[inset_0_0_15px_rgba(255,255,255,0.75)]'
  },
  {
    id: 'blossom-pink',
    name: '櫻粉半透 (Blossom Pink)',
    hex: '#fda4af',
    glowColor: 'rgba(251, 113, 133, 0.55)',
    outerBorder: 'border-pink-300/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(244,114,182,0.35)]'
  },
  {
    id: 'neon-cyan',
    name: '冰川冷藍 (Glacier Cyan)',
    hex: '#67e8f9',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    outerBorder: 'border-cyan-400/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(6,182,212,0.3)]'
  },
  {
    id: 'cyber-purple',
    name: '電馭魅紫 (Cyber Purple)',
    hex: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.55)',
    outerBorder: 'border-purple-400/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(168,85,247,0.35)]'
  },
  {
    id: 'emerald-mint',
    name: '薄荷翡翠 (Emerald Mint)',
    hex: '#6ee7b7',
    glowColor: 'rgba(110, 231, 183, 0.5)',
    outerBorder: 'border-emerald-400/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(52,211,153,0.3)]'
  },
  {
    id: 'champagne-gold',
    name: '香檳曜金 (Champagne Gold)',
    hex: '#fcd34d',
    glowColor: 'rgba(252, 211, 77, 0.55)',
    outerBorder: 'border-amber-300/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(245,158,11,0.3)]'
  },
  {
    id: 'crimson-red',
    name: '暗焰熾紅 (Crimson Flame)',
    hex: '#fb7185',
    glowColor: 'rgba(251, 113, 133, 0.55)',
    outerBorder: 'border-rose-400/60',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(225,29,72,0.35)]'
  },
  {
    id: 'titanium-silver',
    name: '鈦金冷銀 (Titanium Silver)',
    hex: '#e2e8f0',
    glowColor: 'rgba(226, 232, 240, 0.6)',
    outerBorder: 'border-slate-300/70',
    innerGlow: 'shadow-[inset_0_0_20px_rgba(148,163,184,0.4)]'
  }
];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    id: 'bg-transparent',
    name: '原色純粹透亮',
    type: 'solid',
    cssClass: 'bg-transparent',
    priceAddon: 0,
    isSpecial: false
  },
  {
    id: 'bg-matte-dark',
    name: '深空啞光黑',
    type: 'solid',
    cssClass: 'bg-gradient-to-b from-[#181a20] to-[#0c0d12]',
    priceAddon: 0,
    isSpecial: false
  },
  {
    id: 'bg-gradient-sunset',
    name: '晨光微曦漸層',
    type: 'gradient',
    cssClass: 'bg-gradient-to-tr from-pink-500/20 via-purple-600/20 to-blue-500/20',
    priceAddon: 0,
    isSpecial: false
  },
  {
    id: 'bg-galaxy-y2k',
    name: '✦ Y2K 銀河雷射幻彩',
    type: 'galaxy',
    cssClass: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-purple-900/40 to-black',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-stars-cosmic',
    name: '⭐ 璀璨星塵星空',
    type: 'pattern',
    cssClass: 'bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950/80',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-hearts-sweet',
    name: '♡ 甜美愛心微浮雕',
    type: 'pattern',
    cssClass: 'bg-gradient-to-br from-pink-900/40 via-rose-950/30 to-black',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-cyber-grid',
    name: '⚡ 賽博霓虹網格',
    type: 'pattern',
    cssClass: 'bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:18px_18px] bg-slate-950/90',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-manga-speed',
    name: '💥 二次元熱血速度線',
    type: 'pattern',
    cssClass: 'bg-[repeating-conic-gradient(from_0deg,#000000_0deg_15deg,#1e293b_15deg_30deg)] opacity-70 bg-black',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-cd-rainbow',
    name: '💿 CD 幻彩雷射眩光',
    type: 'gradient',
    cssClass: 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-500/30 via-emerald-400/20 via-sky-500/30 to-purple-600/30 bg-slate-950',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-aurora-green',
    name: '🌌 北極夢幻極光',
    type: 'gradient',
    cssClass: 'bg-gradient-to-t from-slate-950 via-emerald-950/50 to-teal-800/40',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-gothic-dark',
    name: '🥀 暗黑哥德薔薇夜',
    type: 'pattern',
    cssClass: 'bg-gradient-to-b from-red-950/50 via-black to-slate-950 border-rose-950/30',
    priceAddon: 30,
    isSpecial: true
  },
  {
    id: 'bg-vaporwave',
    name: '🌆 蒸氣波落日幻境',
    type: 'gradient',
    cssClass: 'bg-gradient-to-b from-purple-900/50 via-pink-900/30 to-amber-900/40',
    priceAddon: 30,
    isSpecial: true
  }
];

export const STICKER_OPTIONS: StickerOption[] = [
  // 星芒與光影
  { id: 'star-4pt', symbol: '✦', name: 'Y2K 四芒星', category: 'star', priceAddon: 0 },
  { id: 'sparkle-8pt', symbol: '✧', name: '璀璨芒星', category: 'star', priceAddon: 0 },
  { id: 'star-gold', symbol: '⭐', name: '經典星光', category: 'star', priceAddon: 0 },
  { id: 'shooting-star', symbol: '🌟', name: '閃耀星宿', category: 'star', priceAddon: 0 },
  { id: 'sparkles', symbol: '✨', name: '細緻星芒', category: 'cute', priceAddon: 0 },
  { id: 'star-multi', symbol: '✦⁺₊', name: '星芒碎光', category: 'star', priceAddon: 0 },
  // 愛心與情感
  { id: 'heart-outline', symbol: '♡', name: '空心愛心', category: 'heart', priceAddon: 0 },
  { id: 'heart-solid', symbol: '♥', name: '實心愛心', category: 'heart', priceAddon: 0 },
  { id: 'heart-broken', symbol: '💔', name: '破碎美學', category: 'heart', priceAddon: 0 },
  { id: 'heart-arrow', symbol: '💘', name: '邱比特箭心', category: 'heart', priceAddon: 0 },
  // 幻想、二次元與潮流
  { id: 'butterfly', symbol: '🦋', name: '夢境幻蝶', category: 'cyber', priceAddon: 0 },
  { id: 'wing', symbol: '🪽', name: '守護羽翼', category: 'cyber', priceAddon: 0 },
  { id: 'crown', symbol: '👑', name: '王者皇冠', category: 'cute', priceAddon: 0 },
  { id: 'flame', symbol: '🔥', name: '極限熱血', category: 'cyber', priceAddon: 0 },
  { id: 'cross', symbol: '✝', name: '哥德十字', category: 'cyber', priceAddon: 0 },
  { id: 'chain', symbol: '⛓️', name: '潮流金屬鍊', category: 'cyber', priceAddon: 0 },
  // 韓系與少女感
  { id: 'ribbon-deco', symbol: '🎀', name: '精緻緞帶', category: 'cute', priceAddon: 0 },
  { id: 'bow-cute', symbol: '𝜗𝜚', name: '韓系蝴蝶結', category: 'cute', priceAddon: 0 },
  { id: 'cherry', symbol: '🍒', name: '雙生櫻桃', category: 'cute', priceAddon: 0 },
  { id: 'bubbles', symbol: '🫧', name: '夢幻泡泡', category: 'cute', priceAddon: 0 },
  { id: 'music-note', symbol: '🎵', name: '應援音符', category: 'cute', priceAddon: 0 },
  // 天體宇宙
  { id: 'planet', symbol: '🪐', name: '土星行星', category: 'cyber', priceAddon: 0 },
  { id: 'moon', symbol: '🌙', name: '彎月夜空', category: 'cyber', priceAddon: 0 },
  { id: 'sun', symbol: '☀️', name: '破曉暖陽', category: 'cyber', priceAddon: 0 }
];

export const FONT_OPTIONS = [
  { id: 'Inter', name: '極簡現代 (Inter)', fontClass: 'font-sans', isSpecial: false },
  { id: 'Cinzel', name: '歐洲精品古典 (Cinzel)', fontClass: "font-['Cinzel',serif]", isSpecial: true },
  { id: 'Syncopate', name: 'Y2K 潮流寬體 (Syncopate)', fontClass: "font-['Syncopate',sans-serif]", isSpecial: true },
  { id: 'Outfit', name: '韓系潮流 (Outfit)', fontClass: "font-['Outfit',sans-serif]", isSpecial: false },
  { id: 'Noto Sans TC', name: '洗鍊黑體 (Noto Sans)', fontClass: "font-['Noto_Sans_TC',sans-serif]", isSpecial: false }
];

// Presets for offline demo cards (Pure SVG data URLs)
export const PRESET_PHOTOCARDS = [
  {
    id: 'kpop-sample',
    name: '示範 A: K-pop 舞台小卡 (Wonyoung Vibe)',
    category: 'K-pop',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' width='300' height='450'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23fda4af'/%3E%3Cstop offset='50%25' stop-color='%23f43f5e'/%3E%3Cstop offset='100%25' stop-color='%23881337'/%3E%3C/linearGradient%3E%3ClinearGradient id='g2' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23000000' stop-opacity='0.6'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0.2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23g1)'/%3E%3Ccircle cx='150' cy='180' r='90' fill='%23ffe4e6' opacity='0.9'/%3E%3Ccircle cx='150' cy='160' r='55' fill='%23f43f5e'/%3E%3Cpath d='M100 240 Q150 210 200 240 L220 320 L80 320 Z' fill='%23be123c'/%3E%3Ctext x='150' y='360' font-family='sans-serif' font-weight='800' font-size='22' fill='%23ffffff' text-anchor='middle' letter-spacing='2'%3EIVE WONYOUNG%3C/text%3E%3Ctext x='150' y='390' font-family='sans-serif' font-weight='600' font-size='13' fill='%23ffe4e6' text-anchor='middle' letter-spacing='4'%3ESPECIAL EDITION%3C/text%3E%3Crect width='300' height='450' fill='url(%23g2)'/%3E%3C/svg%3E"
  },
  {
    id: 'anime-sample',
    name: '示範 B: 二次元熱血動漫 (Gojo Satoru Vibe)',
    category: '二次元動漫',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' width='300' height='450'%3E%3Cdefs%3E%3ClinearGradient id='ag1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230284c7'/%3E%3Cstop offset='50%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23ag1)'/%3E%3Ccircle cx='150' cy='180' r='85' fill='%2338bdf8' opacity='0.3'/%3E%3Ccircle cx='150' cy='180' r='60' fill='%23ffffff'/%3E%3Crect x='110' y='160' width='80' height='20' rx='5' fill='%230f172a'/%3E%3Ctext x='150' y='360' font-family='sans-serif' font-weight='900' font-size='24' fill='%23ffffff' text-anchor='middle' letter-spacing='3'%3ELIMITLESS ✦%3C/text%3E%3Ctext x='150' y='390' font-family='sans-serif' font-weight='500' font-size='12' fill='%2394a3b8' text-anchor='middle' letter-spacing='4'%3ESPECIAL GRADE COLLECTIBLE%3C/text%3E%3C/svg%3E"
  },
  {
    id: 'game-sample',
    name: '示範 C: 電競手遊限定角色 (Cyber Gold)',
    category: '手遊電競',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450' width='300' height='450'%3E%3Cdefs%3E%3ClinearGradient id='gg1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23eab308'/%3E%3Cstop offset='50%25' stop-color='%23713f12'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='450' fill='url(%23gg1)'/%3E%3Cpolygon points='150,90 210,210 90,210' fill='%23fef08a' opacity='0.8'/%3E%3Ccircle cx='150' cy='180' r='30' fill='%23ca8a04'/%3E%3Ctext x='150' y='355' font-family='sans-serif' font-weight='800' font-size='22' fill='%23fef08a' text-anchor='middle' letter-spacing='2'%3ESS RARE CARD%3C/text%3E%3Ctext x='150' y='385' font-family='sans-serif' font-weight='600' font-size='12' fill='%23ca8a04' text-anchor='middle' letter-spacing='4'%3ECHAMPION RANK%3C/text%3E%3C/svg%3E"
  }
];

export const INITIAL_TEXT_CONFIG: TextConfig = {
  content: 'LOVE WONYOUNG',
  font: 'Outfit',
  fontSize: 18,
  color: '#ffffff',
  rotation: 0,
  x: 50,
  y: 84,
  isSpecialFont: false
};
