/* eslint-disable no-undef */
import app from '../../../app'
import mongoose from "mongoose";
import supertest from "supertest";
import { generateDoctorData, generatePatientData } from "../../../../tests/generate";

let patientAuth = {}
let doctorAuth = {}
let appointment = null
let appointments = []
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

    patient = patientRes.body.user
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

describe('TEST /patient', () => {
  
    it('The POST /patient/appointment route should create an appointment', async () => {
        const response = await supertest(app)
            .post('/patient/appointment')
            .send({
                doctor: doctorAuth.id,
                reason: "I am sick and need help",
                dateTime: "2022-03-28T22:42"
            })
            .set("authorization", "Bearer " + patientAuth.token);
        
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Created sucessfully");
    });

    it('The POST /patient/appointment route should not create an appointment', async () => {
        const response = await supertest(app)
            .post('/patient/appointment')
            .send({
                doctor: doctorAuth.id,
                reason: "I am sick and need help",
                dateTime: "2022-03-28T22:42"
            })
        
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBeTruthy();
    });

    it('The GET /patient/appointments route should get appointments from a patient', async () => {
        const response = await supertest(app)
            .get('/patient/appointments')
            .set("authorization", "Bearer " + patientAuth.token);
        
        appointment = {...response.body.appointments[0]}
        appointments = [...response.body.appointments]
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.length).toBe(appointments.length);
    });

    it('The GET /patient/appointments route should get appointments from a doctor', async () => {
        const response = await supertest(app)
            .get('/patient/appointments')
            .set("authorization", "Bearer " + doctorAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.appointments.length).toBe(appointments.length);
    });

    it('The PATCH /patient/appointment/:id route should get appointments from a doctor', async () => {
        const response = await supertest(app)
            .patch(`/patient/appointment/${appointment._id}`)
            .send({
                isApproved: "true"
            })
            .set("authorization", "Bearer " + doctorAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Updated successfully");
    });

    it('The PATCH /patient/appointment/:id route should not get appointments from a doctor', async () => {
        const response = await supertest(app)
            .patch(`/patient/appointment/${appointment._id}`)
            .send({
                isApproved: "true"
            })

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBeTruthy();
    });

    it('The PUT /patient/update/:id route should update patients record', async () => {
        let { firstName, lastName, email, telephone } = patient
        let patientTest = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            age: 12,
            height: 120,
            weight: 130
        }

        const response = await supertest(app)
            .put(`/patient/update/${patientAuth.id}`)
            .send(patientTest)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.user.isUpdated).toBeTruthy();
        expect(response.body.user.age).toEqual(12)
    });

    it('The PUT /patient/update/:id route should not update patients record', async () => {
        let { firstName, lastName, email, telephone } = patient
        let patientTest = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
            age: 12,
            height: 120,
            weight: 130
        }

        const response = await supertest(app)
            .put(`/patient/update/${patientAuth.id}0`)
            .send(patientTest)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    it('The DELETE /patient/:id route should delete patients record', async () => {
        const response = await supertest(app)
            .delete(`/patient/${patientAuth.id}`)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Deleted successfully");
    });

    it('The DELETE /patient/:id route should not find patients record', async () => {
        const response = await supertest(app)
            .delete(`/patient/${patientAuth.id}`)
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("User not found");
    });


});