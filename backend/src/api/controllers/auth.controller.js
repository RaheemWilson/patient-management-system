import { compare } from "bcrypt"
import Doctor from "../../db/models/Doctor"
const jwtUtil = require('../../utils/jwt')
const { default: Patient } = require("../../db/models/Patient")


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
                res.status(409).json({ message: "Patient already in the system"})
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
        const token = jwtUtil.createToken({ _id: user._id, userType: "patient"})
        res.status(200).json({ user: user, authToken: token, userType: "patient" })

    } catch (error) {
        res.sendStatus(500);
    }
}

/**
 * Creates a Doctor's Account
 * @param {*} req 
 * @param {*} res 
 */
export const createDoctor = (req, res) => {
    
    try {
        let {
            firstName,
            lastName,
            email,
            password,
            telephone,
        } = req.body
        
        let length = 1
        let randomId = 0
        while(length > 0){
            randomId = Math.floor(1000000 + Math.random() * 9000000);
            length = Doctor.find({ doctorId: randomId })
        }  
        
        Doctor.exists({ email }, async (err, exist) => {
            if(exist){
                res.status(409).json({ message: "Doctor already in the system"})
            }
            else if(err){
                res.status(400).json({ message: err})
            }else{
                
                await Doctor.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    telephone,
                    doctorId: randomId
                })
                
                res.status(201).json({ message: "Created sucessfully", doctorId: randomId })
            }
        })
    } catch (error) {
        res.sendStatus(500);
    }
}


/**
 * Authenticate login credentials for doctors
 * @param {*} req 
 * @param {*} res 
 * @returns Doctors details
 */
export const loginDoctor = async (req, res) => {

    try {
        let { doctorId, password } = req.body;

        const user = await Doctor.findOne({ doctorId: doctorId });
        if (!user) {
            return res.status(400).json({
                message: "No user exists with the id entered",
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
        const token = jwtUtil.createToken({ _id: user._id, userType: "doctor"})
        res.status(200).json({ user: user, authToken: token, userType: "doctor" })

    } catch (error) {
        res.sendStatus(500);
    }
}