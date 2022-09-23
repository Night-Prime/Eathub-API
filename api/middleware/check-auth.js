const jwt = require('jsonwebtoken');

/*  A middleware express pattern
    Function created to attach certain routes */

module.exports = (res, req, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded =jwt.verify(token, process.env.JWT_KEY);
        req.clientData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth Failed',
            error: err
        })
    }
};
