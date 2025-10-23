
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Cook, Recipe, Product, Order, Banner, UserRole, Category } from './types';
import { INITIAL_COOKS, INITIAL_RECIPES, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_BANNER, INITIAL_CATEGORIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CookDashboard from './pages/CookDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  const [cooks, setCooks] = useState<Cook[]>(INITIAL_COOKS);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [banner, setBanner] = useState<Banner>(INITIAL_BANNER);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('user');
  // For demo, we'll assign a specific cook/admin
  const currentCook = cooks[0]; 
  
  const [featuredRecipeId, setFeaturedRecipeId] = useState<string>(recipes[0].id);
  const [featuredCookId, setFeaturedCookId] = useState<string>(cooks[0].id);

  const addRecipe = (recipe: Recipe) => setRecipes(prev => [...prev, recipe]);
  const updateRecipe = (updatedRecipe: Recipe) => setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  const deleteRecipe = (id: string) => setRecipes(prev => prev.filter(r => r.id !== id));

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header userRole={currentUserRole} setUserRole={setCurrentUserRole} categories={categories} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
                <Route path="/" element={
                    currentUserRole === 'user' ? <HomePage banner={banner} recipes={recipes} cooks={cooks} products={products} categories={categories} featuredCookId={featuredCookId} featuredRecipeId={featuredRecipeId} /> :
                    currentUserRole === 'cook' ? <CookDashboard 
                        cook={currentCook} 
                        recipes={recipes.filter(r => r.cookId === currentCook.id)} 
                        products={products.filter(p => p.cookId === currentCook.id)}
                        categories={categories}
                        onAddRecipe={addRecipe}
                        onUpdateRecipe={updateRecipe}
                        onDeleteRecipe={deleteRecipe}
                        onAddProduct={addProduct}
                        onUpdateProduct={updateProduct}
                        onDeleteProduct={deleteProduct}
                        /> :
                    <AdminDashboard 
                        banner={banner}
                        onUpdateBanner={setBanner}
                        recipes={recipes}
                        cooks={cooks}
                        orders={orders}
                        featuredCookId={featuredCookId}
                        featuredRecipeId={featuredRecipeId}
                        onSetFeaturedCook={setFeaturedCookId}
                        onSetFeaturedRecipe={setFeaturedRecipeId}
                    />
                } />
                <Route path="/recipe/:id" element={<RecipeDetailPage recipes={recipes} cooks={cooks} />} />
                <Route path="/category/:categoryId" element={<CategoryPage recipes={recipes} cooks={cooks} products={products} categories={categories} />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
