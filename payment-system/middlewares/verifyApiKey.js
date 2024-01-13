const jwt = require('jsonwebtoken');
const { secret } = require('../configs/token.js');
const verifyApiKey = async (req, res, next) => {
    const token = req.headers.apikey;
    if (!token) {
        return res.status(401).json({ message: 'missing api key' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Forbidden' });
    }
};

module.exports = verifyApiKey;