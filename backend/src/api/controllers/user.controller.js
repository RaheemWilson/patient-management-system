import Auth from "../../db/models/Auth"
import Doctor from "../../db/models/Doctor"
import Patient from "../../db/models/Patient"

/**
 * Get user in the system
 * @param {*} req 
 * @param {*} res 
 */
 export const getUser = async (req, res) => {
    try {
        let id = req.user_session._id
        let type = req.user_session.userType

        if(type === "doctor"){
            Doctor.findById(id, (err, doc) => {
                if(err){
                    res.status(400).json({ message : err})
                }
                res.status(200).json({ user: doc, userType: "doctor" })
            })

        } else {
            Patient.findById(id, (err, doc) => {
                if(err){
                    res.status(400).json({ message : err})
                }
                res.status(200).json({ user: doc, userType: "patient" })
            })
        }


    } catch (error) {
        res.status(500).json({ message: error})
    }
}

/**
 * Delete user session in the system
 * @param {*} req 
 * @param {*} res 
 */
 export const deleteUser = async (req, res) => {
    try {
        let id = req.user_session._id
        Auth.findOneAndDelete({ user: id }, (err, doc) => {
            if(err){
                res.status(400).json({ message: err })
            } else if(doc){
                res.status(200).json({ message: "Deleted successfully"})
            } else {
                res.status(404).json({ message: "User not found"})
            }
        })

    } catch (error) {
        res.status(500).json({ message: error})
    }
}