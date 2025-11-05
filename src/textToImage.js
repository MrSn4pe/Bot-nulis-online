let bg, font;
let txtDate = '', txtName = '', txtClass = '', txtFaculty = '', txtContent = '';

function preload() {
  // Gambar background (garis buku)
  bg = loadImage('/img/folio.jpg');
  font = loadFont('/fonts/HandwritingCR-2.ttf');
}

function setup() {
  createCanvas(800, 1120); // 
  textFont(font);
  textSize(18);
  noLoop();
}

function draw() {
  background(bg); // 
  fill(0);

  // Margin
  const leftMargin = 60;
  const topMargin = 120;
  const lineHeight = 28;
  const textWidthLimit = 650;

  // Header info
  text(txtName, leftMargin, topMargin);
  text(txtDate, width - 250, topMargin);
  text(txtClass, leftMargin, topMargin + lineHeight);
  text(txtFaculty, leftMargin, topMargin + lineHeight * 2);

  // Isi teks
  const words = txtContent.split(' ');
  let x = leftMargin;
  let y = topMargin + lineHeight * 4;

  words.forEach(word => {
    const wordWidth = textWidth(word + ' ');
    if (x + wordWidth > leftMargin + textWidthLimit) {
      x = leftMargin;
      y += lineHeight;
    }

    // Jika teks melewati batas bawah → buat halaman baru
    if (y > height - 100) {
      saveCanvas(`halaman-${frameCount}.png`);
      clear();
      background(bg);
      fill(0);
      x = leftMargin;
      y = topMargin;
    }

    text(word, x, y);
    x += wordWidth;
  });
}

function generateImage() {
  redraw();
}

function downloadCanvas() {
  saveCanvas('hasil', 'png');
}
