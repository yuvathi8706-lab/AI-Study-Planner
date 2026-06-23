const jwt = require("jsonwebtoken");

const protect = (req,res,next) => {
    try{
        console.log("Middleware hit");
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.json.status(401).json({
                message:"No token"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch(error){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = protect;