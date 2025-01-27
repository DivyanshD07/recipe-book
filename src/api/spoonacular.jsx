import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
    baseURL: API_URL,
    params: {
        apiKey: API_KEY,
    },
});


export const loadRecipes = async(query = '') => {
    try {
        const response = await api.get('/complexSearch',{
            params: {
                number: 8,
                query,
            }
        });
        return response.data.results;
    }
    catch(error) {
        console.error('Error loading recipes:', error);
        throw error;
    }
};

export const fetchRecipeById = async (recipeId) => {
    try {
        const response = await api.get(`/${recipeId}/information`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipe ${recipeId} details:`, error);
        throw error;
    }
};