/* eslint-disable no-undef */
import app from '../../../app.js'
import mongoose from "mongoose";
import supertest from "supertest";
import { generateDoctorData, generatePatientData } from '../../../../tests/generate.js';

let patientAuth = {}
let doctorAuth = {}
let patient = generatePatientData()
let doctor = generateDoctorData()

beforeAll(async () => {

    await supertest(app).post('/auth/patient/create').send({...patient})
    const res = await supertest(app).post('/auth/doctor/create').send({...doctor})

    doctorAuth.doctorId = res.body.doctorId

    const patientRes = await supertest(app)
        .post("/auth/patient/login")
        .send({...patient})

    const doctorRes = await supertest(app)
        .post("/auth/doctor/login")
        .send({
            doctorId: doctorAuth.doctorId,
            password: doctor.password
        })

    doctorAuth.token = doctorRes.body.authToken
    doctorAuth.id = doctorRes.body.user._id

    patientAuth.token = patientRes.body.authToken
    patientAuth.id = patientRes.body.user._id
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let connection of collections) {
    await connection.deleteMany({});
  }
  mongoose.connection.close()
});

describe('TEST /user', () => {
  
    it('The GET / route should return user details for a patient', async () => {
        const response = await supertest(app)
            .get('/user')
            .set("authorization", "Bearer " + patientAuth.token);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.user.email).toBe(patient.email)
        expect(response.body.userType).toBe("patient");
    });

    it('The GET / route should return user details for a doctor', async () => {
        const response = await supertest(app)
            .get('/user')
            .set("authorization", "Bearer " + doctorAuth.token);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.user.email).toBe(doctor.email)
        expect(response.body.user.telephone).toBe(doctor.telephone)
        expect(response.body.userType).toBe("doctor");
    });


    it('The DELETE /user route should delete patient details from Auth', async () => {
        const response = await supertest(app)
            .delete(`/user`)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Deleted successfully"});
    });

    it('The DELETE /user route should return error', async () => {
        const response = await supertest(app)
            .delete(`/user`)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual({ message: "session not found"});
    });

    it('The DELETE /user route should delete doctor details from Auth', async () => {
        const response = await supertest(app)
            .delete(`/user`)
            .set("authorization", "Bearer " + doctorAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Deleted successfully"});
    });

    it('The DELETE /user route should return error', async () => {
        const response = await supertest(app)
            .delete(`/user`)
            .set("authorization", "Bearer " + doctorAuth.token);
        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual({ message: "session not found"});
    });


});