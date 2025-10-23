
import React, { useState, FormEvent } from 'react';
import { Banner, Recipe, Cook, Order } from '../types';

interface AdminDashboardProps {
  banner: Banner;
  onUpdateBanner: (banner: Banner) => void;
  recipes: Recipe[];
  cooks: Cook[];
  orders: Order[];
  featuredRecipeId: string;
  featuredCookId: string;
  onSetFeaturedRecipe: (id: string) => void;
  onSetFeaturedCook: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ banner, onUpdateBanner, recipes, cooks, orders, featuredCookId, featuredRecipeId, onSetFeaturedCook, onSetFeaturedRecipe }) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'promotion' | 'orders'>('appearance');
  const [currentBanner, setCurrentBanner] = useState<Banner>(banner);

  const handleBannerSave = (e: FormEvent) => {
      e.preventDefault();
      onUpdateBanner(currentBanner);
      alert('Banner updated successfully!');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage site settings, content, and orders from here.</p>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('appearance')} className={`${activeTab === 'appearance' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Site Appearance
          </button>
          <button onClick={() => setActiveTab('promotion')} className={`${activeTab === 'promotion' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Content Promotion
          </button>
          <button onClick={() => setActiveTab('orders')} className={`${activeTab === 'orders' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Orders Management ({orders.length})
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'appearance' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Homepage Banner</h2>
            <form onSubmit={handleBannerSave} className="bg-white p-6 rounded-lg shadow space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" value={currentBanner.imageUrl} onChange={e => setCurrentBanner(b => ({...b, imageUrl: e.target.value}))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={currentBanner.title} onChange={e => setCurrentBanner(b => ({...b, title: e.target.value}))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input type="text" value={currentBanner.subtitle} onChange={e => setCurrentBanner(b => ({...b, subtitle: e.target.value}))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" required/>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600">Save Banner</button>
              </div>
            </form>
          </div>
        )}
        {activeTab === 'promotion' && (
            <div>
                <h2 className="text-2xl font-semibold mb-4">Featured Content</h2>
                <div className="bg-white p-6 rounded-lg shadow space-y-6">
                    <div>
                        <label htmlFor="featured-recipe" className="block text-sm font-medium text-gray-700">Recipe of the Month</label>
                        <select id="featured-recipe" value={featuredRecipeId} onChange={e => onSetFeaturedRecipe(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
                           {recipes.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="featured-cook" className="block text-sm font-medium text-gray-700">Chef of the Month</label>
                        <select id="featured-cook" value={featuredCookId} onChange={e => onSetFeaturedCook(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
                           {cooks.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        )}
        {activeTab === 'orders' && (
             <div>
                <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
