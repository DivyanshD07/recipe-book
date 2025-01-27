import React, { useEffect, useState } from 'react'
import { fetchRecipeById } from '../api/spoonacular'
import { useParams } from 'react-router-dom'
import './RecipeDetail.css'
import Navbar from '../components/Navbar'

const RecipeDetails = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipeDetail = async () => {
            try {
                const data = await fetchRecipeById(id);
                setRecipe(data);
            } catch (error) {
                console.error(`Error fetching recipe ${id} details:`, error);
            }
        };

        getRecipeDetail();
    }, [id]);

    if (!recipe) return <div>Loading...</div>

    return (
        <div className='recipeDetail'>
            <Navbar />
            <div className='upper'>
                <div className='upper-left'>
                    <h1>{recipe.title}</h1>
                    <div className='recipe-image'><img src={recipe.image} alt={recipe.title} className='dish-image' /></div>
                </div>
                <div className='upper-right'>
                    <h2>Ingredients:</h2>
                    <div>
                        <ul>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='lower'>
                <h2>Instructions:</h2>
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
        </div>
    )
}

export default RecipeDetails