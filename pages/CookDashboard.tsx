
import React, { useState, FormEvent, useEffect } from 'react';
import { Cook, Recipe, Product, Category } from '../types';
import Modal from '../components/Modal';
import PlusIcon from '../components/icons/PlusIcon';
import { generateRecipeIdea } from '../services/geminiService';

interface CookDashboardProps {
  cook: Cook;
  recipes: Recipe[];
  products: Product[];
  categories: Category[];
  onAddRecipe: (recipe: Recipe) => void;
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (id: string) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

type ModalState = { type: 'recipe' | 'product'; data?: Recipe | Product } | null;

const CookDashboard: React.FC<CookDashboardProps> = ({ cook, recipes, products, categories, onAddRecipe, onUpdateRecipe, onDeleteRecipe, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'products' | 'profile' | 'ideas'>('recipes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalState>(null);
  
  const [ingredients, setIngredients] = useState('');
  const [ideaResult, setIdeaResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const openModal = (type: 'recipe' | 'product', data?: Recipe | Product) => {
    setModalContent({ type, data });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  
  const handleGenerateIdea = async () => {
      if(!ingredients) return;
      setIsGenerating(true);
      setIdeaResult('');
      const result = await generateRecipeIdea(ingredients);
      setIdeaResult(result);
      setIsGenerating(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {cook.name}!</h1>
      <p className="text-gray-600 mb-8">This is your creative space. Manage your content and find inspiration.</p>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('recipes')} className={`${activeTab === 'recipes' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            My Recipes ({recipes.length})
          </button>
          <button onClick={() => setActiveTab('products')} className={`${activeTab === 'products' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            My Products ({products.length})
          </button>
          <button onClick={() => setActiveTab('ideas')} className={`${activeTab === 'ideas' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Recipe Idea Generator
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'recipes' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Recipes</h2>
              <button onClick={() => openModal('recipe')} className="flex items-center space-x-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                <PlusIcon />
                <span>Add Recipe</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
                       <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-40 object-cover rounded mb-4"/>
                       <h3 className="font-bold">{recipe.title}</h3>
                       <div className="flex space-x-2 mt-4">
                           <button onClick={() => openModal('recipe', recipe)} className="text-sm text-blue-600 hover:underline">Edit</button>
                           <button onClick={() => onDeleteRecipe(recipe.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                       </div>
                    </div>
                ))}
            </div>
          </div>
        )}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Products</h2>
              <button onClick={() => openModal('product')} className="flex items-center space-x-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                <PlusIcon />
                <span>Add Product</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                       <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded mb-4"/>
                       <h3 className="font-bold">{product.name}</h3>
                       <p className="text-gray-600">₹{product.price}</p>
                       <div className="flex space-x-2 mt-4">
                           <button onClick={() => openModal('product', product)} className="text-sm text-blue-600 hover:underline">Edit</button>
                           <button onClick={() => onDeleteProduct(product.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                       </div>
                    </div>
                ))}
            </div>
          </div>
        )}
        {activeTab === 'ideas' && (
             <div>
                <h2 className="text-2xl font-semibold mb-4">Generate a New Recipe Idea</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600 mb-4">Enter a few ingredients you have on hand, and let AI spark your creativity!</p>
                    <textarea 
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g., chicken, spinach, tomatoes, paneer..."
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:ring-orange-500 focus:border-orange-500"
                        rows={3}
                    />
                    <button onClick={handleGenerateIdea} disabled={isGenerating} className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400">
                        {isGenerating ? 'Generating...' : 'Get Idea'}
                    </button>
                    {ideaResult && (
                        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
                            <h3 className="font-bold text-lg mb-2">Here's an idea!</h3>
                            <pre className="whitespace-pre-wrap font-sans text-gray-700">{ideaResult}</pre>
                        </div>
                    )}
                </div>
             </div>
        )}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent?.data ? `Edit ${modalContent.type}` : `Add New ${modalContent?.type}`}>
        {modalContent?.type === 'recipe' && <RecipeForm cookId={cook.id} categories={categories} onSave={modalContent.data ? onUpdateRecipe : onAddRecipe} onDone={closeModal} initialData={modalContent.data as Recipe} />}
        {modalContent?.type === 'product' && <ProductForm cookId={cook.id} categories={categories} onSave={modalContent.data ? onUpdateProduct : onAddProduct} onDone={closeModal} initialData={modalContent.data as Product} />}
      </Modal>
    </div>
  );
};

// Form components defined outside to avoid re-rendering issues
const RecipeForm: React.FC<{ cookId: string, categories: Category[], onSave: (recipe: Recipe) => void, onDone: () => void, initialData?: Recipe }> = ({ cookId, categories, onSave, onDone, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || '');
    // ... other form fields would be here
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const recipeData: Recipe = {
            id: initialData?.id || `recipe-${Date.now()}`,
            cookId: cookId,
            title,
            categoryId,
            description: 'A newly added delicious recipe.',
            imageUrl: initialData?.imageUrl || 'https://picsum.photos/seed/newrecipe/800/600',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            instructions: ['Step 1', 'Step 2'],
            prepTime: '10 mins', cookTime: '20 mins', servings: 2
        };
        onSave(recipeData);
        onDone();
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white" required>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {/* Add other fields for description, ingredients etc. */}
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onDone} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600">Save Recipe</button>
            </div>
        </form>
    )
}

const ProductForm: React.FC<{ cookId: string, categories: Category[], onSave: (product: Product) => void, onDone: () => void, initialData?: Product }> = ({ cookId, categories, onSave, onDone, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.price || 0);
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const productData: Product = {
            id: initialData?.id || `prod-${Date.now()}`,
            cookId: cookId,
            name,
            price,
            categoryId,
            description: 'A new high-quality product.',
            imageUrl: initialData?.imageUrl || 'https://picsum.photos/seed/newproduct/400/400',
            type: 'ingredient'
        };
        onSave(productData);
        onDone();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white" required>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {/* Add other fields for description etc. */}
             <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onDone} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600">Save Product</button>
            </div>
        </form>
    )
}

export default CookDashboard;
