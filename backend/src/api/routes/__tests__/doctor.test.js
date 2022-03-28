/* eslint-disable no-undef */
import app from '../../../app'
import mongoose from "mongoose";
import supertest from "supertest";
import { generatePatientData } from "../../../../tests/generate";

let patientAuth = {}

beforeAll(async () => {
    let patient = generatePatientData()

    await supertest(app).post(
        '/auth/patient/create'
      ).send(
        {
          ...patient
        }
      )

    const patientRes = await supertest(app)
        .post("/auth/patient/login")
        .send(
            {
                ...patient
            }
        )
    
    patientAuth.token = patientRes.body.authToken
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let connection of collections) {
    await connection.deleteMany({});
  }
  mongoose.connection.close()
});

describe('TEST /doctors', () => {
  
    it('The GET /doctors route shoukd return all the doctors in the system', async () => {
        const response = await supertest(app)
            .get('/doctors')
            .set("authorization", "Bearer " + patientAuth.token);
        expect(response.statusCode).toBe(200);
        expect(response.body.doctors.length).toEqual(0);
    });
});

