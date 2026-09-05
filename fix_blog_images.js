const fs = require('fs');
const path = require('path');

const dir = 'g:/1. Clude/03. Mine/2. Krishi Ai';
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// The broken fallback in index.html for blog1: 
// <img src="images/blog1.jpg" onerror="this.src='https://images.unsplash.com/photo-1592982537447-6f23f03b5eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'" ...
// We replace the src directly with working Unsplash images so there are no grey boxes.

indexHtml = indexHtml.replace(
    /src="images\/blog1\.jpg" onerror="[^"]+"/g,
    'src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);

indexHtml = indexHtml.replace(
    /src="images\/blog2\.jpg" onerror="[^"]+"/g,
    'src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);

indexHtml = indexHtml.replace(
    /src="images\/blog3\.jpg" onerror="[^"]+"/g,
    'src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
);

fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');
console.log('Fixed fallback images in index.html');
