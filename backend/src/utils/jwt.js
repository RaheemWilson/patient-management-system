import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_KEY || "Damn, that's what 19##*@( expected"

//JWT methods to create, decode and validate a token

exports.createToken = (payload) => {
    return jwt.sign(payload,secret)
}

exports.decodeToken = (token) => {
    return jwt.decode(token)
}

exports.isTokenValid = (token) => {

    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,function (error,decodedPayload){
            if (error)
                reject(error);
            else 
                resolve(decodedPayload)
        })
    })
     
}