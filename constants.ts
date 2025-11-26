import { FilterPreset, ISOSetting } from './types';

export const ISO_SETTINGS = [
  ISOSetting.ISO_100,
  ISOSetting.ISO_400,
  ISOSetting.ISO_800,
  ISOSetting.ISO_1600,
  ISOSetting.ISO_3200,
];

export const FILTERS: FilterPreset[] = [
  {
    id: 'hncs',
    name: 'HNCS NATURAL',
    description: 'Hasselblad Natural Color Solution',
    cssFilter: 'contrast(1.05) saturate(1.05) brightness(1.02)',
    canvasFilter: 'contrast(105%) saturate(105%) brightness(102%)',
  },
  {
    id: 'bw-gr',
    name: 'GR MONO',
    description: 'High Contrast Black & White',
    cssFilter: 'grayscale(100%) contrast(1.4) brightness(0.9)',
    canvasFilter: 'grayscale(100%) contrast(140%) brightness(90%)',
  },
  {
    id: 'portra',
    name: 'PORTRA 400',
    description: 'Warm skin tones, fine grain',
    cssFilter: 'sepia(0.2) contrast(1.1) saturate(1.2) hue-rotate(-5deg)',
    canvasFilter: 'sepia(20%) contrast(110%) saturate(120%) hue-rotate(-5deg)',
    overlayColor: 'rgba(255, 230, 200, 0.1)',
    overlayBlend: 'overlay'
  },
  {
    id: 'cinestill',
    name: 'CINESTILL 800T',
    description: 'Cool shadows, halated highlights',
    cssFilter: 'contrast(1.1) brightness(1.1) saturate(1.1) hue-rotate(185deg) sepia(0.2)', // Approximate
    canvasFilter: 'contrast(110%) brightness(110%) saturate(110%) hue-rotate(185deg) sepia(20%)',
    overlayColor: 'rgba(0, 20, 40, 0.2)',
    overlayBlend: 'screen'
  },
  {
    id: 'iphone4s',
    name: '4S CLASSIC',
    description: 'Vintage warm digital sensor',
    cssFilter: 'sepia(0.4) contrast(1.1) saturate(0.85) brightness(1.1)',
    canvasFilter: 'sepia(40%) contrast(110%) saturate(85%) brightness(110%)',
  },
];
