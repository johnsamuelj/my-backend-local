const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const zlib = require('zlib');
const compression = require("compression");

const compressionMiddleware = require("./decompression-middleware.js");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(compression())
app.use(cors());
app.use(compressionMiddleware)

// Example POST endpoint
app.post('/api/data', (req, res) => {
  console.log("data received")
  res.send(req.body)
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
