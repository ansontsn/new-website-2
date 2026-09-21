import { 
  FrameOption, 
  FrameColorOption, 
  BackgroundOption, 
  StickerOption,
  TextConfig
} from '../types';
import kpopSample from '../assets/cards/kpop.jpg';
import animeSample from '../assets/cards/anime.jpg';
import gameSample from '../assets/cards/game.jpg';

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
  { id: 'star-gold', symbol: '⭐', name: '經典星光', category: 'star', priceAddon: 0 },
  { id: 'shooting-star', symbol: '🌟', name: '閃耀星宿', category: 'star', priceAddon: 0 },
  { id: 'sparkles', symbol: '✨', name: '細緻星芒', category: 'star', priceAddon: 0 },
  { id: 'star-4pt', symbol: '✦', name: 'Y2K 四芒星', category: 'star', priceAddon: 0 },
  { id: 'sparkle-8pt', symbol: '✧', name: '璀璨芒星', category: 'star', priceAddon: 0 },
  { id: 'star-dizzy', symbol: '💫', name: '星芒流光', category: 'star', priceAddon: 0 },
  // 愛心與情感
  { id: 'heart-sparkle', symbol: '💖', name: '閃亮粉心', category: 'heart', priceAddon: 0 },
  { id: 'heart-white', symbol: '🤍', name: '純潔白心', category: 'heart', priceAddon: 0 },
  { id: 'heart-broken', symbol: '💔', name: '破碎美學', category: 'heart', priceAddon: 0 },
  { id: 'heart-arrow', symbol: '💘', name: '邱比特箭心', category: 'heart', priceAddon: 0 },
  { id: 'heart-red', symbol: '❤️', name: '熱戀紅心', category: 'heart', priceAddon: 0 },
  { id: 'heart-black', symbol: '🖤', name: '暗黑酷心', category: 'heart', priceAddon: 0 },
  // 潮流、動漫與二次元
  { id: 'butterfly', symbol: '🦋', name: '夢境幻蝶', category: 'cyber', priceAddon: 0 },
  { id: 'wing', symbol: '🪽', name: '守護羽翼', category: 'cyber', priceAddon: 0 },
  { id: 'crown', symbol: '👑', name: '王者皇冠', category: 'cyber', priceAddon: 0 },
  { id: 'flame', symbol: '🔥', name: '極限熱血', category: 'cyber', priceAddon: 0 },
  { id: 'cross', symbol: '✝️', name: '哥德十字', category: 'cyber', priceAddon: 0 },
  { id: 'chain', symbol: '⛓️', name: '潮流金屬鍊', category: 'cyber', priceAddon: 0 },
  // 韓系與甜美感
  { id: 'ribbon-deco', symbol: '🎀', name: '精緻緞帶', category: 'cute', priceAddon: 0 },
  { id: 'sakura', symbol: '🌸', name: '粉嫩櫻花', category: 'cute', priceAddon: 0 },
  { id: 'cherry', symbol: '🍒', name: '雙生櫻桃', category: 'cute', priceAddon: 0 },
  { id: 'bubbles', symbol: '🫧', name: '夢幻泡泡', category: 'cute', priceAddon: 0 },
  { id: 'music-note', symbol: '🎵', name: '應援音符', category: 'cute', priceAddon: 0 },
  { id: 'teddy', symbol: '🧸', name: '萌系小熊', category: 'cute', priceAddon: 0 },
  // 天體宇宙
  { id: 'planet', symbol: '🪐', name: '土星行星', category: 'cyber', priceAddon: 0 },
  { id: 'moon', symbol: '🌙', name: '彎月夜空', category: 'cyber', priceAddon: 0 },
  { id: 'sun', symbol: '☀️', name: '破曉暖陽', category: 'cyber', priceAddon: 0 },
  { id: 'clover', symbol: '🍀', name: '幸運草', category: 'cute', priceAddon: 0 }
];

export const FONT_OPTIONS = [
  { id: 'Inter', name: '極簡現代 (Inter)', fontClass: 'font-sans', isSpecial: false },
  { id: 'Cinzel', name: '歐洲精品古典 (Cinzel)', fontClass: "font-['Cinzel',serif]", isSpecial: true },
  { id: 'Syncopate', name: 'Y2K 潮流寬體 (Syncopate)', fontClass: "font-['Syncopate',sans-serif]", isSpecial: true },
  { id: 'Outfit', name: '韓系潮流 (Outfit)', fontClass: "font-['Outfit',sans-serif]", isSpecial: false },
  { id: 'Noto Sans TC', name: '洗鍊黑體 (Noto Sans)', fontClass: "font-['Noto_Sans_TC',sans-serif]", isSpecial: false }
];

// Presets for offline demo cards (User-provided real photos)
export const PRESET_PHOTOCARDS = [
  {
    id: 'kpop-sample',
    name: 'KPOP風格',
    category: 'KPOP風格',
    desc: '韓系偶像小卡',
    url: kpopSample
  },
  {
    id: 'anime-sample',
    name: '二次元風格',
    category: '二次元風格',
    desc: '日系動漫角色',
    url: animeSample
  },
  {
    id: 'game-sample',
    name: '遊戲風格',
    category: '遊戲風格',
    desc: '遊戲卡牌收藏',
    url: gameSample
  }
];

export const INITIAL_TEXT_CONFIG: TextConfig = {
  content: '',
  font: 'Outfit',
  fontSize: 18,
  color: '#ffffff',
  rotation: 0,
  x: 50,
  y: 84,
  isSpecialFont: false
};
