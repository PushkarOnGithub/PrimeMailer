const jwt = require("jsonwebtoken");
const JWT_SECRET = "helloU$er";

const verifyJWT = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if(!token ){
        res.redirect(400, 'http://127.0.0.1:5000/signup')
    }
    try {
        const email = jwt.verify(token, JWT_SECRET);
        req.email = email;
        next(); // calling the function which is after the fetchuser where it is used.
        
    } catch (error) {
        res.status(401).send({error: "Not a valid token"});
    }
}

module.exports = verifyJWT;