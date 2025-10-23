
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe, Cook, Product, Category } from '../types';
import RecipeCard from '../components/RecipeCard';
import ProductCard from '../components/ProductCard';
import ChefCard from '../components/ChefCard';

interface CategoryPageProps {
  recipes: Recipe[];
  cooks: Cook[];
  products: Product[];
  categories: Category[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ recipes, cooks, products, categories }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const filteredRecipes = recipes.filter(r => r.categoryId === categoryId);
  const filteredProducts = products.filter(p => p.categoryId === categoryId);
  const filteredCooks = cooks.filter(c => c.categoryId === categoryId);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/" className="text-orange-500 hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Cuisine: <span className="text-orange-500">{category.name}</span></h1>
        <p className="mt-2 text-lg text-gray-600">Explore recipes, products, and chefs from the {category.name} region.</p>
      </section>

      {filteredRecipes.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Recipes from {category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {filteredProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Products from {category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      
      {filteredCooks.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Chefs from {category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCooks.map(cook => (
              <ChefCard key={cook.id} cook={cook} />
            ))}
          </div>
        </section>
      )}

      {filteredRecipes.length === 0 && filteredProducts.length === 0 && filteredCooks.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Coming Soon!</h3>
            <p className="text-gray-500 mt-2">Our chefs are busy cooking up new content for the {category.name} category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
