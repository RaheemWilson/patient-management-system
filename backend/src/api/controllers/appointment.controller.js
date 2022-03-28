import Appointment from "../../db/models/Appointment"

/**
 * Creates an appointment
 * @param {*} req 
 * @param {*} res 
 */
export const createAppointment = async (req, res) => {
    try {
        let patientId = req.user_session._id

        let { dateTime, doctor, reason } = req.body

        let parsedDate = Date.parse(dateTime)

        await Appointment.create({ patient: patientId, doctor: doctor, dateTime: parsedDate, reason })
        
        res.status(201).json({ message: "Created sucessfully" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

/**
 * Get appointments for a patient
 * @param {*} req 
 * @param {*} res 
 */
export const getAppointments = async (req, res) => {
    try {
        let id = req.user_session._id
        let user = req.user_session.userType
        if(user === "patient"){
            Appointment.find({ patient: id }).populate(
                 {
                     path: "doctor",
                     select: "firstName lastName email _id"
                 }
             ).exec((err, appointment) => {
                 if(err){
                    res.status(400).json({ message: err})
                 }
                 res.status(200).json({ appointments: appointment })
             })
        }else{
            Appointment.find({ doctor: id }).populate(
                {
                    path: "patient",
                    select: "firstName lastName email _id height weight commordities age gender telephone"
                }
            ).exec((err, appointment) => {
                if(err){
                    res.status(400).json({ message: err})
                }
                res.status(200).json({ appointments: appointment })
            })
        }

        

    } catch (error) {
        res.status(500).json({ message: error})
    }
}


export const updateAppointment = (req, res) => {
    try {
        let appointmentId = req.params.id
        let id = req.user_session._id

        Appointment.findOneAndUpdate({ doctor: id, _id: appointmentId }, { $set : { isApproved: Boolean(req.body.isApproved) }}, 
            (err) =>{
                if(err){
                    res.status(400).json({ message: err})
                }
                res.status(200).json({ message : "Updated successfully"})
            })

    } catch (error) {
        res.status(500).json({ message: error})
    }
}