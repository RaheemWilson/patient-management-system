const URL = process.env.REACT_APP_BASE_URL

export const createAppointment = async (data, token) => {
    let res = await fetch(`${URL}/patient/appointment`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(data)
    })
    
    return res.status === 201 ? await res.json(): null
}

export const getAppointments = async (token) => {
    let res = await fetch(`${URL}/patient/appointments`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
    })
    return res.status === 200 ? await res.json(): null
}

export const updateAppointment = async (token, isApproved, id) => {
    let res = await fetch(`${URL}/patient/appointment/${id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ isApproved: isApproved })
    })
    // console.log(await res.json())
    // return null
    return res.status === 200 ? await res.json(): null
}

