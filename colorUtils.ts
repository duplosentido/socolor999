import chroma from 'chroma-js';
import { PaletteData } from '../types';

export const generateProPalettes = (baseColor: string): PaletteData | null => {
    if (!chroma.valid(baseColor)) return null;
    
    const root = chroma(baseColor);
    const clampSat = (color: any, maxSat = 0.85) => color.get('hsl.s') > maxSat ? color.set('hsl.s', maxSat) : color;

    // Generic Palette (Cooler/Neutral shift)
    const genMid = clampSat(root.set('hsl.h', '-50').brighten(0.5)); 
    const genEnd = root.set('hsl.h', '-160').set('hsl.l', 0.92).set('hsl.s', 0.8);
    const genericScale = chroma.scale([root, genMid, genEnd]).mode('lch').colors(6);

    // Matching Palette (Warm/Contrast shift)
    const matchMid = clampSat(root.set('hsl.h', '+60').brighten(0.3)); 
    const matchEnd = root.set('hsl.h', '+140').set('hsl.l', 0.75).set('hsl.s', 0.65);
    const matchingScale = chroma.scale([root, matchMid, matchEnd]).mode('lch').colors(6);

    // Spot Palette (Highlights)
    const spotPalette = [
        root.hex(), 
        root.set('hsl.h', '+30').set('hsl.l', 0.65).hex(), 
        root.set('hsl.h', '+180').set('hsl.l', 0.92).set('hsl.s', 0.3).hex(), 
        root.set('hsl.h', '+15').darken(1.2).saturate(0.5).hex(),
        root.set('hsl.h', '+180').hex(), // Contrast/Complementary
        root.set('hsl.h', '-45').brighten(0.5).hex() // Soft/Analogous Light
    ];

    return { generic: genericScale, matching: matchingScale, spot: spotPalette };
};

export const isLight = (colorHex: string): boolean => {
    return chroma(colorHex).luminance() > 0.5;
};

export const randomColor = (): string => {
    return chroma.random().hex();
};