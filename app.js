// Chum Remove - Gemini Watermark Remover
// Based on Reverse Alpha Blending algorithm

// Constants
const ALPHA_THRESHOLD = 0.002;
const MAX_ALPHA = 0.99;
const LOGO_VALUE = 255;

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
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
let alphaMaps = {};

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

// Load image helper
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error('Failed to load image: ' + src));
    img.src = src;
  });
}

// Calculate alpha map from background image
function calculateAlphaMap(imageData) {
  const { width, height, data } = imageData;
  const alphaMap = new Float32Array(width * height);

  for (let i = 0; i < alphaMap.length; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    alphaMap[i] = Math.max(r, g, b) / 255.0;
  }
  return alphaMap;
}

// Get alpha map from external PNG files
async function getAlphaMap(size) {
  if (alphaMaps[size]) return alphaMaps[size];

  // Load from external file
  const bgSrc = size === 48 ? 'bg_48.png' : 'bg_96.png';

  try {
    const bgImage = await loadImage(bgSrc);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bgImage, 0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const alphaMap = calculateAlphaMap(imageData);

    alphaMaps[size] = alphaMap;
    return alphaMap;
  } catch (error) {
    throw new Error('Không thể tải alpha map. Vui lòng kiểm tra file ' + bgSrc);
  }
}

function detectConfig(width, height) {
  // Gemini rules: if both > 1024, use 96x96 watermark, else 48x48
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

      // Reverse alpha blending: original = (watermarked - alpha * logo) / (1 - alpha)
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

  try {
    const imageUrl = await readFileAsDataURL(file);
    const img = await loadImage(imageUrl);

    originalImage.src = imageUrl;
    originalInfo.textContent = `${img.width}×${img.height}`;

    uploadArea.style.display = 'none';
    previewSection.classList.add('active');

    const config = detectConfig(img.width, img.height);
    const position = {
      x: img.width - config.marginRight - config.logoSize,
      y: img.height - config.marginBottom - config.logoSize,
      width: config.logoSize,
      height: config.logoSize
    };

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

  } catch (error) {
    console.error('Processing error:', error);
    hideLoading();
    alert('Có lỗi xảy ra: ' + (error.message || 'Unknown error'));
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsDataURL(file);
  });
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

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }
