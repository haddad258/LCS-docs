const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { createOrder, captureOrder } = require('./paymentController'); // Import payment functions

const app = express();

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Create order route
app.post('/create-order', createOrder);

// Capture order route
app.post('/capture-order', captureOrder);

// Route to render the HTML page (Optional, if you want to route to it directly)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(4001, () => {
  console.log('Server running on port 3000');
});
