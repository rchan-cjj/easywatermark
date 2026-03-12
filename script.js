// Define pdfjsLib
// Use legacy build with Node.js
import "pdfjs-dist/legacy/build/pdf.mjs";

// The workerSrc property shall be specified
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.mjs?worker&url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

import { jsPDF } from "jspdf";

async function watermarkPage(page, context) {
  var viewport = await page.getViewport({scale: 1});

  canvas.width = viewport.width;
  canvas.height = viewport.height;
  canvas.style.width = viewport.width + "px";
  canvas.style.height =  viewport.height + "px";

  var renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;
  
  // Add a watermark
  context.rotate(-0.2 * Math.PI);
  context.fillStyle = "rgb(200 0 0 / 40%)";
  context.font = "24px Arial";

  var mark = document.getElementById('mark').value.concat("     ").repeat(20);
  var step = 100;

  for (let i = 1; i * step / 2 < canvas.height; i++) {
    context.fillText(mark, -100 * i, 100 * i);
  }

}

async function watermark(){
  var fileInput = document.getElementById("file");
  var [file] = fileInput.files;
  if (file) {
    if (file.type === "application/pdf") {

      // Read PDF file
      var arrayBuffer = await file.arrayBuffer();
      var pdfDocument = await pdfjsLib.getDocument(arrayBuffer).promise;

      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      // Init marked PDF file
      var pdfOptions = {
        unit: 'px',
        putOnlyUsedFonts:true
      } 
      var markedPdfDocument = new jsPDF(pdfOptions);
      markedPdfDocument.deletePage(1);

      // Process each page
      for (let i = 1; i <= pdfDocument.numPages ; i++) {
        var page = await pdfDocument.getPage(i);
        await watermarkPage(page, context);

        // Bypass orientation issues
        if (canvas.width < canvas.height) {
          markedPdfDocument.addPage([canvas.width, canvas.height], "portrait");
        } else {
          markedPdfDocument.addPage([canvas.height, canvas.width], "landscape");
        }

        // Resize canvas to fit page size
        markedPdfDocument.addImage(canvas,
          0, 0,
          markedPdfDocument.getPageWidth(),
          markedPdfDocument.getPageHeight()
        );
      }

      // The file name is prefixed with "C:\fakepath\"
      var fileName = fileInput.value.slice(12, -4);
      markedPdfDocument.save(fileName + '_watermarked.pdf');

      // Clean up
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

// Exports
globalThis.watermark = watermark;

