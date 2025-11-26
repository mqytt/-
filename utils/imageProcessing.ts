import { FilterPreset, ISOSetting } from '../types';

export const processAndDownloadImage = (
  imageSrc: string,
  filter: FilterPreset,
  iso: ISOSetting,
  addBorder: boolean
): void => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  // Use the image source directly.
  img.src = imageSrc;

  img.onload = () => {
    if (!ctx) return;

    // Dimensions
    const imgWidth = img.width;
    const imgHeight = img.height;
    
    let canvasWidth = imgWidth;
    let canvasHeight = imgHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Border Configuration (Classic Hasselblad Gallery Style)
    if (addBorder) {
        // Ratios: 
        // Side/Top: 3% (Thinner clean fine border)
        // Bottom: 15% (Weighted bottom for Gallery look & Logo)
        const paddingSide = Math.floor(imgWidth * 0.03); 
        const paddingBottom = Math.floor(imgHeight * 0.15); 
        
        canvasWidth = imgWidth + (paddingSide * 2);
        canvasHeight = imgHeight + paddingSide + paddingBottom;
        
        offsetX = paddingSide;
        offsetY = paddingSide;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 1. Fill Background (Matte White)
    if (addBorder) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // 2. Apply Filters & Draw Image
    ctx.filter = filter.canvasFilter;
    ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
    ctx.filter = 'none';

    // 3. Apply Color Overlay (Film Tint)
    if (filter.overlayColor) {
      ctx.globalCompositeOperation = filter.overlayBlend || 'overlay';
      ctx.fillStyle = filter.overlayColor;
      ctx.fillRect(offsetX, offsetY, imgWidth, imgHeight);
      ctx.globalCompositeOperation = 'source-over';
    }

    // 4. Apply Grain (Noise) based on ISO
    const noiseOpacity = (Math.log2(iso / 50) * 0.05); 
    if (noiseOpacity > 0) {
       const imageData = ctx.getImageData(offsetX, offsetY, imgWidth, imgHeight);
       const data = imageData.data;
       
       for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * (noiseOpacity * 255);
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
          data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
       }
       ctx.putImageData(imageData, offsetX, offsetY);
    }

    // 5. Draw Watermark (Only if border is active)
    if (addBorder) {
        const bottomAreaStart = offsetY + imgHeight;
        const bottomAreaHeight = canvasHeight - bottomAreaStart;
        
        // Font Size relative to the bottom space
        const fontSize = Math.floor(bottomAreaHeight * 0.22); 
        
        ctx.fillStyle = '#000000'; // Pure black text
        // Use a Serif font stack for the classic logo look
        ctx.font = `italic bold ${fontSize}px "Times New Roman", Times, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const centerX = canvasWidth / 2;
        // Shift text slightly up visually to be perfectly centered in the whitespace
        const textY = bottomAreaStart + (bottomAreaHeight / 2) * 1.05;
        
        const text = "HASSELBLAD";
        
        // Manual Wide Letter Spacing
        const letterSpacing = fontSize * 0.6; 
        const totalWidth = ctx.measureText(text).width + (letterSpacing * (text.length - 1));
        
        let currentX = centerX - (totalWidth / 2);
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            ctx.fillText(char, currentX, textY);
            currentX += ctx.measureText(char).width + letterSpacing;
        }
    }

    // 6. Trigger Download
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `HASSELBLAD_${timestamp}_${filter.id.toUpperCase()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };
};

export const savePageAsHTML = () => {};