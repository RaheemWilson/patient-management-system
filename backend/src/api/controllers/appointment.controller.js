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

export const getAppointments = async (req, res) => {
    try {
        let id = req.user_session._id

        Appointment.find({ patient: id }, (err, doc) => {
            if(err){
                res.status(400).json({ message : err})
            }

            res.status(200).json({ appointments: doc })
        })


    } catch (error) {
        res.status(500).json({ message: error})
    }
}