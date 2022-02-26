export async function sendRequest(method, url, token, body) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
        body: body,
    })
}

