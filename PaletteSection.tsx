import React from 'react';
import { PaletteData, GradientDirection } from '../types';
import { Copy } from 'lucide-react';

interface PaletteSectionProps {
  palette: PaletteData;
  direction: GradientDirection;
  onCopy: (text: string) => void;
}

const PaletteSection: React.FC<PaletteSectionProps> = ({ palette, direction, onCopy }) => {
  
  const handleCopyGradient = (colors: string[]) => {
    onCopy(`background-image: linear-gradient(${direction}, ${colors.join(', ')});`);
  };

  const labels = ["Primary", "Secondary", "Bg", "Accent", "Contrast", "Soft"];

  return (
    <>
      <section>
        <div className="mb-6 border-l-4 border-slate-800 pl-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">Palette</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {palette.spot.map((hex, idx) => (
             <div key={idx} className="flex flex-col gap-2 group cursor-pointer" onClick={() => onCopy(hex)}>
               <div className="h-24 rounded-xl shadow-md transition-transform group-hover:-translate-y-1 border border-slate-100 relative" style={{ backgroundColor: hex }}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-black/20 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1"><Copy className="w-3 h-3"/> Copy</span>
                 </div>
               </div>
               <div className="text-center flex flex-col">
                 <span className="text-xs font-mono text-slate-600 font-bold uppercase">{hex}</span>
                 <span className="text-[10px] text-slate-400">{labels[idx] || 'Color'}</span>
               </div>
             </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200/60 pt-10">
        <div className="mb-8 border-l-4 border-indigo-500 pl-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">Gradients</h3>
        </div>
        
        {/* Generic Gradient */}
        <div className="mb-16">
          <div className="mb-4 flex justify-between items-center">
            <h4 className="font-bold text-slate-700 text-lg">Generic Gradient <span className="text-[10px] bg-white/50 border border-slate-200 px-2 py-1 rounded text-slate-500 ml-2">HERO</span></h4>
            <button onClick={() => handleCopyGradient(palette.generic)} className="text-xs font-bold text-white bg-slate-800 px-4 py-2 rounded-lg shadow hover:bg-slate-900 active:scale-95 transition-all">Copy CSS</button>
          </div>
          <div 
            className="h-20 w-full rounded-2xl mb-2 shadow-md border border-white transition-all duration-500"
            style={{ background: `linear-gradient(${direction}, ${palette.generic.join(', ')})` }}
          />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
             {palette.generic.map((hex, idx) => (
               <div key={idx} className="flex flex-col gap-1 group cursor-pointer" onClick={() => onCopy(hex)}>
                 <div 
                    className={`h-16 shadow-sm transition-transform group-hover:-translate-y-1 border border-slate-100 ${idx === 0 ? 'rounded-bl-2xl rounded-tr-md rounded-br-md' : idx === 5 ? 'rounded-br-2xl rounded-tl-md rounded-bl-md' : 'rounded-md'}`} 
                    style={{ backgroundColor: hex }}
                 />
                 <span className="text-[10px] text-center font-mono text-slate-400 font-bold uppercase group-hover:text-indigo-600 transition-colors">{hex}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Matching Gradient */}
        <div className="mb-4">
          <div className="mb-4 flex justify-between items-center">
            <h4 className="font-bold text-slate-700 text-lg">Matching Gradient <span className="text-[10px] bg-white/50 border border-slate-200 px-2 py-1 rounded text-slate-500 ml-2">ACCENT</span></h4>
            <button onClick={() => handleCopyGradient(palette.matching)} className="text-xs font-bold text-white bg-slate-800 px-4 py-2 rounded-lg shadow hover:bg-slate-900 active:scale-95 transition-all">Copy CSS</button>
          </div>
          <div 
            className="h-20 w-full rounded-2xl mb-2 shadow-md border border-white transition-all duration-500"
            style={{ background: `linear-gradient(${direction}, ${palette.matching.join(', ')})` }}
          />
           <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
             {palette.matching.map((hex, idx) => (
               <div key={idx} className="flex flex-col gap-1 group cursor-pointer" onClick={() => onCopy(hex)}>
                 <div 
                    className={`h-16 shadow-sm transition-transform group-hover:-translate-y-1 border border-slate-100 ${idx === 0 ? 'rounded-bl-2xl rounded-tr-md rounded-br-md' : idx === 5 ? 'rounded-br-2xl rounded-tl-md rounded-bl-md' : 'rounded-md'}`} 
                    style={{ backgroundColor: hex }}
                 />
                 <span className="text-[10px] text-center font-mono text-slate-400 font-bold uppercase group-hover:text-indigo-600 transition-colors">{hex}</span>
               </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PaletteSection;