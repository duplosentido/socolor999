import React from 'react';
import { ArrowRight, ArrowLeft, ArrowDownRight } from 'lucide-react';
import { GradientDirection } from './types';

interface ControlBarProps {
  direction: GradientDirection;
  onChange: (dir: GradientDirection) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ direction, onChange }) => {
  
  const btnClass = (active: boolean) => 
    `w-10 h-10 rounded-xl border transition-all active:scale-95 flex items-center justify-center ${active ? 'bg-white border-indigo-500 text-indigo-600 shadow-md transform -translate-y-0.5' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-white'}`;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40">
      <div className="glass p-3 rounded-2xl shadow-2xl border border-white/50 max-w-lg mx-auto flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl">
        <div className="flex flex-col pl-2">
            <span className="text-xs font-bold text-slate-800">Gradient Direction</span>
            <span className="text-[10px] text-slate-500">Tap to switch flow</span>
        </div>
        <div className="flex gap-2">
            <button onClick={() => onChange('to right')} className={btnClass(direction === 'to right')}>
                <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('to left')} className={btnClass(direction === 'to left')}>
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('to bottom right')} className={btnClass(direction === 'to bottom right')}>
                <ArrowDownRight className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
