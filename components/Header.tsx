
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole, Category } from '../types';

interface HeaderProps {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, categories }) => {
    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.5 7a.5.5 0 000 1h7a.5.5 0 000-1h-7zM6 10.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zM7.5 13a.5.5 0 000 1h5a.5.5 0 000-1h-5z" clipRule="evenodd" />
                            </svg>
                            <span className="text-2xl font-bold text-gray-800">Bharat <span className="text-orange-500">Spice</span></span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex space-x-6 items-center">
                            <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Home</Link>
                            
                            <div className="relative">
                                <button 
                                    onMouseEnter={() => setCategoryMenuOpen(true)}
                                    onMouseLeave={() => setCategoryMenuOpen(false)}
                                    className="text-gray-600 hover:text-orange-500 transition-colors duration-200 flex items-center"
                                >
                                    Categories
                                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {isCategoryMenuOpen && (
                                    <div 
                                        onMouseEnter={() => setCategoryMenuOpen(true)}
                                        onMouseLeave={() => setCategoryMenuOpen(false)}
                                        className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200"
                                    >
                                        {categories.map(category => (
                                            <Link 
                                                key={category.id} 
                                                to={`/category/${category.id}`} 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                                                onClick={() => setCategoryMenuOpen(false)}
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <a href="/#/#recipes" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Recipes</a>
                            <a href="/#/#products" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Products</a>
                            <a href="/#/#chefs" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">Chefs</a>
                        </nav>

                        <div className="relative">
                           <label htmlFor="role-switcher" className="sr-only">Switch User Role</label>
                           <select
                                id="role-switcher"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value as UserRole)}
                                className="pl-3 pr-8 py-2 text-sm font-medium bg-orange-100 border border-orange-200 rounded-md shadow-sm text-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
                           >
                               <option value="user">End User</option>
                               <option value="cook">Cook</option>
                               <option value="admin">Admin</option>
                           </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
