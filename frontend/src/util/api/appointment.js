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