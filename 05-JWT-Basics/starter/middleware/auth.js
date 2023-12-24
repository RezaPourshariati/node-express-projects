const jwt = require('jsonwebtoken');
// const CustomAPIError = require('../errors/custom-error');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new UnauthenticatedError('No Token Provided');
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded); // output: {id: 23, username: 'john', iat: 1624483474, exp: 1627075474}
        const {id, username} = decoded;
        req.user = {id, username}; // we added a new property to the req object name user that includes user info.
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }
};

module.exports = authenticationMiddleware;