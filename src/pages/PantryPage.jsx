import React, { useState, useEffect, useRef } from 'react';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import axios from 'axios';

function PantryPage() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    
    // Track changes to be sent to the backend
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [updatedIngredients, setUpdatedIngredients] = useState([]);
    const [deletedIngredients, setDeletedIngredients] = useState([]);
    
    // Flag to prevent multiple operations at once
    const isOperationInProgressRef = useRef(false);
    
    // Get userId from localStorage or use a default user ID
    const getUserId = () => {
        // If you store user info in localStorage, retrieve it
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                return JSON.parse(userInfo).user_id;
            } catch (e) {
                console.error("Error parsing user info", e);
            }
        }
        // If no user info found, return a default for development
        return 1; // Default user ID for testing
    };
    
    const userId = getUserId();
    
    // Load user's pantry on component mount
    useEffect(() => {
        fetchPantry();
    }, []);
    
    // Clear save message after 3 seconds
    useEffect(() => {
        if (saveMessage) {
            const timer = setTimeout(() => {
                setSaveMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [saveMessage]);
    
    const hasUnsavedChanges = () => {
        return addedIngredients.length > 0 || updatedIngredients.length > 0 || deletedIngredients.length > 0;
    };
    
    const fetchPantry = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            
            console.log('Fetching pantry for user:', userId);
            
            const response = await axios.get(`http://localhost:5000/get_pantry/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            console.log('Pantry response:', response.data);
            
            if (!response.data.pantry) {
                setItems([]);
                return;
            }
            
            // Format the data from the API to match our frontend structure
            const formattedItems = response.data.pantry.map(item => ({
                id: item.ingredientId,
                ingredient: item.ingredient.name,
                quantity: item.quantity !== null ? item.quantity.toString() : '',
                unit: item.unit || ''
            }));
            
            console.log('Formatted items:', formattedItems);
            
            setItems(formattedItems);
            
            // Reset tracked changes after successful load
            setAddedIngredients([]);
            setUpdatedIngredients([]);
            setDeletedIngredients([]);
        } catch (error) {
            console.error('Error fetching pantry:', error);
            console.error('Error details:', error.response?.data);
            
            // If 404 (no pantry), just set empty array
            if (error.response && error.response.status === 404) {
                setItems([]);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const savePantryChanges = async () => {
        if (!hasUnsavedChanges() || isSaving || isOperationInProgressRef.current) {
            return;
        }
        
        isOperationInProgressRef.current = true;
        setIsSaving(true);
        setSaveMessage('Saving changes...');
        
        try {
            const token = localStorage.getItem('token');
            
            console.log('Saving pantry changes:', {
                addedIngredients,
                updatedIngredients,
                deletedIngredients
            });
            
            // Make a copy of the changes to send
            const changes = {
                addedIngredients: [...addedIngredients],
                updatedIngredients: [...updatedIngredients],
                deletedIngredients: [...deletedIngredients]
            };
            
            // Clear tracked changes before sending to prevent duplicate sends
            setAddedIngredients([]);
            setUpdatedIngredients([]);
            setDeletedIngredients([]);
            
            const response = await axios.patch(
                `http://localhost:5000/update_pantry/${userId}`, 
                changes,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log('Save response:', response.status, response.data);
            
            setSaveMessage('Changes saved successfully!');
            
            // Refresh data after successful save
            await fetchPantry();
            
        } catch (error) {
            console.error('Error saving pantry changes:', error);
            console.error('Error response:', error.response?.status, error.response?.data);
            setSaveMessage('Error saving changes. Please try again.');
            
            // Refresh anyway to ensure UI is in sync with the database
            await fetchPantry();
        } finally {
            setIsSaving(false);
            isOperationInProgressRef.current = false;
        }
    };
    
    // Handle single item deletion
    const deleteItem = async (id) => {
        if (isOperationInProgressRef.current) return;
        
        const itemToDelete = items.find(item => item.id === id);
        if (!itemToDelete) return;
        
        console.log('Deleting item:', itemToDelete);
        
        // Update UI immediately for better UX
        setItems(prev => prev.filter(item => item.id !== id));
        
        if (id.toString().startsWith('temp-')) {
            // For temporary items, just remove from local state
            setAddedIngredients(prev => 
                prev.filter(item => item[0] !== itemToDelete.ingredient)
            );
        } else {
            // For permanent items, make a dedicated API call
            isOperationInProgressRef.current = true;
            setSaveMessage('Removing item...');
            
            try {
                const token = localStorage.getItem('token');
                
                await axios.patch(
                    `http://localhost:5000/update_pantry/${userId}`, 
                    {
                        addedIngredients: [],
                        updatedIngredients: [],
                        deletedIngredients: [itemToDelete.ingredient]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                setSaveMessage('Item removed successfully!');
                
                // Refresh to ensure UI matches database
                await fetchPantry();
            } catch (error) {
                console.error('Error deleting item:', error);
                setSaveMessage('Error removing item. Please refresh and try again.');
                
                // Refresh to ensure UI is in sync
                await fetchPantry();
            } finally {
                isOperationInProgressRef.current = false;
            }
        }
    };
    
    const addItem = (ingredient, quantity = '', unit = '') => {
        if (isOperationInProgressRef.current) return;
        
        console.log('Adding item:', ingredient, quantity, unit);
        
        // Generate temporary ID for frontend use only
        const tempId = `temp-${Date.now()}`;
        
        // Add to UI immediately
        setItems(prev => [...prev, { 
            id: tempId, 
            ingredient, 
            quantity, 
            unit 
        }]);
        
        // Track this addition to be sent to backend
        setAddedIngredients(prev => [...prev, [ingredient, quantity, unit]]);
    };
    
    const handleQuantityChange = (id, e) => {
        const newQuantity = e.target.value;
        
        // Find the updated item before making changes
        const updatedItem = items.find(item => item.id === id);
        if (!updatedItem) return;
        
        // Update UI immediately
        setItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
        
        // Skip for items not yet saved to backend (they're in addedIngredients)
        if (id.toString().startsWith('temp-')) {
            // Update the item in addedIngredients instead
            setAddedIngredients(prev => 
                prev.map(item => 
                    item[0] === updatedItem.ingredient 
                        ? [item[0], newQuantity, item[2]] 
                        : item
                )
            );
            return;
        }
        
        // For existing items, update the updatedIngredients list
        const existingUpdate = updatedIngredients.findIndex(
            item => item[0] === updatedItem.ingredient
        );
        
        if (existingUpdate >= 0) {
            // Update existing tracked change
            setUpdatedIngredients(prev => {
                const updated = [...prev];
                updated[existingUpdate] = [
                    updatedItem.ingredient, 
                    newQuantity, 
                    updatedItem.unit
                ];
                return updated;
            });
        } else {
            // Add new tracked change
            setUpdatedIngredients(prev => [
                ...prev, 
                [updatedItem.ingredient, newQuantity, updatedItem.unit]
            ]);
        }
    };
    
    const handleUnitChange = (id, e) => {
        const newUnit = e.target.value;
        
        // Find the updated item before making changes
        const updatedItem = items.find(item => item.id === id);
        if (!updatedItem) return;
        
        // Update UI immediately
        setItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, unit: newUnit } : item
            )
        );
        
        // Skip for items not yet saved to backend (they're in addedIngredients)
        if (id.toString().startsWith('temp-')) {
            // Update the item in addedIngredients instead
            setAddedIngredients(prev => 
                prev.map(item => 
                    item[0] === updatedItem.ingredient 
                        ? [item[0], item[1], newUnit] 
                        : item
                )
            );
            return;
        }
        
        // For existing items, update the updatedIngredients list
        const existingUpdate = updatedIngredients.findIndex(
            item => item[0] === updatedItem.ingredient
        );
        
        if (existingUpdate >= 0) {
            // Update existing tracked change
            setUpdatedIngredients(prev => {
                const updated = [...prev];
                updated[existingUpdate] = [
                    updatedItem.ingredient, 
                    updatedItem.quantity, 
                    newUnit
                ];
                return updated;
            });
        } else {
            // Add new tracked change
            setUpdatedIngredients(prev => [
                ...prev, 
                [updatedItem.ingredient, updatedItem.quantity, newUnit]
            ]);
        }
    };
    
    // Enter key handler to allow quick saving
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            savePantryChanges();
        }
    };
    
    return (
        <div className="container max-w-[960px] mx-auto px-4">
            <h1 className="text-3xl font-bold mt-8 mb-6">Your Pantry</h1>
            
            <PantryForm addItem={addItem} />
            
            {isLoading ? (
                <p className="text-center mt-8">Loading your pantry...</p>
            ) : (
                <>
                    <PantryList 
                        items={items} 
                        deleteItem={deleteItem}
                        handleQuantityChange={handleQuantityChange}
                        handleUnitChange={handleUnitChange}
                        handleKeyPress={handleKeyPress}
                    />
                    
                    {saveMessage && (
                        <div className={`mt-4 p-2 rounded text-center ${
                            saveMessage.includes('Error') 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {saveMessage}
                        </div>
                    )}
                    
                    {hasUnsavedChanges() && (
                        <button 
                            onClick={savePantryChanges}
                            disabled={isSaving}
                            className="mt-4 px-4 py-2 rounded text-white bg-primary hover:bg-opacity-90"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default PantryPage;