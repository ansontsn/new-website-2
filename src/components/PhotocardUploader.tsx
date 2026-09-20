import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PRESET_PHOTOCARDS } from '../data/options';

interface PhotocardUploaderProps {
  currentPhotoUrl: string;
  photoName: string;
  isCustomPhoto: boolean;
  onPhotoSelected: (url: string, name: string, isCustom: boolean) => void;
  onRemovePhoto: () => void;
  disabled?: boolean;
}

export const PhotocardUploader: React.FC<PhotocardUploaderProps> = ({
  currentPhotoUrl,
  photoName,
  isCustomPhoto,
  onPhotoSelected,
  onRemovePhoto,
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('請上傳 PNG, JPG, JPEG 或 WEBP 格式的圖片');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onPhotoSelected(result, file.name, true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
          disabled
            ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-900/20'
            : isDragging
            ? 'border-pink-400 bg-pink-500/10 scale-[1.01]'
            : 'border-white/15 bg-white/[0.03] hover:border-pink-400/50 hover:bg-white/[0.06]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <UploadCloud className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">
              點擊上傳 或 拖曳小卡至此處
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              支援 PNG, JPG, JPEG, WEBP 檔案 (比例建議 54:86)
            </p>
          </div>
          <span className="inline-block text-[10px] font-medium text-pink-400/90 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
            純前端即時預覽 ‧ 不外流圖片
          </span>
        </div>
      </div>

      {/* Current Photo Status & Actions */}
      {currentPhotoUrl && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={currentPhotoUrl}
              alt="當前小卡"
              className="w-10 h-14 object-cover rounded-md border border-white/20 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {photoName || '自訂小卡'}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isCustomPhoto ? '個人上傳小卡 (+NT$50)' : '示範小卡 (免費試玩)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              title="重新上傳"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemovePhoto();
              }}
              title="刪除小卡"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Preset Sample Photocards (Quick 1-click test) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
            手邊沒照片？一鍵套用示範小卡：
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_PHOTOCARDS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onPhotoSelected(preset.url, preset.name, false)}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-pink-400/60 transition-all p-1 bg-white/[0.02] hover:bg-pink-500/5 text-left"
            >
              <div className="aspect-[54/86] w-full rounded-lg overflow-hidden bg-slate-900 mb-1.5 relative">
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-[10px] font-medium text-slate-300 truncate px-1">
                {preset.category}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
