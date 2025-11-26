import React, { useState } from 'react';
import { Viewfinder } from './components/Viewfinder';
import { LensSystem } from './components/LensSystem';
import { ISO_SETTINGS, FILTERS } from './constants';
import { AppState } from './types';
import { processAndDownloadImage } from './utils/imageProcessing';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    imageSrc: null,
    filterIndex: 0,
    isoIndex: 1, // Default ISO 400
    isProcessing: false,
  });

  // Handlers
  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setState((prev) => ({ ...prev, imageSrc: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleCycleFilter = (direction: 'prev' | 'next') => {
    setState((prev) => {
      let nextIndex = direction === 'next' ? prev.filterIndex + 1 : prev.filterIndex - 1;
      if (nextIndex >= FILTERS.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = FILTERS.length - 1;
      return { ...prev, filterIndex: nextIndex };
    });
  };

  const handleCycleISO = () => {
    setState((prev) => {
      const nextIndex = (prev.isoIndex + 1) % ISO_SETTINGS.length;
      return { ...prev, isoIndex: nextIndex };
    });
  };

  const handleDownload = () => {
    if (!state.imageSrc) {
        alert("Please load an image first by clicking the viewfinder.");
        return;
    }
    
    // Automatically add border as requested without confirmation dialog
    const withBorder = true;
    
    const currentFilter = FILTERS[state.filterIndex];
    const currentISO = ISO_SETTINGS[state.isoIndex];

    try {
        processAndDownloadImage(state.imageSrc, currentFilter, currentISO, withBorder);
    } catch (e) {
        console.error("Download failed:", e);
        alert("Failed to process image. Please try again.");
    }
  };

  // Calculate opacity for ISO grain preview (0 to 0.6)
  const isoOpacity = (Math.log2(ISO_SETTINGS[state.isoIndex] / 50) * 0.08);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden">
      
      {/* --- CAMERA BODY ASSEMBLY --- */}
      <div className="relative w-full max-w-sm bg-leather rounded-[2px] shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex flex-col items-center pb-8 border-t border-white/5">
        
        {/* CHROME RAILS (Sides) */}
        {/* Left Rail */}
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-brushed-silver rounded-l-[2px] z-10 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.3)] border-r border-black/20"></div>
        {/* Right Rail */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-brushed-silver rounded-r-[2px] z-10 shadow-[inset_2px_0_4px_rgba(0,0,0,0.3)] border-l border-black/20"></div>

        {/* --- TOP ASSEMBLY (Lens) --- */}
        <LensSystem 
            filterIndex={state.filterIndex}
            isoIndex={state.isoIndex}
            onCycleFilter={handleCycleFilter}
            onCycleISO={handleCycleISO}
        />

        {/* --- MAIN BODY / SCREEN --- */}
        <div className="w-full px-7 relative z-0 -mt-2">
            
            {/* Viewfinder Frame (Bezel) */}
            <div className="bg-[#151515] p-3 rounded-sm shadow-[inset_0_1px_5px_rgba(0,0,0,0.8),0_5px_10px_rgba(0,0,0,0.5)] border-t border-white/5">
                <div className="bg-black rounded-sm overflow-hidden border border-gray-800 relative">
                    {/* Inner shadow for screen depth */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)] pointer-events-none z-20"></div>
                    
                    <Viewfinder 
                        imageSrc={state.imageSrc} 
                        currentFilter={FILTERS[state.filterIndex]}
                        isoOpacity={isoOpacity}
                        onUpload={handleUpload}
                    />
                </div>
                
                {/* Branding below screen */}
                <div className="flex justify-between items-center mt-2 px-1">
                     <div className="w-1 h-1 bg-red-600 rounded-full shadow-[0_0_2px_red]"></div>
                     <span className="text-[9px] text-gray-600 font-mono tracking-widest">500C/M</span>
                </div>
            </div>
            
            {/* --- BOTTOM ASSEMBLY (Export Button) --- */}
            <div className="mt-8 flex justify-center relative">
                {/* The Shutter/Export Button */}
                <button 
                    onClick={handleDownload}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e0e0e0] to-[#999] shadow-[0_5px_15px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center active:scale-95 transition-all group border-2 border-[#555]"
                    title="Process & Export"
                >
                    {/* Inner indented circle */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ccc] to-[#eee] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center border border-[#bbb]">
                        {/* Tactile rings */}
                         <div className="absolute w-10 h-10 rounded-full border border-gray-400 opacity-50"></div>
                         <div className="absolute w-8 h-8 rounded-full border border-gray-400 opacity-50"></div>
                         
                         <span className="text-[9px] font-black tracking-widest text-gray-500 group-hover:text-black transition-colors z-10 mt-[1px]">EXPORT</span>
                    </div>
                </button>
                
                {/* Decorative Screws */}
                <div className="absolute top-1/2 -translate-y-1/2 left-8 w-2 h-2 rounded-full bg-[#222] shadow-[0_1px_0_rgba(255,255,255,0.1),inset_0_1px_2px_black] flex items-center justify-center">
                    <div className="w-full h-[1px] bg-[#111] rotate-45"></div>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-8 w-2 h-2 rounded-full bg-[#222] shadow-[0_1px_0_rgba(255,255,255,0.1),inset_0_1px_2px_black] flex items-center justify-center">
                    <div className="w-full h-[1px] bg-[#111] rotate-12"></div>
                </div>
            </div>
        </div>

      </div>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)]"></div>
    </div>
  );
};

export default App;