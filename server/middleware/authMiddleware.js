const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.authorization;
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verifiedToken.userId;
        next();
    } catch(e) {
        console.log(e);
        res.status(401).json({success: false, message: "Invalid token"});
    }
};

module.exports = auth;