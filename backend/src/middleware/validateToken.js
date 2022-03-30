/* eslint-disable no-unused-vars */
const { Auth } = require('../db/models/Auth.js');
const jwtUtil = require('./../utils/jwt.js')

/**
 * This function is used to check if a jwt is valid (if send) as well as decode it
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const jwtCheck = (req, res, next) => {
    
    if (!req.headers.authorization)
        res.status(401).json({ message: "No User Token Found In Request" })
    else {
        
        const authHeader = req.headers.authorization; 
        const authToken = authHeader.split(" ")[1];
        jwtUtil.isTokenValid(authToken).then((userInfo) => {
            Auth.exists({ user: userInfo._id, token: authToken}, (err, doc) => {
                if(err){
                    res.status(400).json({ message: "Bad request"})
                } 
                else if(doc){
                    req.user_session = {...userInfo}
                    next()
                } else {
                    res.status(403).json({ message: "session not found"})
                }
            })
        }).catch(() => {
            
            res.status(403).json({
                message: "Not Valid Token"
            })
        })
    }
}

module.exports = jwtCheck;