
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-500">₹{product.price}</span>
            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300">
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
