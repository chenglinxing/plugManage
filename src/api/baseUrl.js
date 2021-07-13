const api = {
    'http://localhost:8080': 'http://localhost:5000', //本地指向后端
}

export const baseUrl = api[window.location.origin]