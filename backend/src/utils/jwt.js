const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET_KEY || "Damn, that's what 19##*@( expected"

//JWT methods to create, decode and validate a token

exports.createToken = (payload) => {
    return jwt.sign(payload,secret, {
        expiresIn: "2d"
    })
}

exports.decodeToken = (token) => {
    return jwt.decode(token)
}

exports.isTokenValid = (token) => {

    return new Promise((resolve,reject)=>{
        jwt.verify(token, secret, function (error,decodedPayload){
            if (error)
                reject(error);
            else 
                var { exp } = decodedPayload

                if(Date.now() >= exp * 1000){
                    reject({ message: "Token invalid"})
                }

                resolve(decodedPayload)
        })
    })
     
}