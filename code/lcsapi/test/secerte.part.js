const crypto = require('crypto');

// Function to generate a license key for an app
const generateLicenseKey = (appId, expiryDate, maxUsers) => {
    const licenseData = {
        appId,
        issueDate: new Date().toISOString(),
        expiryDate,
        maxUsers
    };

    // Convert license data to a string and sign it with a secret key
    const licenseString = JSON.stringify(licenseData);
    const signature = crypto.createHmac('sha256', 'secret-key').update(licenseString).digest('hex');

    // Combine the license string and signature
    const licenseKey = Buffer.from(`${licenseString}.${signature}`).toString('base64');

    return licenseKey;
};

// Example usage for two apps
const app1License = generateLicenseKey('App1', '2025-01-01', 10);
const app2License = generateLicenseKey('App2', '2025-01-01', 20);

console.log('App1 License Key:', app1License);
console.log('App2 License Key:', app2License);