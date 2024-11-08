const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal environment
function environment() {
  return new paypal.core.SandboxEnvironment(
    'AfJfADCwKHeU4zX33VpsWl-6ss7_8Splslme3qucCLwOjyaDc01pqZN5lPqicJCNB_nnDeH1l8ZmgHBC', // Replace with your PayPal Client ID
    'ECV-7qv2BH6PdyY3MGyfX6or5pSK8YkrE725erT8lAdW8ujB1FEAXR6g1CY-jmzxSqSWhf3J9Wuduow-' // Replace with your PayPal Secret
  );
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = {
  client,
};
