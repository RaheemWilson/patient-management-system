import { compare } from "bcrypt"
const jwtUtil = require('../../../utils/jwt')

const { default: Patient } = require("../../../db/models/Patient")


/**
 * Adds patient to the database
 * @param {*} req 
 * @param {*} res 
 */
export const createPatient = (req, res) => {

    try {
        let {
            firstName,
            lastName,
            email,
            password,
        } = req.body
    
    
        let ip = req.connection?.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0].trim()
    
        Patient.exists({ email }, async (err, exist) => {
            if(exist){
                res.status(409).json({ message: "User already in the system"})
            }
            else if(err){
                res.status(400).json({ message: err})
            }else{
    
                await Patient.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    ip_address: ip
                })
    
                res.status(201).json({ message: "Created sucessfully" })
            }
        })
    } catch (error) {
        res.sendStatus(500);
    }
}


/**
 * Authenticate login credentials for patients
 * @param {*} req 
 * @param {*} res 
 * @returns Patient details
 */
export const loginPatient = async (req, res) => {

    try {
        let { email, password } = req.body;

        const user = await Patient.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "No user exists with the email entered",
            });
        }

        // Check passwords with bcrypt
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }
    
        user.password = undefined
        const token = jwtUtil.createToken({ ...user })
        res.status(200).json({ user: user, authToken: token })

    } catch (error) {
        res.sendStatus(500);
    }
}