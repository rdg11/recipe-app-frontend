import axios from 'axios'

const api = axios.create({
	baseURL: 'https://localhost:5000', // API base URL
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
