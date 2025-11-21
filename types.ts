export interface PaletteData {
  generic: string[];
  matching: string[];
  spot: string[];
}

export interface TypographyContent {
  heading: string;
  sub: string;
  body: string;
}

export interface FontStyle {
  id: string;
  name: string;
  fontHead: string;
  nameHead: string;
  fontSub: string;
  nameSub: string;
  fontBody: string;
  isScript: boolean;
  subCase: string;
  desc: string;
  headCase?: string;
}

export type LayoutType = 'center' | 'left' | 'poster';

export type GradientDirection = 'to right' | 'to left' | 'to bottom right';

export interface AIAssistantResponse {
  hex: string;
  heading: string;
  sub: string;
  body: string;
  styleId?: string;
}
