const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {

  // ✅ FIX 1: decode URL (handles spaces)
  const decodedUrl = decodeURIComponent(req.url);

  // ✅ FIX 2: remove starting "/"
  const cleanPath = decodedUrl.replace(/^\/+/, '');

  const filePath = path.join(__dirname, cleanPath === '' ? 'index.html' : cleanPath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("❌ Missing:", filePath);
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });

});

server.listen(PORT, () => {
  console.log(`🔥 Running at http://localhost:${PORT}`);
});