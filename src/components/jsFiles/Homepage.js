import { useEffect, useState } from 'react';
import '../cssFiles/homepage.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png'

const Homepage = () => {

    const [searchQuery, setSearchQuery] = useState('shake');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (!searchQuery) {
            return;
        }

        axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: 'fcfe78ab112d4f3283af288ec45c18b6', // Replace with your Spoonacular API key
                query: searchQuery
            }
        })
            .then(response => {
                setRecipes(response.data.results);
                console.log(response.data.results)
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, [searchQuery]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div id="home">
            <span className='overlay'></span>
            <section className='page-content'>
                <img src={logo} className='logo' alt='logo-image' />
                <div className='search-section'>
                    <span>
                        <input type='text' placeholder='Search recipes...' value={searchQuery} onChange={handleInputChange} />
                        <button>&#9740;</button>
                    </span>
                </div>
                <p>Explore a world of flavors with our collection of delicious recipes</p>
                <div className='search-results'>
                    <p>Results</p>
                    <div className='result-recipes'>
                        {recipes.map(recipe => (
                            <div key={recipe.id} className='recipe'>
                                <img src={recipe.image} alt='recipe' />
                                <span>
                                    <span>{recipe.title}</span>
                                    <Link to={`/recipe/${recipe.id}`}>Go to recipe &#11166;</Link>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <h1>Recipe Book</h1>
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul> */}
            </section>
        </div>
    )
}
export default Homepage;