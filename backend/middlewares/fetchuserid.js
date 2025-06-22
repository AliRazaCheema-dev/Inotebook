var jwt = require('jsonwebtoken');
const JWT_Secret = "Cheemamerijan" ;

const fetchuser = (req, res, next)=>{
    //Get user from authtoken and add id to req object
    const token = req.header("auth-token");
    if (!token){
        return res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
   
}
module.exports= fetchuser;