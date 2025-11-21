import React, { useState, useEffect, useCallback } from 'react';
import AuroraBackground from './components/AuroraBackground';
import ColorPickerSection from './components/ColorPickerSection';
import PaletteSection from './components/PaletteSection';
import TypographySection from './components/TypographySection';
import ControlBar from './components/ControlBar';
import GeminiAssistant from './components/GeminiAssistant';
import { generateProPalettes, randomColor } from './utils/colorUtils';
import { FONT_STYLES, INITIAL_COLOR, INITIAL_CONTENT } from './constants';
import { PaletteData, TypographyContent, FontStyle, LayoutType, GradientDirection, AIAssistantResponse } from './types';

const App: React.FC = () => {
  const [baseColor, setBaseColor] = useState<string>(INITIAL_COLOR);
  const [palette, setPalette] = useState<PaletteData | null>(null);
  const [content, setContent] = useState<TypographyContent>(INITIAL_CONTENT);
  const [currentStyle, setCurrentStyle] = useState<FontStyle>(FONT_STYLES[0]);
  const [layout, setLayout] = useState<LayoutType>('center');
  const [direction, setDirection] = useState<GradientDirection>('to bottom right');
  const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });

  // Update palette when color changes
  useEffect(() => {
    const newPalette = generateProPalettes(baseColor);
    if (newPalette) {
      setPalette(newPalette);
    }
  }, [baseColor]);

  const handleRandomColor = useCallback(() => {
    setBaseColor(randomColor().toUpperCase());
  }, []);

  const handleContentChange = (field: keyof TypographyContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ show: true, msg: text });
      setTimeout(() => setToast({ show: false, msg: '' }), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleAIGenerated = (data: AIAssistantResponse) => {
    setBaseColor(data.hex.toUpperCase());
    setContent({
      heading: data.heading,
      sub: data.sub,
      body: data.body
    });
    if (data.styleId) {
      const matched = FONT_STYLES.find(s => s.id === data.styleId);
      if (matched) setCurrentStyle(matched);
    }
  };

  if (!palette) return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;

  return (
    <div className="text-slate-800 min-h-screen pb-48 relative font-sans-human">
      <AuroraBackground color1={palette.generic[2]} color2={palette.matching[2]} />

      {/* Header */}
      <div className="sticky top-0 z-40 glass shadow-sm mb-10 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 
              className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-500"
              style={{ backgroundImage: `linear-gradient(to right, ${palette.spot[0]}, ${palette.matching[5]})` }}
            >
              Socolor Designer
            </h1>
            <p className="text-xs text-slate-500 font-medium">by ThangTran</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-16 relative z-10">
        
        <ColorPickerSection 
          color={baseColor} 
          onChange={setBaseColor} 
          onRandom={handleRandomColor} 
        />

        <PaletteSection 
          palette={palette} 
          direction={direction} 
          onCopy={copyToClipboard} 
        />

        <TypographySection 
          content={content}
          onContentChange={handleContentChange}
          currentStyle={currentStyle}
          onStyleChange={setCurrentStyle}
          layout={layout}
          onLayoutChange={setLayout}
          styles={FONT_STYLES}
          palette={palette}
          direction={direction}
        />

      </div>

      <footer className="text-center mt-10 text-slate-400 text-sm font-medium pb-20">
        &copy; 2025 Socolor Designer. Built by ThangTran.
      </footer>

      <ControlBar direction={direction} onChange={setDirection} />
      
      <GeminiAssistant onApply={handleAIGenerated} />

      {/* Toast Notification */}
      <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 glass text-slate-800 px-6 py-3 rounded-full shadow-xl transition-all duration-300 pointer-events-none z-[60] font-bold flex items-center gap-2 text-sm border border-white/50 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        ✅ Copied: {toast.msg.length > 20 ? 'CSS Code' : toast.msg}
      </div>

    </div>
  );
};

export default App;