import Appointment from "../../../db/models/Appointment"


export const createAppointment = (req, res) => {
    try {
        let patientId = req.user_session.id

        let { doctor, dateTime, reason } = req.body

        await Appointment.create({ patient: patientId, doctor, dateTime, reason })

        res.status(201).json({ message: "Created sucessfully" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}