import api from './axiosInstance'

export const fetchPantry = async userId => {
	const response = await api.get(`/get_pantry/${userId}`)
	return response.data
}

export const updatePantry = async (userId, changes) => {
  const { addedIngredients, updatedIngredients, deletedIngredients } = changes;
  const response = await api.patch(`/update_pantry/${userId}`, {
    addedIngredients,
    updatedIngredients,
    deletedIngredients
  });
  return response.data;
};

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
	{ id: '1', ingredient: 'Tomato paste', quantity: '', unit: '' },
	{ id: '2', ingredient: 'Bananas', quantity: '3', unit: '' },
	{ id: '3', ingredient: 'Ketchup', quantity: '', unit: '' },
	{ id: '4', ingredient: 'Tortillas', quantity: '8', unit: '' },
	{ id: '5', ingredient: 'Ground beef', quantity: '2', unit: 'lbs' },
]
