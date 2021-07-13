const api = {
    'http://localhost:8081': 'http://localhost:5000', //本地指向后端
    'http://10.138.123.33:8080': 'http://10.138.123.33:5000', //本地指向后端

}

export const baseUrl = api[window.location.origin]