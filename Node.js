const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(fileUpload());

let uploadedTransactions = []; // Store uploaded transactions

// Endpoint to handle screenshot upload
app.post('/upload', (req, res) => {
  const { name } = req.body;
  const screenshot = req.files.screenshot;
  const ip = req.ip; // Capture IP address

  // Save the screenshot and transaction info
  screenshot.mv(path.join(__dirname, 'uploads', screenshot.name), (err) => {
    if (err) return res.status(500).send(err);

    uploadedTransactions.push({ name, screenshot: screenshot.name, ipAddress: ip });
    res.send('Transaction uploaded successfully.');
  });
});

// Endpoint to get uploaded transactions
app.get('/admin/transactions', (req, res) => {
  res.json(uploadedTransactions);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
