// Chum Remove - Gemini Watermark Remover
// Based on Reverse Alpha Blending algorithm

// Alpha maps embedded as base64 (extracted from Gemini watermark)
const BG_48_BASE64 = 'data:image/png;base64,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';

const BG_96_BASE64 = 'data:image/png;base64,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+Xy+QCAQCAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAV9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/n9fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDIZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDIZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/n9fr/P5/MFAgGfz+fz+XyBQCAQDIZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDIV8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAV9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAV9Pp/f5/P5fL5AIOAPBPz+QMDn8/n8fr/P5/MFAgGfz+fz+XyBQCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDAZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCAR8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQCPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+XyBQCAQDPh8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ8Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAZ9Pp/f5/P5fL5AIOAPBPz+QMDn8/l8fr/P5/MFAgGfz+fz+Xy+QCAQDAaDPp/P7/P5fD5fIBDwBwJ+fyDg8/l8fr/f5/P5AoGAz+fz+Xw+XyAQCAaDQZ/P5/f5fD6fLxAI+AMBvz8Q8Pl8Pr/f7/P5fIFAwOfz+Xw+ny8QCASCwaDPH/D7fD6fzxcIBPyBgN8fCPh8Pp/f7/f5fL5AIODz+Xw+ny8QCASC';

// Constants
const ALPHA_THRESHOLD = 0.002;
const MAX_ALPHA = 0.99;
const LOGO_VALUE = 255;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const originalCard = document.getElementById('originalCard');
const originalImage = document.getElementById('originalImage');
const originalInfo = document.getElementById('originalInfo');
const processedCard = document.getElementById('processedCard');
const processedImage = document.getElementById('processedImage');
const processedInfo = document.getElementById('processedInfo');
const watermarkIndicator = document.getElementById('watermarkIndicator');
const successBadge = document.getElementById('successBadge');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

let processedCanvas = null;
let currentFileName = '';

// Event Listeners
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length) handleFile(e.target.files[0]);
});
resetBtn.addEventListener('click', reset);
downloadBtn.addEventListener('click', download);

// Load alpha maps
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getAlphaMap(size) {
  const bgSrc = size === 48 ? BG_48_BASE64 : BG_96_BASE64;
  const bgImage = await loadImage(bgSrc);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bgImage, 0, 0);
  const imageData = ctx.getImageData(0, 0, size, size);
  const alphaMap = new Float32Array(size * size);
  for (let i = 0; i < alphaMap.length; i++) {
    const idx = i * 4;
    alphaMap[i] = Math.max(imageData.data[idx], imageData.data[idx + 1], imageData.data[idx + 2]) / 255.0;
  }
  return alphaMap;
}

function detectConfig(width, height) {
  if (width > 1024 && height > 1024) {
    return { logoSize: 96, marginRight: 64, marginBottom: 64 };
  }
  return { logoSize: 48, marginRight: 32, marginBottom: 32 };
}

function removeWatermark(imageData, alphaMap, position) {
  const { x, y, width, height } = position;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const imgIdx = ((y + row) * imageData.width + (x + col)) * 4;
      const alphaIdx = row * width + col;
      let alpha = alphaMap[alphaIdx];
      if (alpha < ALPHA_THRESHOLD) continue;
      alpha = Math.min(alpha, MAX_ALPHA);
      const oneMinusAlpha = 1.0 - alpha;
      for (let c = 0; c < 3; c++) {
        const watermarked = imageData.data[imgIdx + c];
        const original = (watermarked - alpha * LOGO_VALUE) / oneMinusAlpha;
        imageData.data[imgIdx + c] = Math.max(0, Math.min(255, Math.round(original)));
      }
    }
  }
}

async function handleFile(file) {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    alert('Vui lòng chọn file ảnh JPG, PNG hoặc WebP');
    return;
  }
  currentFileName = file.name.replace(/\.[^.]+$/, '') + '_no_watermark.png';
  showLoading();
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    const img = new Image();
    img.onload = async () => {
      originalImage.src = e.target.result;
      originalInfo.textContent = `${img.width}×${img.height}`;
      
      uploadArea.style.display = 'none';
      previewSection.classList.add('active');
      
      // Process
      const config = detectConfig(img.width, img.height);
      const position = {
        x: img.width - config.marginRight - config.logoSize,
        y: img.height - config.marginBottom - config.logoSize,
        width: config.logoSize,
        height: config.logoSize
      };
      
      // Update indicator position
      watermarkIndicator.style.width = `${Math.min(50, config.logoSize / 2)}px`;
      watermarkIndicator.style.height = `${Math.min(50, config.logoSize / 2)}px`;
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      const alphaMap = await getAlphaMap(config.logoSize);
      removeWatermark(imageData, alphaMap, position);
      ctx.putImageData(imageData, 0, 0);
      
      processedCanvas = canvas;
      processedImage.src = canvas.toDataURL('image/png');
      processedInfo.textContent = `${img.width}×${img.height}`;
      
      hideLoading();
      
      setTimeout(() => {
        watermarkIndicator.style.display = 'none';
        processedCard.style.display = 'block';
        downloadBtn.style.display = 'flex';
        setTimeout(() => successBadge.classList.add('show'), 300);
        setTimeout(() => successBadge.classList.remove('show'), 2000);
      }, 500);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function reset() {
  uploadArea.style.display = 'block';
  previewSection.classList.remove('active');
  processedCard.style.display = 'none';
  downloadBtn.style.display = 'none';
  watermarkIndicator.style.display = 'block';
  successBadge.classList.remove('show');
  fileInput.value = '';
  processedCanvas = null;
}

function download() {
  if (!processedCanvas) return;
  const link = document.createElement('a');
  link.download = currentFileName;
  link.href = processedCanvas.toDataURL('image/png');
  link.click();
}

function showLoading() {
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  loadingOverlay.classList.remove('active');
}
