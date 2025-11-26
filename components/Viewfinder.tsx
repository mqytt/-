import React, { useRef } from 'react';
import { FilterPreset } from '../types';

interface ViewfinderProps {
  imageSrc: string | null;
  currentFilter: FilterPreset;
  isoOpacity: number;
  onUpload: (file: File) => void;
}

export const Viewfinder: React.FC<ViewfinderProps> = ({ 
  imageSrc, 
  currentFilter, 
  isoOpacity,
  onUpload 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative w-full aspect-square bg-[#080808] cursor-pointer group overflow-hidden"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Grid Lines (Hasselblad Crosshairs) - Thinner and sharper */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-30 mix-blend-screen">
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white shadow-[0_0_2px_black] transform -translate-x-1/2"></div>
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white shadow-[0_0_2px_black] transform -translate-y-1/2"></div>
        
        {/* Center Cross Detail */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 border-t border-l border-white/60 -translate-x-3 -translate-y-3"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 border-t border-r border-white/60 translate-x-3 -translate-y-3"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 border-b border-l border-white/60 -translate-x-3 translate-y-3"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 border-b border-r border-white/60 translate-x-3 translate-y-3"></div>
      </div>

      {imageSrc ? (
        <div className="relative w-full h-full">
            {/* Image Layer */}
            <img 
              src={imageSrc} 
              alt="Viewfinder" 
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{ filter: currentFilter.cssFilter }}
            />
            
            {/* Overlay Tint */}
            {currentFilter.overlayColor && (
                 <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{ 
                        backgroundColor: currentFilter.overlayColor,
                        mixBlendMode: currentFilter.overlayBlend as any
                    }}
                 />
            )}
            
            {/* Grain Layer (Dynamic ISO) */}
            <div 
                className="film-grain mix-blend-overlay" 
                style={{ opacity: isoOpacity }}
            ></div>
            
            {/* Vignette (Lens falloff) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 font-mono relative">
            {/* Placeholder UI */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]"></div>
            <div className="relative z-10 flex flex-col items-center">
                <span className="text-4xl opacity-20 mb-4 font-thin">+</span>
                <span className="text-[10px] tracking-[0.2em] opacity-40">LOAD FILM BACK</span>
            </div>
        </div>
      )}
      
      {/* Glossy Glass Reflection (Static) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-40"></div>
      
      {/* Dust particles (Static texture for realism) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none z-30 mix-blend-screen"></div>
    </div>
  );
};