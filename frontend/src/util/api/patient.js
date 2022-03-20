const URL = process.env.REACT_APP_BASE_URL

export const createPatient = async (data) => {
    let {
        firstName, 
        lastName,
        email,
        password,
    } = data

    let res = await fetch(`${URL}/auth/patient/create`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({firstName: firstName, lastName: lastName, email:email, password:password})
    })
    return res.status === 201
}

export const loginPatient = async (data) => {

    let { email, password } = data

    let res = await fetch(`${URL}/auth/patient/login`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
    return res.status === 200 ? await res.json() : null
}

export const updateProfile = async (data, token) => {
    let res = await fetch(`${URL}/patient/update`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(data)
    })
    return res.status === 200 ? await res.json() : null
}