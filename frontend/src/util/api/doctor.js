const URL = process.env.REACT_APP_BASE_URL

export const createDoctor = async (data) => {

    let res = await fetch(`${URL}/auth/doctor/create`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return res.status === 201 ? await res.json() : null
}

export const loginDoctor = async (data) => {

    let { doctorId, password } = data

    let res = await fetch(`${URL}/auth/doctor/login`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ doctorId: doctorId, password: password })
    })
    return res.status === 200 ? await res.json() : null
}

export const getDoctors = async (token) => {
    let res = await fetch(`${URL}/doctors`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
    })
    
    return res.status === 200 ? await res.json(): null
}
