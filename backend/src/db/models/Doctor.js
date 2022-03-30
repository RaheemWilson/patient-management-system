const { Schema } = require("mongoose");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const DoctorSchema = new Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    telephone: {
        type: String,
        default: "xxx-xxxx"
    },
    doctorId: {
        type: String,
        required: true
    }
})


// Prehook to Hash and Salt Password before saving
DoctorSchema.pre("save", async function () {
    // Create the password hash
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
    }
});

const Doctor = mongoose.model("doctors", DoctorSchema)

module.exports = Doctor;