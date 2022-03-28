/* eslint-disable no-undef */
import app from '../../../app'
import mongoose from "mongoose";
import supertest from "supertest";
import { generateDoctorsData, generatePatientsData } from "../../../../tests/generate";

let patients = []
let doctors = []

beforeAll((done) => {
  patients = [...generatePatientsData(3)]
  doctors = [...generateDoctorsData(3)]
  done()
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let connection of collections) {
    await connection.deleteMany({});
  }
  mongoose.connection.close()
});


describe('TEST /auth/patient', () => {
  
  it('The POST /patient/create - patient should be created', async () => {
    const response = await supertest(app).post(
      '/auth/patient/create'
    ).send(
      {
        ...patients[0]
      }
    )
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Created sucessfully");
  });

  it('The POST /patient/create route - patient should be in the system', async () => {
    const response = await supertest(app).post(
      '/auth/patient/create'
    ).send(
      {
        ...patients[0]
      }
    )
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Patient already in the system");
  });

  it('The POST /patient/login route - patient should be authenticated', async () => {
    const response = await supertest(app).post(
      '/auth/patient/login'
    ).send(
      {
        email: patients[0].email,
        password: patients[0].password
      }
    )
    expect(response.statusCode).toBe(200);
    expect(response.body.authToken).toBeTruthy();
    expect(response.body.userType).toBe("patient")
  });

  it('The POST /patient/login route - patient should be not authenticated', async () => {
    const response = await supertest(app).post(
      '/auth/patient/login'
    ).send(
      {
        email: patients[0].email,
        password: patients[0].password + "Qudh20"
      }
    )
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid Password");
  });

  it('The POST /patient/login route - patient should be not authenticated', async () => {
    const response = await supertest(app).post(
      '/auth/patient/login'
    ).send(
      {
        email: patients[0].email  + "Qudh20",
        password: patients[0].password
      }
    )
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

});


describe('TEST /auth/doctor', () => {
  // let connection;
  let doctorId = ""

  it('The POST /doctor/create - doctor should be created', async () => {
    const response = await supertest(app).post(
      '/auth/doctor/create'
    ).send(
      {
        ...doctors[0]
      }
    )

    doctorId = response.body?.doctorId
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Created sucessfully");
    expect(response.body.doctorId).toBeTruthy()
  });

  it('The POST /doctor/create route - doctor should be in the system', async () => {
    const response = await supertest(app).post(
      '/auth/doctor/create'
    ).send(
      {
        ...doctors[0]
      }
    )
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Doctor already in the system");
  });

  it('The POST /doctor/login route - doctor should be authenticated', async () => {
    const response = await supertest(app).post(
      '/auth/doctor/login'
    ).send(
      {
        doctorId: doctorId,
        password: doctors[0].password
      }
    )
    expect(response.statusCode).toBe(200);
    expect(response.body.authToken).toBeTruthy();
    expect(response.body.userType).toBe("doctor")
  });

  it('The POST /doctor/login route - doctor should be not authenticated', async () => {
    const response = await supertest(app).post(
      '/auth/doctor/login'
    ).send(
      {
        doctorId: doctorId,
        password: doctors[0].password + "Qudh20"
      }
    )
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid Password");
  });

});