const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use('/api', express.static(path.join(__dirname, 'src/api')));
app.listen(PORT);
console.log(`API server running at http://localhost:${PORT}`);