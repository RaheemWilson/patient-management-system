const { Schema } = require("mongoose");
const mongoose = require("mongoose")

const AppointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "patients",
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
        required: true
    },
    dateTime: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: null
    }
})

const Appointment = mongoose.model("appointments", AppointmentSchema)

export default Appointment;