import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ColorPickerSectionProps {
  color: string;
  onChange: (color: string) => void;
  onRandom: () => void;
}

const ColorPickerSection: React.FC<ColorPickerSectionProps> = ({ color, onChange, onRandom }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/#/g, '').replace(/[^0-9A-Fa-f]/g, '');
    if (val.length > 6) val = val.slice(0, 6);
    if (val.length === 6) {
      onChange(`#${val}`);
    }
  };

  return (
    <div className="bg-white/80 p-8 rounded-[2rem] shadow-xl border border-white backdrop-blur-sm relative">
      <h3 className="text-2xl font-black text-slate-700 uppercase tracking-widest mb-8 text-center">1. Choose Brand Color</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="relative group">
          {/* Simplified: No outer ring, just the input with a thin white border and shadow */}
          <input 
            type="color" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-28 h-28 rounded-full cursor-pointer border-4 border-white shadow-2xl p-0 overflow-hidden appearance-none block bg-transparent transition-transform transform group-hover:scale-110"
            style={{ padding: 0 }}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all bg-white h-12">
              <span className="pl-4 text-slate-400 font-bold select-none">#</span>
              <input 
                type="text" 
                value={color.replace('#', '').toUpperCase()}
                onChange={handleTextChange}
                className="w-28 py-2 px-2 outline-none font-mono font-bold text-lg text-slate-700 uppercase bg-transparent placeholder-slate-300" 
                placeholder="3282E3"
                maxLength={7}
              />
            </div>

            <button 
              onClick={onRandom} 
              className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md transition-all active:scale-95 flex items-center gap-2 font-bold text-xs tracking-wide"
            >
              <RefreshCw className="w-4 h-4" />
              RANDOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerSection;