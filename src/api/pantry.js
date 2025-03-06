import api from './axiosInstance'

export const fetchPantry = async userId => {
	const response = await api.get(`/get_pantry/${userId}`)
	return response.data
}

// - - test - -

export const testFetchPantry = async userId => {
	const data = wait(1000).then(() => [...INGREDIENTS])
	console.log('fetching user:', userId, "'s pantry.")
	console.log(data)
	return data
}

function wait(duration) {
	return new Promise(resolve => setTimeout(resolve, duration))
}

const INGREDIENTS = [
	{ id: '1', ingredient: 'Tomato paste', amount: '' },
	{ id: '2', ingredient: 'Bananas', amount: '3' },
	{ id: '3', ingredient: 'Ketchup', amount: '' },
	{ id: '4', ingredient: 'Tortillas', amount: '8' },
	{ id: '5', ingredient: 'Ground beef', amount: '2 lbs' },
]
