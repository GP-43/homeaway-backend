const dotenv = require('dotenv');
dotenv.config();

const validateToken = (req, res, next) => {
//  extratc"
    // validate
    const secret = process.env.JWT_SECRET;
if(tokenvalid){
    next();
    
}else{
    return res.status(401).send("Ïnvalid token");
}
}