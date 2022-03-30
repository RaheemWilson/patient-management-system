const { Schema } = require("mongoose");
const mongoose = require("mongoose")
import bcrypt from "bcrypt";

const PatientSchema = new Schema({
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
    ip_address: {
        type: String,
        requred: true,
    },
    address:{
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    commordities: {
        type: String,
        default: "Not applicable"
    },
    telephone: {
        type: String,
        default: "xxx-xxxx"
    },
    age:{
        type: Number,
        default: 0
    },
    height:{
        type: Number,
        default: 0
    },
    weight:{
        type: Number,
        default: 0
    },
    isUpdated:{
        type: Boolean,
        default: false
    }
})

// Prehook to Hash and Salt Password before saving
PatientSchema.pre("save", async function () {
    // Create the password hash
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
    }
  });

const Patient = mongoose.model("patients", PatientSchema)

export default Patient;