const jwt = require('jsonwebtoken')
const config = require('../auth.config')

checkToken = (req, res, next) => {
    const token = req.body.token

    if(!token){
        return res.status(400).send({message: "No Token Sent!"})
    }
    jwt.verify(token, config.secret, (err, decoded) =>{
        if(err){
            return res.status(401).send({message: "Unauthorized!"})
        }
        req.user_id = decoded.user_id;
        next();
    })
}

const authJwt = {
    checkToken: checkToken,
}

module.exports = authJwt