const jwt = require('jsonwebtoken');

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        req.user = decoded;

        next();

    }
    catch(err){
        return res.status(500).json({message:"Server Error", error: err.message});
    }

};

module.exports = adminMiddleware;