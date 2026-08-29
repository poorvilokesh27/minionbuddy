// Generates a mood-themed minion meme on an HTML5 canvas — fully local, no image API.

const MOOD_COLORS = {
  happy: { bg: "#FFD100", accent: "#2B4C7E", label: "MOOD: BANANA-LEVEL HAPPY" },
  sad: { bg: "#5C7AEA", accent: "#FFD100", label: "MOOD: SOFT SAD MINION HOURS" },
  angry: { bg: "#E1483C", accent: "#1C3357", label: "MOOD: MINI RAMPAGE" },
  neutral: { bg: "#F2B705", accent: "#2B4C7E", label: "MOOD: JUST VIBING" },
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawMinionDoodle(ctx, cx, cy, scale) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.fillStyle = "#FFD100";
  ctx.strokeStyle = "#caa000";
  ctx.lineWidth = 4;
  roundRect(ctx, -45, -60, 90, 120, 40);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#2B4C7E";
  roundRect(ctx, -45, 20, 90, 45, 12);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 3;
  ctx.arc(0, -25, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#3a2a1a";
  ctx.arc(0, -25, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l.trim(), x, y + i * lineHeight));
  return lines.length;
}

export function generateMeme(caption, mood) {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const palette = MOOD_COLORS[mood] || MOOD_COLORS.neutral;

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, 500, 500);

  drawMinionDoodle(ctx, 250, 210, 1.4);

  ctx.fillStyle = palette.accent;
  ctx.font = "bold 20px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(palette.label, 250, 40);

  ctx.fillStyle = "#1C3357";
  ctx.font = "bold 26px 'Segoe UI', sans-serif";
  wrapText(ctx, '"' + caption + '"', 250, 400, 420, 32);

  return canvas;
}
