import React from 'react';

interface AuroraBackgroundProps {
  color1: string;
  color2: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ color1, color2 }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-white">
      <div 
        className="absolute w-[130vw] h-[130vw] rounded-full blur-[80px] opacity-[0.15] top-[-20%] left-[-20%] animate-[float_10s_infinite_ease-in-out_alternate] transition-colors duration-1000"
        style={{ backgroundColor: color1 }}
      />
      <div 
        className="absolute w-[130vw] h-[130vw] rounded-full blur-[80px] opacity-[0.15] bottom-[-20%] right-[-20%] animate-[float_12s_infinite_ease-in-out_alternate-reverse] transition-colors duration-1000"
        style={{ backgroundColor: color2 }}
      />
      <style>{`
        @keyframes float { 
          from { transform: translate(0, 0) scale(1); } 
          to { transform: translate(30px, -30px) scale(1.1); } 
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;