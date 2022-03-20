const { default: Patient } = require("../../../db/models/Patient")

export const updateProfile = (req, res) => {

    try {
        let userId = req.user_session._id
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
       return res.status(500).json({message: error.message}).end()
    }
}