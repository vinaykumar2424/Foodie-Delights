import '../cssFiles/recipe.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
                apiKey: 'fcfe78ab112d4f3283af288ec45c18b6' // Replace with your actual Spoonacular API key
            }
        })
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }
    console.log(recipe)
    return (
        <>
            {recipe && <div id="recipe">
                <h2 className='title'>{recipe.title}</h2>
                <div className='dishTypes'>
                    {recipe?.dishTypes?.map((dishtype, index) => (
                        <span key={index}><span>&#11044;</span> {dishtype}</span>
                    ))}
                </div>
                <section className='sections'>
                    <div className='image-summary'>
                        <img src={recipe?.image} alt={recipe?.title} />
                        <div>
                            <h3>Summary</h3>
                            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                        </div>
                    </div>
                    <div className='recipe-details'>
                        <div className='timings'>
                            <div>&#11044;</div>
                            <div>
                                <p>Total Time: {recipe?.preparationMinutes + recipe?.cookingMinutes} minutes</p>
                                <p>Preparation Time: {recipe?.preparationMinutes} minutes</p>
                                <p>Cooking Time: {recipe?.cookingMinutes} minutes</p>
                                <p>Ready In: {recipe?.readyInMinutes} minutes</p>
                            </div>
                        </div>
                        <div className='instructions'>
                            <div>&#127869;</div>
                            <div className='step-section'>
                                <h3>Instructions</h3>
                                <div className='steps'>
                                    {recipe.analyzedInstructions[0]?.steps?.map((instruction, index) => (
                                        <span className='step' key={index}>
                                            <span>Step:{index}</span>
                                            <div>
                                                <span>{instruction?.step}</span>
                                                <span><span>Ingredient:</span>{instruction?.ingredients[0]?.name}({instruction?.ingredients[0]?.localizedName})</span>
                                            </div>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>}
        </>
    );
}

export default Recipe;
