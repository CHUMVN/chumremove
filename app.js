// Chum Remove - Gemini Watermark Remover
// Based on Reverse Alpha Blending algorithm

// Correct Alpha maps from original repo
const BG_48 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAGVElEQVR4nMVYvXIbNxD+FvKMWInXmd2dK7MTO7sj9QKWS7qy/Ab2o/gNmCp0JyZ9dHaldJcqTHfnSSF1R7kwlYmwKRYA93BHmkrseMcjgzgA++HbH2BBxhhmBiB/RYgo+hkGSFv/ZOY3b94w89u3b6HEL8JEYCYATCAi2JYiQ8xMDADGWsvMbfVagm6ZLxKGPXr0qN/vJ0mSpqn0RzuU//Wu9MoyPqxmtqmXJYwxxpiAQzBF4x8/fiyN4XDYoZLA5LfEhtg0+glMIGZY6wABMMbs4CaiR8brkYIDwGg00uuEMUTQ1MYqPBRRYZjZ+q42nxEsaYiV5VOapkmSSLvX62VZprUyM0DiQACIGLCAESIAEINAAAEOcQdD4a+2FJqmhDd/YEVkMpmEtrU2igCocNHW13swRBQYcl0enxbHpzEhKo0xSZJEgLIsC4Q5HJaJ2Qg7kKBjwMJyCDciBBcw7fjSO4tQapdi5vF43IZ+cnISdh9Y0At2RoZWFNtLsxr8N6CUTgCaHq3g+Pg4TVO1FACSaDLmgMhYC8sEQzCu3/mQjNEMSTvoDs4b+nXny5cvo4lBJpNJmKj9z81VrtNhikCgTsRRfAklmurxeKx9JZIsy548eeITKJgAQwzXJlhDTAwDgrXkxxCD2GfqgEPa4rnBOlApFUC/39fR1CmTyWQwGAQrR8TonMRNjjYpTmPSmUnC8ODgQHqSJDk7O9uNBkCv15tOp4eHh8SQgBICiCGu49YnSUJOiLGJcG2ydmdwnRcvXuwwlpYkSabTaZS1vyimc7R2Se16z58/f/jw4Z5LA8iy7NmzZ8J76CQ25F2UGsEAJjxo5194q0fn9unp6fHx8f5oRCQ1nJ+fbxtA3HAjAmCMCaGuAQWgh4eH0+k0y7LGvPiU3CVXV1fz+by+WQkCJYaImKzL6SEN6uMpjBVMg8FgOp3GfnNPQADqup79MLv59AlWn75E/vAlf20ibmWg0Pn06dPJZNLr9e6nfLu8//Ahv/gFAEdcWEsgZnYpR3uM9KRpOplMGmb6SlLX9Ww2q29WyjH8+SI+pD0GQJIkJycn/8J/I4mWjaQoijzPb25uJJsjmAwqprIsG4/HbVZ2L/1fpCiKoijKqgTRBlCWZcPhcDQafUVfuZfUdb1cLpfL5cePf9Lr16/3zLz/g9T1quNy+F2FiYjSNB0Oh8Ph8HtRtV6vi6JYLpdVVbmb8t3dnSAbjUbRNfmbSlmWeZ6XHytEUQafEo0xR0dHUdjvG2X3Sd/Fb0We56t6BX8l2mTq6BCVnqOjo7Ozs29hRGGlqqrOr40CIKqeiGg8Hn/xcri/rG/XeZ7/evnrjjGbC3V05YC/BSRJ8urVq36/3zX7Hjaq63o+n19fX/upUqe5VxFok7UBtQ+T6XQ6GAz2Vd6Ssizn8/nt7a3ay1ZAYbMN520XkKenpx0B2E2SLOo+FEWxWPwMgMnC3/adejZMYLLS42r7oH4LGodpsVgURdHQuIcURbFYLDYlVKg9sCk5wpWNiHym9pUAEQGG6EAqSxhilRQWi0VZVmrz23yI5cPV1dX5TwsmWGYrb2TW36OJGjdXhryKxEeHvjR2Fgzz+bu6XnVgaHEmXhytEK0W1aUADJPjAL6CtPZv5rsGSvUKtv7r8/zdj+v1uoOUpsxms7qunT6+g1/TvTQCxE6XR2kBqxjyZo6K66gsAXB1fZ3neQdJSvI8X61WpNaMWCFuKNrkGuGGmMm95fhpvPkn/f6lAgAuLy/LstyGpq7r9+8d4rAr443qaln/ehHt1siv3dvt2B/RDpJms5lGE62gEy9az0XGcQCK3DL4DTPr0pPZEjPAZVlusoCSoihWqzpCHy7ODRXhbUTJly9oDr4fKDaV9NZJUrszPOjsI0a/FzfwNt4eHH+BSyICqK7rqqo0u0VRrFYridyN87L3pBYf7qvq3wqc3DMldJmiK06pgi8uLqQjAAorRG+p+zLUxks+z7rOkOzlIUy8yrAcQFVV3a4/ywBPmJsVMcTM3l/h9xDlLga4I1PDGaD7UNBPuCKBleUfy2gd+DOrPWubGHJJyD+L+LCTjEXEgH//2uSxhu1/Xzocy+VSL+2cUhrqLVZ/jTYL0IMtQEklT3/iWCutzUljDDNXVSVHRFWW7SOtccHag6V/AF1/slVRyOkZAAAAAElFTkSuQmCC';

