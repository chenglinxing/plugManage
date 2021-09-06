const api = {
    'http://localhost:8080': 'http://localhost:5000', //本地指向后端
	'http://47.100.93.30:5000':'http://47.100.93.30:5000',
	'http://localhost:8080': 'http://47.100.93.30:5000',
}

export const baseUrl = api[window.location.origin]