// Define pdfjsLib
// Use legacy build with Node.js
// import "pdfjs-dist/build/pdf.mjs";
import "pdfjs-dist/legacy/build/pdf.mjs";

// The workerSrc property shall be specified
// import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?worker&url";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.mjs?worker&url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

async function watermark(){
  var fileInput = document.getElementById("file");
  var [file] = fileInput.files;
  if (file) {
    if (file.type === "application/pdf") {

      // Read PDF file
      var arrayBuffer = await file.arrayBuffer();
      var pdfDocument = await pdfjsLib.getDocument(arrayBuffer).promise;

      // TODO
      // Render the first page in a canvas
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var page = await pdfDocument.getPage(1);

      var scale = 1;
      var viewport = await page.getViewport({scale: scale});

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      
      // Add a watermark
      context.rotate(-0.2 * Math.PI);
      context.fillStyle = "rgb(200 0 0 / 40%)";
      context.font = "24px Arial";

      var mark = document.getElementById('mark').value.concat("     ").repeat(10);
      var step = 100;

      for (let i = 1; i * step / 2 < canvas.height; i++) {
        context.fillText(mark, -100 * i, 100 * i);
      }

    }
  }
}

// Exports
globalThis.watermark = watermark;

