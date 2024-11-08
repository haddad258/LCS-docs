const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('./paypalConfig'); // Import PayPal client

// Create an order (payment request)
async function createOrder(req, res) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '100.00', // Example amount
        },
      },
    ],
  });

  try {
    const order = await client().execute(request);
    res.json({
      id: order.result.id, // Send back the order ID to the frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
}
// Capture the order
async function captureOrder(req, res) {
    const { orderID } = req.body; // Get orderID from the frontend
  
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
  
    try {
      const capture = await client().execute(request);
      res.json({
        status: capture.result.status, // Payment status
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error capturing order');
    }
  }

module.exports = {
  createOrder,
  captureOrder
};
