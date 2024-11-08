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
    const signature = crypto.createHmac('sha256', 'secret-key')
        .update(licenseString)
        .digest('hex');

    // Combine the license string and signature into a single Base64-encoded license key
    const licenseKey = Buffer.from(`${licenseString}.${signature}`).toString('base64');

    return licenseKey;
};

// Function to verify and decrypt a license key
const verifyLicenseKey = (licenseKey) => {
    try {
        // Decode the Base64-encoded license key
        const decodedKey = Buffer.from(licenseKey, 'base64').toString('utf8');

        // Split the license string and the signature
        const [licenseString, signature] = decodedKey.split('.');

        if (!licenseString || !signature) {
            throw new Error('Malformed license key.');
        }

        // Recompute the signature to verify the integrity of the license data
        const expectedSignature = crypto.createHmac('sha256', 'secret-key')
            .update(licenseString)
            .digest('hex');
        // Check if the signature matches
        console.log('Expected Signature:', expectedSignature, 'Type:', typeof expectedSignature);
        console.log('Signature:', signature, 'Type:', typeof signature);
        
        if (signature !== expectedSignature) {
            return { valid: false, reason: 'Invalid signature' };
        }

        // Parse the license data (if the signature is valid)
        const licenseData = JSON.parse(licenseString);

        // Check if the license has expired
        const currentDate = new Date();
        if (currentDate > new Date(licenseData.expiryDate)) {
            return { valid: false, reason: 'License expired' };
        }

        // Return the license data if everything is valid
        return { valid: true, data: licenseData };
    } catch (error) {
        return { valid: false, reason: 'Invalid license key format or error in processing' };
    }
};

// Example usage for two apps
const app1License = generateLicenseKey('App1', '2025-01-01', 10);
const app2License = generateLicenseKey('App2', '2025-01-01', 20);

// console.log('App2 License Key:', app2License);
verifyLicenseKey(app1License)
// verifyLicenseKey(app2License)
// console.log('App1 License Verification:', verifyLicenseKey(app1License));
// console.log('App2 License Verification:', verifyLicenseKey(app2License));
