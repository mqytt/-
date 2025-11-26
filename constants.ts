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
    id: 'trix',
    name: 'TRI-X 400',
    description: 'Classic Journalism B&W',
    cssFilter: 'grayscale(100%) contrast(1.2) brightness(1.1)',
    canvasFilter: 'grayscale(100%) contrast(120%) brightness(110%)',
    overlayColor: 'rgba(20, 20, 20, 0.1)', 
    overlayBlend: 'multiply'
  },
  {
    id: 'portra400',
    name: 'PORTRA 400',
    description: 'Warm skin tones, fine grain',
    cssFilter: 'sepia(0.2) contrast(1.1) saturate(1.2) hue-rotate(-5deg)',
    canvasFilter: 'sepia(20%) contrast(110%) saturate(120%) hue-rotate(-5deg)',
    overlayColor: 'rgba(255, 230, 200, 0.1)',
    overlayBlend: 'overlay'
  },
  {
    id: 'portra800',
    name: 'PORTRA 800',
    description: 'Vivid warmth, higher saturation',
    cssFilter: 'sepia(0.1) contrast(1.15) saturate(1.35) brightness(1.05)',
    canvasFilter: 'sepia(10%) contrast(115%) saturate(135%) brightness(105%)',
    overlayColor: 'rgba(255, 200, 150, 0.15)',
    overlayBlend: 'overlay'
  },
  {
    id: 'fuji400h',
    name: 'FUJI PRO 400H',
    description: 'Pastel, airy, cyan highlights',
    cssFilter: 'brightness(1.1) contrast(1.05) saturate(1.1) hue-rotate(5deg)',
    canvasFilter: 'brightness(110%) contrast(105%) saturate(110%) hue-rotate(5deg)',
    overlayColor: 'rgba(180, 255, 255, 0.15)', // Cyan tint
    overlayBlend: 'screen'
  },
  {
    id: 'cinestill',
    name: 'CINESTILL 800T',
    description: 'Cool shadows, tungsten balance',
    cssFilter: 'contrast(1.1) brightness(1.1) saturate(1.1) hue-rotate(185deg) sepia(0.2)', 
    canvasFilter: 'contrast(110%) brightness(110%) saturate(110%) hue-rotate(185deg) sepia(20%)',
    overlayColor: 'rgba(0, 20, 40, 0.2)',
    overlayBlend: 'screen'
  },
  {
    id: 'phocus',
    name: 'PHOCUS BLUE',
    description: 'Commercial Studio Cool',
    cssFilter: 'saturate(0.9) contrast(1.2) brightness(1.05)',
    canvasFilter: 'saturate(90%) contrast(120%) brightness(105%)',
    overlayColor: 'rgba(0, 30, 80, 0.15)', // Deep blue tint
    overlayBlend: 'overlay'
  },
  {
    id: 'ektar',
    name: 'EKTAR 100',
    description: 'Ultra vivid landscape negative',
    cssFilter: 'contrast(1.3) saturate(1.4) brightness(0.95)',
    canvasFilter: 'contrast(130%) saturate(140%) brightness(95%)',
  },
  {
    id: 'bleach',
    name: 'BLEACH BYPASS',
    description: 'Desaturated, silver, cinematic',
    cssFilter: 'contrast(1.5) saturate(0.2) brightness(1.1)',
    canvasFilter: 'contrast(150%) saturate(20%) brightness(110%)',
  },
  {
    id: 'iphone4s',
    name: '4S CLASSIC',
    description: 'Vintage warm digital sensor',
    cssFilter: 'sepia(0.4) contrast(1.1) saturate(0.85) brightness(1.1)',
    canvasFilter: 'sepia(40%) contrast(110%) saturate(85%) brightness(110%)',
  },
];