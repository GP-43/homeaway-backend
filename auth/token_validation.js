const jwt = require("jsonwebtoken");
module.exports = {
    checkTourist:(req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Invalid Token..."
                    });
                } else {
                    if(decoded.role != 3){
                        return res.json({
                            success: 0,
                            message: "Access Denied! Unauthorized User"
                        });
                    }
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Access Denied! Unauthorized User"
            });
        }
    }
}