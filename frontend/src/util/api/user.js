const URL = process.env.REACT_APP_BASE_URL

export const getUser = async (token) => {
    let res = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
    })
    return res.status === 200 ? await res.json(): null
}


export const deleteUser = async (token) => {
    let res = await fetch(`${URL}/user`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json',
            "Authorization": "Bearer " + token,
        },
    })
    return res.status === 200
}