/* eslint-disable no-undef */
const { default: Patient } = require("../../db/models/Patient.js")

/**
 * Updates Patient's profile details
 * @param {*} req 
 * @param {*} res 
 * @returns Update profile information
 */
exports.updateProfile = (req, res) => {

    try {
        let userId = req.params.id
        let updatedDetails = req.body

        updatedDetails.isUpdated = true
    
        Patient.findByIdAndUpdate(userId, {$set: updatedDetails}, { new: true}, (err, doc) => {
            if(err){
                res.status(400).json({ message: err })
            } else if(doc) {
                res.status(200).json({ user: doc })
            } else{
                res.status(404).json({ message: "Not updated"})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


/**
 * Deletes patient accounts 
 * @param {*} req 
 * @param {*} res 
 * @returns Successfully deleted message
 */
exports.deleteAccount = (req, res) => {
    try {
        let id = req.params.id

        Patient.findByIdAndDelete(id, (err, doc) => {
            if(err){
                res.status(400).json({ message: err })
            } else if(doc){
                res.status(200).json({ message: "Deleted successfully"})
            } else {
                res.status(404).json({ message: "User not found"})
            }
        })

    } catch (error) {
        return res.status(500).json({message: error})
    }
}