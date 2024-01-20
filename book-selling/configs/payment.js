const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

module.exports = {
    url: process.env.PAYMENT_API_URL || 'https://localhost:3000',
    apikey: process.env.PAYMENT_API_KEY || "apikey",
    agent,
}