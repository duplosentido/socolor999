import { FontStyle } from './types';

export const FONT_STYLES: FontStyle[] = [
    { id: 'thanhxuan', name: 'Thanh Xuân', fontHead: 'font-script', nameHead: 'Great Vibes', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-sans-human', isScript: true, subCase: 'uppercase tracking-widest', desc: 'Soft, dreamy, elegant' },
    { id: 'quocdan', name: 'Modern UI', fontHead: 'font-sans-human', nameHead: 'Be Vietnam Pro', fontSub: 'font-sans-human', nameSub: 'Be Vietnam Pro', fontBody: 'font-sans-human', isScript: false, subCase: 'uppercase tracking-wide', desc: 'Clean, corporate, clear' },
    { id: 'tapchi', name: 'Magazine', fontHead: 'font-serif-display', nameHead: 'Prata', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-serif-text', isScript: false, subCase: 'italic tracking-wide', desc: 'Luxury, fashion, serif' },
    { id: 'ngonghinh', name: 'Playful', fontHead: 'font-hand', nameHead: 'Patrick Hand', fontSub: 'font-hand', nameSub: 'Patrick Hand', fontBody: 'font-sans-human', isScript: false, subCase: 'lowercase tracking-wide', desc: 'Fun, friendly, hand-drawn' },
    { id: 'poster', name: 'Blockbuster', fontHead: 'font-poster', nameHead: 'Anton', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-sans-human', isScript: false, subCase: 'uppercase tracking-tighter', desc: 'Strong, impactful, bold', headCase: 'uppercase' },
    { id: 'tho', name: 'Poetic', fontHead: 'font-serif-text', nameHead: 'Playfair', fontSub: 'font-script', nameSub: 'Great Vibes', fontBody: 'font-serif-text', isScript: true, subCase: 'normal-case text-lg', desc: 'Classic, romantic' },
    { id: 'trending', name: 'Trending', fontHead: 'font-sans-human', nameHead: 'Be Vietnam Pro', fontSub: 'font-script-bold', nameSub: 'Dancing Script', fontBody: 'font-sans-human', isScript: false, subCase: 'normal-case text-2xl', desc: 'Bold & Handwritten' },
    { id: 'experttip', name: 'Expert Tip', fontHead: 'font-condensed', nameHead: 'Oswald', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-sans-human', isScript: false, subCase: 'uppercase tracking-widest text-xs', desc: 'Professional, Instructional' },
    { id: 'flashsale', name: 'Flash Sale', fontHead: 'font-poster', nameHead: 'Anton', fontSub: 'font-script-bold', nameSub: 'Dancing Script', fontBody: 'font-sans-human', isScript: false, subCase: 'normal-case text-3xl -rotate-6', desc: 'Loud, Exciting' },
    { id: 'signature', name: 'Signature', fontHead: 'font-script-bold', nameHead: 'Dancing Script', fontSub: 'font-sans-geo', nameSub: 'Montserrat', fontBody: 'font-serif-text', isScript: true, subCase: 'uppercase tracking-widest text-[10px]', desc: 'Personal, Authentic' }
];

export const INITIAL_COLOR = "#3282E3";

export const INITIAL_CONTENT = {
    heading: "Thanh Xuân",
    sub: "Như một tách trà",
    body: "Sống không cà khịa thì trà mất ngon!"
};