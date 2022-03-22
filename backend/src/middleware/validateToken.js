import jwtUtil from './../utils/jwt'

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
            req.user_session = {...userInfo._doc}
            next()
        }).catch(err => {
            
            res.status(403).json({
                message: "Not Valid Token"
            })
        })
    }
}

export default jwtCheck;