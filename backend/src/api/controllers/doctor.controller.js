import Doctor from "../../db/models/Doctor.js"

/**
 * Get doctors in the system
 * @param {*} req 
 * @param {*} res 
 */
 export const getDoctors = async (req, res) => {
    try {

        Doctor.find({}, (err, doc) => {
            if(err){
                res.status(400).json({ message : err})
            }

            res.status(200).json({ doctors: doc })
        })


    } catch (error) {
        res.status(500).json({ message: error})
    }
}