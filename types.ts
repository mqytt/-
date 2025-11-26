export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  cssFilter: string; // For React Preview
  canvasFilter: string; // For Export
  overlayColor?: string; // Optional color overlay for tint
  overlayBlend?: GlobalCompositeOperation;
}

export interface AppState {
  imageSrc: string | null;
  filterIndex: number;
  isoIndex: number;
  isProcessing: boolean;
}

export enum ISOSetting {
  ISO_100 = 100,
  ISO_400 = 400,
  ISO_800 = 800,
  ISO_1600 = 1600,
  ISO_3200 = 3200,
}