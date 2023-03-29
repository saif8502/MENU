import React, { useState } from 'react';

function RecipeApp() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = 'your_app_id';
  const APP_KEY = 'your_app_key';
  const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setRecipes(data.hits);
    setQuery('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRecipes();
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="container">
      <h1>Recipe App</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for recipes"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.recipe.uri} className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p>
              <strong>Ingredients:</strong> {recipe.recipe.ingredientLines.join(', ')}
            </p>
            <a href={recipe.recipe.url} target="_blank" rel="noreferrer">
              View recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeApp;
