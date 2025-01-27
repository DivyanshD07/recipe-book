import React, { useEffect, useRef, useState } from 'react';
import { loadRecipes } from '../api/spoonacular';
import { Link } from 'react-router-dom';
import './Home.css'
import Hero from './sections/Hero';
import HorizontalScroll from 'react-scroll-horizontal';
import Search from '../components/Search';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        loadRecipe();
    }, []);

    // useEffect(() => {
    //     if (!searchTerm) return;

    //     const fetchTimeout = setTimeout(() => {
    //         loadRecipe(searchTerm);
    //     }, 500);

    //     return () => clearTimeout(fetchTimeout);
    // }, [searchTerm])

    const loadRecipe = async (query = '') => {
        setLoading(true);
        setError('');
        try {
            const data = await loadRecipes(query);
            setRecipes(data);
            if (query) {
                setSuggestions(data.map((recipe) => recipe.title))
            }
        } catch (error) {
            console.error('error loading recipes:', error);
            setError('Failed to fetch recipe. Please try again.')
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (value) => {
        loadRecipe(value);
    }

    return (
        <div className='home'>
            <HorizontalScroll
                reverseScroll={true}
            >
                <Hero
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm} 
                    onSearch={() => loadRecipe(searchTerm)}
                    onInputChange={handleInputChange}
                    suggestions={suggestions}
                />

                <div className='searchAndFood'>
                    {/* Search Bar */}
                    <div className='search'>
                        <Search
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={() => loadRecipe(searchTerm)}
                            onInputChange={handleInputChange}
                        />
                    </div>


                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}

                    <div className='recipes'>
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className='recipe'>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <div className='recipe-image-div'><img src={recipe.image} alt={recipe.topic} className='recipe-image' /></div>
                                    <h4 className='recipe-title'>
                                        {recipe.title}
                                    </h4>
                                    {/* <p>{recipe.summary}</p> */}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </HorizontalScroll>
        </div>
    );
};

export default Home