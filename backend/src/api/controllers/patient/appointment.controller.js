import Appointment from "../../../db/models/Appointment"


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