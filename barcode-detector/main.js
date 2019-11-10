window.addEventListener('load', async () => {
  // Check if Barcode Detection API is supported
  const supported = await (async () => 'FaceDetector' in window &&
      await new BarcodeDetector().detect(document.createElement('canvas'))
      .then(_ => true)
      .catch(e => e.name === 'NotSupportedError' ? false : true))();  
  if (!supported) {
    return alert('Barcode Detection API not supported');    
  }
  
  if ('getSupportedFormats' in BarcodeDetector) {
    document.querySelector('pre').textContent =
        `Supported formats:\n${(await BarcodeDetector.getSupportedFormats()).join(', ')}`;
  }
  
  // Get all relevant images
  document.querySelectorAll('img').forEach(async (img) => {
    try {
      // Detect barcodes
      const barcodes = await new BarcodeDetector().detect(img);      
      // Create face bounding box
      barcodes.forEach(barcode => {        
        console.log(barcode);
        const div = document.createElement('div');
        div.classList.add('bounding-box');
        const box = barcode.boundingBox;
        div.style.top = `${box.top}px`;
        div.style.left = `${box.left}px`;
        div.style.width = `${box.width}px`;
        div.style.height = `${box.height}px`;
        div.textContent = barcode.rawValue;
        img.before(div);        
      });
    } catch(e) {
      console.error(e);
    }
  });  
});
