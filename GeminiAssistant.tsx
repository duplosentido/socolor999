import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AIAssistantResponse } from './types';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface GeminiAssistantProps {
  onApply: (data: AIAssistantResponse) => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || !process.env.API_KEY) return;
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a color palette and sample website copy based on this theme/mood: "${prompt}". 
        Return a HEX color, a short engaging Heading, a Subheading, and a Body paragraph.
        Also suggest a style ID from: ['thanhxuan', 'quocdan', 'tapchi', 'ngonghinh', 'poster', 'tho'].`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hex: { type: Type.STRING, description: "A hex color code, e.g. #FF5733" },
              heading: { type: Type.STRING },
              sub: { type: Type.STRING },
              body: { type: Type.STRING },
              styleId: { type: Type.STRING, description: "One of the predefined style IDs" }
            },
            required: ["hex", "heading", "sub", "body"]
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text) as AIAssistantResponse;
        onApply(data);
        setIsOpen(false);
        setPrompt('');
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:right-8 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Magic
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <div className="flex items-center gap-2 mb-1">
             <Sparkles className="w-5 h-5" />
             <h3 className="font-bold text-lg">AI Designer Assistant</h3>
          </div>
          <p className="text-indigo-100 text-sm">Describe your brand or mood, and let AI pick the colors & copy.</p>
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">✕</button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">What are you designing?</label>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g. A cozy coffee shop in autumn..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
              autoFocus
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Generate Design</>}
          </button>

          <div className="text-center text-xs text-slate-400">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

export default GeminiAssistant;