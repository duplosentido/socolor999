import React, { useRef, useState } from 'react';
import { FontStyle, TypographyContent, LayoutType, PaletteData, GradientDirection } from './types';
import { isLight } from './colorUtils';
import { Image as ImageIcon, Layers, Loader2, Download, Upload, Trash2 } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';

interface TypographySectionProps {
  content: TypographyContent;
  onContentChange: (field: keyof TypographyContent, value: string) => void;
  currentStyle: FontStyle;
  onStyleChange: (style: FontStyle) => void;
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  styles: FontStyle[];
  palette: PaletteData;
  direction: GradientDirection;
}

const TypographySection: React.FC<TypographySectionProps> = ({
  content,
  onContentChange,
  currentStyle,
  onStyleChange,
  layout,
  onLayoutChange,
  styles,
  palette,
  direction
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null);

  // Helper to format text for script fonts if needed
  const formatText = (text: string, isScript: boolean) => {
    if (isScript) {
      return text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    return text;
  };

  // Image Upload Logic
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setBgImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Image Download Logic
  const handleDownload = async (type: 'jpg' | 'png') => {
    if (!previewRef.current) return;
    setIsDownloading(true);

    try {
      const scale = 2; // Quality scaling
      const node = previewRef.current;
      let dataUrl = '';
      const fileName = `socolor-design-${Date.now()}`;

      if (type === 'jpg') {
        // Download Full Design (with background)
        dataUrl = await toJpeg(node, {
          quality: 0.95,
          pixelRatio: scale,
          backgroundColor: '#ffffff',
          filter: (child) => {
            // Exclude the download toolbar from the capture
            if (child.classList && child.classList.contains('download-toolbar')) {
              return false;
            }
            return true;
          }
        });
      } else {
        // Download Transparent PNG (Text Only)
        dataUrl = await toPng(node, {
          pixelRatio: scale,
          backgroundColor: 'transparent', // Force transparent background
          filter: (child) => {
            // Exclude elements with class 'bg-layer' to remove background blobs and gradients
            if (child.classList && child.classList.contains('bg-layer')) {
              return false;
            }
            // Exclude the font info tag and toolbars
            if (child.classList && (child.classList.contains('font-info-tag') || child.classList.contains('download-toolbar'))) {
              return false;
            }
            // Exclude the image overlay if doing transparent PNG
            if (child.classList && child.classList.contains('bg-overlay')) {
                return false;
            }
            return true;
          },
          style: {
            // Remove borders and shadows from the main container for the PNG export
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0',
            background: 'transparent',
            backgroundImage: 'none' // Ensure bg image is gone for transparent PNG
          }
        });
      }

      const link = document.createElement('a');
      link.download = `${fileName}.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Dynamic Logic for Preview
  const primary = palette.spot[0];
  const accent = palette.spot[3];
  // Use the start of the gradient (generic[0]) as reference for background brightness
  // This prevents dark backgrounds (like blue) from being interpreted as light if the mid-palette is light
  const bgBaseColor = palette.generic[0];
  const lightBg = isLight(bgBaseColor);

  // Determine text colors: if bgImage is set, force white for readability
  const textColor = bgImage ? '#ffffff' : (lightBg ? '#1e293b' : '#ffffff');
  // Use accent color for sub-heading on light backgrounds to ensure contrast against primary-tinted backgrounds
  const subColor = bgImage ? '#ffffff' : (lightBg ? accent : '#ffffff');
  const bodyColor = bgImage ? '#e2e8f0' : (lightBg ? '#475569' : '#cbd5e1');

  let containerClass = "relative z-10 w-full max-w-2xl transition-all duration-500 flex flex-col h-full justify-center";
  let pHeadClass = `mb-4 transition-all duration-300 drop-shadow-sm ${currentStyle.fontHead}`;
  let pSubClass = `mb-4 transition-all duration-300 text-sm font-bold ${currentStyle.fontSub} ${currentStyle.subCase}`;
  let pBodyClass = `text-base md:text-lg leading-relaxed max-w-lg mx-auto transition-all duration-300 ${currentStyle.fontBody}`;
  
  // Layout Specifics
  if (layout === 'center') {
    containerClass += " text-center items-center";
  } else if (layout === 'left') {
    containerClass += " text-left items-start";
  } else if (layout === 'poster') {
    containerClass += " text-center items-center";
  }

  // Style Specifics
  if (currentStyle.id === 'poster') {
    pHeadClass += " text-7xl md:text-8xl font-black uppercase tracking-tighter text-shadow-lg leading-[0.85]";
  } else if (currentStyle.id === 'flashsale') {
    pHeadClass += " text-7xl md:text-9xl font-black uppercase text-shadow-lg transform -rotate-2";
  } else if (currentStyle.id === 'thanhxuan') {
    pHeadClass += " text-6xl md:text-8xl font-normal text-shadow-sm leading-tight";
  } else if (currentStyle.id === 'experttip') {
     pHeadClass += " text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none";
  } else if (currentStyle.id === 'trending') {
     pHeadClass += " text-5xl md:text-7xl font-black tracking-tight";
  } else if (currentStyle.id === 'signature') {
     pHeadClass += " text-6xl md:text-8xl font-bold -rotate-3";
  } else {
    pHeadClass += " text-5xl md:text-7xl font-bold text-shadow-sm leading-tight";
    if (currentStyle.headCase) {
      pHeadClass += ` ${currentStyle.headCase}`;
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-l-4 border-indigo-500 pl-4">
        <h3 className="text-xl font-bold text-slate-800">2. Content & Typography</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Input Fields */}
           <div className="space-y-3">
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase">Heading</label>
               <input 
                 className="w-full p-2 bg-white/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 font-bold" 
                 value={content.heading} 
                 onChange={(e) => onContentChange('heading', e.target.value)} 
               />
             </div>
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase">Subheading</label>
               <input 
                 className="w-full p-2 bg-white/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800" 
                 value={content.sub} 
                 onChange={(e) => onContentChange('sub', e.target.value)} 
               />
             </div>
             <div>
               <label className="text-xs font-bold text-slate-500 uppercase">Body</label>
               <textarea 
                 className="w-full p-2 bg-white/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-sm h-24 resize-none" 
                 value={content.body} 
                 onChange={(e) => onContentChange('body', e.target.value)} 
               />
             </div>
           </div>

           {/* Background Image Control */}
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Background Image</label>
             <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-indigo-300 flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Upload className="w-4 h-4"/> {bgImage ? 'Change Image' : 'Upload Image'}
                </button>
                {bgImage && (
                  <button 
                    onClick={handleRemoveImage}
                    className="w-10 flex items-center justify-center bg-red-50 border border-red-100 rounded-xl text-red-500 hover:bg-red-100 transition-all"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4"/>
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
             </div>
           </div>

           {/* Style Selection */}
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Style Preset</label>
             <div className="grid grid-cols-2 gap-2">
               {styles.map((s) => (
                 <button
                   key={s.id}
                   onClick={() => onStyleChange(s)}
                   className={`p-3 rounded-xl border-2 text-left transition-all text-sm ${currentStyle.id === s.id ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                 >
                   <div className={`font-bold text-slate-800 ${s.fontHead}`}>{s.name}</div>
                   <div className="text-[10px] text-slate-400">{s.desc}</div>
                 </button>
               ))}
             </div>
           </div>

           {/* Layout Selection */}
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Layout</label>
             <div className="flex bg-slate-100 p-1 rounded-lg">
               {(['left', 'center', 'poster'] as LayoutType[]).map((l) => (
                 <button
                   key={l}
                   onClick={() => onLayoutChange(l)}
                   className={`flex-1 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${layout === l ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   {l}
                 </button>
               ))}
             </div>
           </div>

        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8">
          <div 
            ref={previewRef}
            className="aspect-[4/3] md:aspect-video rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col items-center justify-center p-8 md:p-16 border border-white/50 select-none group"
            style={{ 
                background: bgImage 
                    ? `url(${bgImage}) center/cover no-repeat`
                    : `linear-gradient(${direction}, ${palette.generic[0]}, ${palette.matching[1]})` 
            }}
          >
             {/* Overlay for BG Image to ensure contrast */}
             {bgImage && (
                 <div className="bg-overlay absolute inset-0 bg-black/40 z-0 pointer-events-none" />
             )}

             {/* Background Blobs - Only show if NO bg image is set */}
             {!bgImage && (
               <div className="bg-layer absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                 <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-white rounded-full blur-[80px] opacity-60" />
                 <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full blur-[80px] opacity-60" style={{ backgroundColor: accent }} />
               </div>
             )}

             <div className={containerClass} style={{ color: textColor }}>
                <h2 className={pHeadClass}>
                  {formatText(content.heading, currentStyle.isScript)}
                </h2>
                <h3 className={pSubClass} style={{ color: subColor, opacity: 0.9 }}>
                  {content.sub}
                </h3>
                <p className={pBodyClass} style={{ color: bodyColor, opacity: 0.85 }}>
                  {content.body}
                </p>
             </div>

             {/* Download Toolbar - Bottom Left */}
             <div className="download-toolbar absolute bottom-6 left-6 z-30 flex gap-2">
               <button 
                 onClick={() => handleDownload('png')}
                 disabled={isDownloading}
                 className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-lg transition-all disabled:opacity-50 shadow-lg"
                 title="Download Text Only (Transparent PNG)"
               >
                  {isDownloading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Layers className="w-3 h-3"/>} PNG
               </button>
               <button 
                 onClick={() => handleDownload('jpg')}
                 disabled={isDownloading}
                 className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-black/30 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-lg transition-all disabled:opacity-50 shadow-lg"
                 title="Download Full Card (JPG)"
               >
                  {isDownloading ? <Loader2 className="w-3 h-3 animate-spin"/> : <ImageIcon className="w-3 h-3"/>} JPG
               </button>
             </div>

             {/* Watermark - Bottom Right */}
             <div className="absolute bottom-6 right-6 text-[10px] font-bold z-20 select-none opacity-50 mix-blend-overlay tracking-widest text-white">
               by ThangTran
             </div>

             {/* Font Info Tag - Top Right */}
             <div className="font-info-tag absolute top-6 right-6 bg-black/20 backdrop-blur-md text-white/80 text-[10px] px-3 py-1 rounded-full font-mono opacity-0 group-hover:opacity-100 transition-opacity">
               {currentStyle.nameHead} + {currentStyle.nameSub}
             </div>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-4">
             Preview rendering. Fonts shown are approximated web fonts.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TypographySection;