
import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe, Cook, Product, Banner, Category } from '../types';
import RecipeCard from '../components/RecipeCard';
import ProductCard from '../components/ProductCard';
import ChefCard from '../components/ChefCard';

interface HomePageProps {
  banner: Banner;
  recipes: Recipe[];
  cooks: Cook[];
  products: Product[];
  categories: Category[];
  featuredRecipeId: string;
  featuredCookId: string;
}

const HomePage: React.FC<HomePageProps> = ({ banner, recipes, cooks, products, categories, featuredCookId, featuredRecipeId }) => {
    
    const featuredRecipe = recipes.find(r => r.id === featuredRecipeId) || recipes[0];
    const featuredCook = cooks.find(c => c.id === featuredCookId) || cooks[0];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
                <div className="w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${banner.imageUrl})` }}>
                    <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">{banner.title}</h1>
                            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">{banner.subtitle}</p>
                            <a href={banner.ctaLink} className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                                {banner.ctaText}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Featured Section */}
            <section>
                 <h2 className="text-3xl font-bold text-center mb-2">This Month's Features</h2>
                 <p className="text-center text-gray-600 mb-8">Handpicked for you by our team.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {featuredRecipe && <RecipeCard recipe={featuredRecipe} />}
                    {featuredCook && <ChefCard cook={featuredCook} />}
                 </div>
            </section>

            {/* Browse by Category Section */}
            <section id="categories">
                <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                    {categories.map(category => (
                        <Link to={`/category/${category.id}`} key={category.id} className="group relative block rounded-lg overflow-hidden text-center transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                            <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors duration-300 flex items-center justify-center p-2">
                                <h3 className="text-white text-lg font-bold drop-shadow-md">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Latest Recipes Section */}
            <section id="recipes">
                <h2 className="text-3xl font-bold text-center mb-8">Latest Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.slice(0, 3).map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </section>

            {/* Popular Products Section */}
            <section id="products">
                <h2 className="text-3xl font-bold text-center mb-8">Popular Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            
            {/* Meet the Chefs Section */}
            <section id="chefs">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Chefs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cooks.map(cook => (
                        <ChefCard key={cook.id} cook={cook} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
