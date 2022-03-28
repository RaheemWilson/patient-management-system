/* eslint-disable no-unused-vars */
import { faker } from '@faker-js/faker'

export const generateDoctorData = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        telephone: faker.phone.phoneNumber(),
        password: faker.internet.password()
    }
}

export function generateDoctorsData({n = 1}) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generateDoctorData()
    });
}


export const generatePatientData = () => {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

export function generatePatientsData({n = 1}) {
    return Array.from({
      length: n
    }, (_, i) => {
      return generatePatientData()
    });
}

