import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FileModel from '../models/FileModel.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const {
      signature,
      x,
      y,
      fontSize,
      fontStyle,
      color,
      page,
      fileId,
    } = req.body;

    const pageIndex = parseInt(page, 10);
    const xPos = parseFloat(x);
    const yPos = parseFloat(y);
    const size = parseFloat(fontSize);

    if (isNaN(pageIndex) || isNaN(xPos) || isNaN(yPos) || isNaN(size)) {
      throw new Error("Invalid signature position, font size, or page number.");
    }

    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    if (pageIndex < 0 || pageIndex >= pages.length) {
      throw new Error(`Invalid page index: ${pageIndex}`);
    }

    const targetPage = pages[pageIndex];

    let font;
    switch (fontStyle) {
      case 'Courier':
        font = await pdfDoc.embedFont(StandardFonts.Courier);
        break;
      case 'Times-Roman':
        font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        break;
      case 'Helvetica':
      default:
        font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        break;
    }

    const { r, g, b } = hexToRgb(color);

    const adjustedY = targetPage.getHeight() - yPos - size;
    const safeX = Math.max(0, Math.min(xPos, targetPage.getWidth() - 5));
    const safeY = Math.max(0, Math.min(adjustedY, targetPage.getHeight() - 5));

    targetPage.drawText(signature, {
      x: safeX,
      y: safeY,
      size,
      font,
      color: rgb(r, g, b),
    });

    const signedPdfBytes = await pdfDoc.save();

    // ✅ Update status to 'Signed'
    if (fileId) {
      await FileModel.findByIdAndUpdate(fileId, { status: 'Signed' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="signed-document.pdf"');
    res.send(Buffer.from(signedPdfBytes));

    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error('❌ Error embedding signature:', err);
    res.status(500).json({ message: 'PDF signing failed', error: err.message });
  }
});

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

export default router;
