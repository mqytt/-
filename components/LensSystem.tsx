import React from 'react';
import { FILTERS, ISO_SETTINGS } from '../constants';

interface LensSystemProps {
  filterIndex: number;
  isoIndex: number;
  onCycleFilter: (direction: 'prev' | 'next') => void;
  onCycleISO: () => void;
}

export const LensSystem: React.FC<LensSystemProps> = ({
  filterIndex,
  isoIndex,
  onCycleFilter,
  onCycleISO
}) => {
  const currentFilter = FILTERS[filterIndex];
  const currentISO = ISO_SETTINGS[isoIndex];

  return (
    <div className="w-full flex flex-col items-center relative z-20 -mb-4">
      
      {/* --- LEVEL 1: HOOD / MAGAZINE (Static Visual) --- */}
      <div className="w-[96%] relative z-30 group pointer-events-none">
        <div 
            className="h-16 bg-[#1a1a1a] rounded-t-lg shadow-lg relative overflow-hidden border-x border-t border-white/10"
        >
            {/* Matte finish gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#252525] to-[#111]"></div>
            
            {/* Mechanical Ridges */}
            <div className="absolute inset-x-4 top-0 h-full flex flex-col justify-center gap-1 opacity-20 pointer-events-none">
                 {[...Array(3)].map((_, i) => (
                     <div key={i} className="w-full h-[1px] bg-white shadow-[0_1px_0_black]"></div>
                 ))}
            </div>

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.4em] text-gray-500 font-bold text-engraved">HASSELBLAD</span>
            </div>
            
            {/* Hood Shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>


      {/* --- LEVEL 2: SHUTTER SPEED RING (Filter Selector) --- */}
      <div className="w-[100%] h-20 relative z-20 -mt-1 shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
         
         {/* Main Cylinder Body */}
         <div className="absolute inset-0 bg-knurling border-y border-black/80 box-border"></div>

         {/* Click Zones (Invisible) */}
         <div 
            onClick={() => onCycleFilter('prev')}
            className="absolute left-0 top-0 bottom-0 w-1/2 cursor-w-resize z-30 group"
         ></div>
         <div 
            onClick={() => onCycleFilter('next')}
            className="absolute right-0 top-0 bottom-0 w-1/2 cursor-e-resize z-30 group"
         ></div>

         {/* Markings Container */}
         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 pointer-events-none z-10 opacity-70">
             {/* Left side numbers */}
             <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50">B</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50">1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50">2</span>
                </div>
             </div>

             {/* Right side numbers */}
             <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50">125</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50">250</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="w-[1px] h-2 bg-white/50"></div>
                    <span className="text-[9px] font-mono text-white/50 text-red-500">500</span>
                </div>
             </div>
         </div>

         {/* Active Filter Window (The "Lens Window") */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-10 bg-[#050505] border-2 border-[#333] rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,1)] flex items-center justify-center z-20">
             <div className="text-white text-[10px] font-bold font-mono tracking-widest uppercase text-engraved text-nowrap">
                {currentFilter.name}
             </div>
             {/* Glass reflection on window */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
         </div>

         {/* Red Indicator Line */}
         <div className="absolute bottom-0 left-1/2 w-[2px] h-2 bg-red-600 z-30 transform -translate-x-1/2"></div>
      </div>


      {/* --- LEVEL 3: FOCUS / ISO RING --- */}
      <div 
        onClick={onCycleISO}
        className="w-[100%] h-24 relative z-10 -mt-[1px] cursor-pointer"
      >
          {/* Cylinder Effect */}
          <div className="absolute inset-0 bg-metal-cylinder border-b border-black/50"></div>
          
          {/* Rubber Grip Texture (Middle section) */}
          <div className="absolute top-3 bottom-3 left-0 right-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-multiply"></div>
          
          {/* Engraved Distance Scale */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-12 pointer-events-none opacity-60">
              <span className="text-[10px] text-gray-400 font-mono scale-x-75">3</span>
              <span className="text-[10px] text-gray-400 font-mono scale-x-75">5</span>
              <span className="text-[10px] text-gray-400 font-mono scale-x-75">10</span>
              <span className="text-[10px] text-gray-400 font-mono scale-x-75">20</span>
              <span className="text-[10px] text-gray-400 font-mono scale-x-75">∞</span>
          </div>
          
          {/* Current ISO Display (mimicking Distance Window) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
             <span className="text-[8px] text-[#ff3333] font-bold tracking-widest mb-1 text-engraved">DIN / ASA</span>
             <div className="text-xl font-bold font-mono text-white text-engraved tracking-tighter">
                {currentISO}
             </div>
          </div>

          {/* Depth Shadow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      </div>

    </div>
  );
};