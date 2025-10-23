
import React from 'react';
import { Cook } from '../types';

interface ChefCardProps {
  cook: Cook;
}

const ChefCard: React.FC<ChefCardProps> = ({ cook }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6 transform hover:scale-105 transition-transform duration-300">
      <img className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-200" src={cook.profilePictureUrl} alt={cook.name} />
      <h3 className="text-xl font-bold text-gray-800">{cook.name}</h3>
      <p className="text-sm text-orange-500 font-semibold mb-2">{cook.specialty}</p>
      <p className="text-gray-600 text-sm">{cook.location}</p>
    </div>
  );
};

export default ChefCard;
