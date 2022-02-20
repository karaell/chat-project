export async function sendRequest(method, url, token, body/* , onError, onSuccess */) {
    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
}



