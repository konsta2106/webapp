// backend/server.js
require('dotenv').config();
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, '../frontend') });
const handle = nextApp.getRequestHandler();

const app = require('./app'); // Your API logic in `app.js`

const PORT = process.env.PORT || 3000;

// Start the Next.js server and then attach it to your existing Express app
nextApp.prepare().then(() => {
  // Serve Next.js pages
  app.get('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
