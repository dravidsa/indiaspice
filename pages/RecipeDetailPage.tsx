
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe, Cook } from '../types';

interface RecipeDetailPageProps {
  recipes: Recipe[];
  cooks: Cook[];
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipes, cooks }) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === id);
  const cook = recipe ? cooks.find(c => c.id === recipe.cookId) : null;

  if (!recipe || !cook) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <Link to="/" className="text-orange-500 hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="relative">
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{recipe.title}</h1>
            <p className="mt-2 text-lg drop-shadow-md">{recipe.description}</p>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content: Instructions */}
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-6">Instructions</h2>
                <ol className="list-decimal list-inside space-y-4 text-gray-700 text-lg">
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>

            {/* Sidebar: Details & Ingredients */}
            <div className="space-y-8">
                 {/* Cook Info */}
                <div className="bg-orange-50 p-4 rounded-lg flex items-center space-x-4">
                    <img src={cook.profilePictureUrl} alt={cook.name} className="w-16 h-16 rounded-full border-2 border-orange-200" />
                    <div>
                        <p className="text-sm text-gray-500">Recipe by</p>
                        <h3 className="text-lg font-bold text-gray-800">{cook.name}</h3>
                        <p className="text-sm text-orange-600">{cook.specialty}</p>
                    </div>
                </div>

                {/* Recipe Details */}
                <div className="flex justify-around text-center">
                    <div>
                        <p className="font-bold text-xl text-orange-500">{recipe.prepTime}</p>
                        <p className="text-sm text-gray-500">Prep Time</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl text-orange-500">{recipe.cookTime}</p>
                        <p className="text-sm text-gray-500">Cook Time</p>
                    </div>
                    <div>
                        <p className="font-bold text-xl text-orange-500">{recipe.servings}</p>
                        <p className="text-sm text-gray-500">Servings</p>
                    </div>
                </div>

                {/* Ingredients */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-4">Ingredients</h2>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <span className="h-2 w-2 bg-orange-400 rounded-full mr-3"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