const BG_96 = 'data:image/png;base64,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.V3u.b24uLj7+48W84XF2J0WxVVDOLm5fev27R3NnWQdDrSYdJBZgp+e7u+9S2hXrcz3Y3n5kGNm5+eX1X1C5TKJD6Nqe7hnSLPFemU2R5D/iNUICpiIFGpqr3p+XH62vXtL9Uh8PhUDgUCodDoVAoFAwGQ6FQKBQKBIPBUCgUCgaDwVAoFAqFQsFgMBgKhUKhYDAYCoVCwaBwOBQOB0PBYCgUCodDoXA4FAqHw+FQOBwOhcKhUCgUDoVD4XAoFA6HQ6FwOBQKhcOhUCgUDodC4XA4FAqHQ6FQOBwOhULhUCgUDodCoXAoFA6HQ+FwKBQOhUKhcDgUCoVDoVAoFA6HQ+FwKBQOh0OhcDgUDodD4XAoFA6HQ+FwOBQKh8OhUDgcDoVCoSw4C4XC4VAoHAqFw6FQOBwKhUKhUCgUCpdC4VA4FA6FwqFwKBQKhUKhUCgUDodC4XA4FAqHwqFQKBQKhUKhUCgUCodCoXA4HAqHQ6FQOBwKhcPhUCgUCodCoVAoHA6Fw+FQKBwOhULhcCgUCodDoVA4HAqFw+FQKBwOh0LhcCgUCodDoVAoHA6Fw+FQKBwOhULhcCgUCodCoVAoHAqFw6FQOBwOhcLhUCgUDodCoVA4HAqFw6FQOBwKhcOhUCgcDoVC4XAoFA6HQqFwOBQKh8OhUCgcDodC4XAoFA6HQ+FwOBQKhcOhUCgUCodCoXA4HAqFw6FQOBwKhcKhUCgcDoVC4XA4FA6HQ+FwOBQKhcOhUCgcDoVC4XA4FA6HQ6FwOBQKhcOhUCgcDodC4XA4FA6HQ+FwOBQKh8OhUCgcDoVC4XA4FA6HQ+FwKBQOh0KhcDgUCoXD4VAoHA6FQuFwKBQKh8OhUCgcDoVCoXA4FA6HQ+FwOBQKhcOhUDgcDoVC4XA4FA6HQ+FwKBQOh0KhcDgUCoXD4VA4HAqFw6FQOBwOhULhcCgUCodDoVAoHA6Fw+FQKBwOhcLhUCgUDodCoXA4FA6HQ+FwKBQOh0OhcDgUCoXD4VAoHA6FQuFwKBQKh8OhUCgcDoVCoXA4FA6HQ6FwOBQKhcOhUCgcDoVC4XA4FA6HQ+FwKBQOh0OhcDgUCoVDoXA4FA6HQ+FwOBQKhcOhUCgcDoVC4XA4FA6HQ6FwOBQKh8OhUCgcDoVC4XA4FAqFw+FQKBwOh0LhcCgUCodDoVAoHA6Fw+FQKBwOhcLhUCgcDoVC4XA4FAqFw+FQOBwOhULhcCgUCodDoVAoHAqHw6FQOBwKhcPhUCgcDodC4XAoFAqHQ+FwKBwOhcLhUCgcDoVC4XAoFAqHw6FQOBwOhULhcCgUCodDoVA4HAqFw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ6FwOBQKhcOhUCgcDoVC4XA4FAqFw+FQOBwOhcLhUCgcDoVCoXA4FA6HQ+FwKBQKh8OhUCgcDoVCoXA4FAqFw+FQOBwOhcLhUCgcDoVC4XA4FAqF.w+FQOBwOhcLhUCgcDoVCoXA4FAqFw6FQOBwOhcLhUCgUDodCoXA4FA6HQ+FwKBQKh0OhUDgcCrfD4VA4HAqFw+FQKBcOhUKhcCgUCofD4VA4HAqFw6FQKBwOhULhcCgUCodC4XA4FAqFw6FQKBwOhULhcCgUCodDoVA4HAqFw+FQKBwOhULhcCgUCodCoVAoHAqFw6FQOBwKhcOhUCgcDoVCoXA4FAqFw6FQKBwOhULhcCgUCodCoXA4FAqFw6FQOBwKhcKhUCgcDoVCoXA4FA6HQ+FwKBQOhUKhUDgcCoXC4VAoFA6FQuFwKBQKh8OhUDgcCoVC4XAoFA6HQ+FwKBQOh0KhcDgUCr XD4VAoHA6FQuFwKBQKh0KhUDgcCoXD4VAoFA6HQ+FwKBQKhUKhcDgUCoXD4VA4HAqFw6FQKBwOhcLhcCgUCodDoVAoHA6Fw+FQKBwOhULhcCgUCodDoVAoHAqFw+FQKBwOhcLhUCgUDodCoVA4HAqFw+FQKBwOhULhcCgUCodCoVA4HAqFw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ+FwKBQOhUKhcDgUCoXD4PA4FA6HQ+FwKBQOh0KhcDgUCrXD4VA4HAqFw6FQKBwOhULhcCgUCodDoVA4HAqFw6FQOBwKhcLhUCgUDodCoVA4HA6Fw+FQKBwOhULhcCgUCodDoVAoHA6Fw+FQKBwOhULhcCgUCodDoVAoHA6Fw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ+FwKBQOh0KhcDgUCodDoVA4HAqFw+FQKBwOhULhcCgUCodDoVAoHA6Fw+FQKBwOhULhcC gUCodDoVAoHA6Fw6FQOBwOhcLhUCgUDodCoVA4HAqFw+FQKBwOhULhcCgUDodDoVAoHA6Fw+FQKBwOhcLhUCgUDodCoVA4HAqFw6FQOBwKhcLhUCgUDodCoVA4HAqFw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ+FwKBQOh0KhcDgUCoXD4VA4HAqFw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ+FwKBQOh0KhcDgUCoXD4VA4HAqFw6FQOBwKhcOhUCgcDoVCoXA4FA6HQ6FwOBQKhcOhUCgcDodC4XAoFA6HQuFwKBQKh8OhUDgcCoVC4XAoFAqFw6FQOBwKhcLhUCgcDoVCoXA4FA6HQ6FwOBQKhcOhUCgcDoVC4XAoFA6HQ+FwKBQKhUOhUDgcCoXC4VAoHA6FQuFwKBQKh8OhUCgcDoVC4XAoFA6HQuFwKBQKhUOhUDgcCoXC4VAoFA6HQuFwKBQOh0KhcDgUCoXD4VArHA6FQ+FwKBQOhUKhcDgUCoXD4VA4HA6FwuFQKBQOhUKhcDgUCoXD4VA4HAqFw6FQOBwKhcOhUCgcDoVC4XA4FA6HQ+FwKBQOh0KhcDgUCoXD4VA4HAqFw6FQOBwKhcOhUCgcDoVC4XA4FAqFw6FQOBwKhcKhUCgcDoVCoXA4FAqFw6FQOBwKhcOhUCg='

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
    img.onerror = reject;
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

// Get alpha map
async function getAlphaMap(size) {
  if (alphaMaps[size]) return alphaMaps[size];

  const bgSrc = size === 48 ? BG_48 : BG_96;
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
      try {
        originalImage.src = e.target.result;
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
        alert('Có lỗi xảy ra: ' + error.message);
      }
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

function showLoading() { loadingOverlay.classList.add('active'); }
function hideLoading() { loadingOverlay.classList.remove('active'); }
