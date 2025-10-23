
import { Cook, Recipe, Product, Order, Banner, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'north-indian', name: 'North Indian', imageUrl: 'https://picsum.photos/seed/northindian/400/300' },
  { id: 'kerala', name: 'Kerala', imageUrl: 'https://picsum.photos/seed/kerala/400/300' },
  { id: 'telugu', name: 'Telugu', imageUrl: 'https://picsum.photos/seed/telugu/400/300' },
  { id: 'konkani', name: 'Konkani', imageUrl: 'https://picsum.photos/seed/konkani/400/300' },
  { id: 'bengali', name: 'Bengali', imageUrl: 'https://picsum.photos/seed/bengali/400/300' },
];

export const INITIAL_COOKS: Cook[] = [
  {
    id: 'cook1',
    name: 'Anjali Sharma',
    bio: 'A passionate home cook from Delhi specializing in authentic North Indian cuisine. With over 20 years of experience, Anjali brings traditional flavors to the modern kitchen.',
    specialty: 'North Indian',
    location: 'Delhi, India',
    profilePictureUrl: 'https://picsum.photos/seed/anjali/400/400',
    categoryId: 'north-indian',
  },
  {
    id: 'cook2',
    name: 'Ravi Menon',
    bio: 'Hailing from Kerala, Ravi is an expert in South Indian coastal dishes. He focuses on fresh ingredients and aromatic spices to create culinary masterpieces.',
    specialty: 'South Indian',
    location: 'Kochi, India',
    profilePictureUrl: 'https://picsum.photos/seed/ravi/400/400',
    categoryId: 'kerala',
  },
   {
    id: 'cook3',
    name: 'Priya Das',
    bio: 'Priya explores the rich and diverse flavors of Bengali sweets and savory dishes. Her recipes are a tribute to her grandmother\'s kitchen in Kolkata.',
    specialty: 'Bengali',
    location: 'Kolkata, India',
    profilePictureUrl: 'https://picsum.photos/seed/priya/400/400',
    categoryId: 'bengali',
  },
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'recipe1',
    cookId: 'cook1',
    categoryId: 'north-indian',
    title: 'Butter Chicken (Murgh Makhani)',
    description: 'A classic, creamy and flavor-packed Butter Chicken recipe that is better than any restaurant version. A must-try for all Indian food lovers.',
    imageUrl: 'https://picsum.photos/seed/butterchicken/800/600',
    ingredients: ['500g Chicken', '1 cup Yogurt', '1 tbsp Ginger-Garlic Paste', '2 cups Tomato Puree', '1/2 cup Cream', '1/4 cup Butter'],
    instructions: ['Marinate chicken in yogurt and spices.', 'Grill or pan-fry the chicken until cooked.', 'Prepare the makhani gravy with tomato puree, cream, and butter.', 'Add chicken to the gravy and simmer.'],
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 4,
  },
  {
    id: 'recipe2',
    cookId: 'cook2',
    categoryId: 'kerala',
    title: 'Masala Dosa',
    description: 'A crispy, savory crepe made from a fermented batter of rice and lentils, filled with a spiced potato mixture. A staple breakfast from South India.',
    imageUrl: 'https://picsum.photos/seed/dosa/800/600',
    ingredients: ['1 cup Rice', '1/4 cup Urad Dal', '4 Potatoes', '1 Onion', 'Turmeric, Mustard Seeds, Curry Leaves'],
    instructions: ['Soak rice and dal, then grind to a smooth batter and ferment overnight.', 'Prepare the potato filling.', 'Spread batter on a hot tawa to make a thin crepe.', 'Add filling, fold, and serve hot with chutney.'],
    prepTime: '8 hours (fermentation)',
    cookTime: '15 mins',
    servings: 4,
  },
  {
    id: 'recipe3',
    cookId: 'cook3',
    categoryId: 'bengali',
    title: 'Mishti Doi (Sweet Yogurt)',
    description: 'A traditional Bengali sweet dish made with yogurt. It is prepared by thickening milk and sweetening it with jaggery.',
    imageUrl: 'https://picsum.photos/seed/mishtidoi/800/600',
    ingredients: ['1 litre Full-fat Milk', '1 cup Jaggery', '2 tbsp Yogurt Culture'],
    instructions: ['Boil and reduce milk to half.', 'Melt jaggery and mix it with the warm milk.', 'Let it cool down, then add yogurt culture.', 'Set in an earthen pot for 8-10 hours.'],
    prepTime: '10 mins',
    cookTime: '45 mins',
    servings: 6,
  },
  {
    id: 'recipe4',
    cookId: 'cook1',
    categoryId: 'north-indian',
    title: 'Palak Paneer',
    description: 'A popular vegetarian dish from North India consisting of paneer (Indian cheese) in a smooth, creamy spinach gravy.',
    imageUrl: 'https://picsum.photos/seed/palakpaneer/800/600',
    ingredients: ['250g Paneer', '500g Spinach', '1 Onion', '2 Tomatoes', '1 tbsp Ginger-Garlic Paste', 'Spices'],
    instructions: ['Blanch spinach and puree it.', 'Sauté onions, tomatoes, and spices.', 'Add spinach puree and cook.', 'Add paneer cubes and simmer for a few minutes.'],
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 3,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    cookId: 'cook2',
    categoryId: 'kerala',
    name: 'Homemade Idli/Dosa Batter',
    description: 'Freshly ground and fermented batter, perfect for soft idlis and crispy dosas. Made with premium quality rice and dal. 1kg pack.',
    imageUrl: 'https://picsum.photos/seed/batter/400/400',
    price: 150,
    type: 'ingredient',
  },
  {
    id: 'prod2',
    cookId: 'cook1',
    categoryId: 'north-indian',
    name: 'Garam Masala Spice Blend',
    description: 'Anjali\'s secret family recipe for garam masala. Aromatic and potent, this blend will elevate your dishes. 100g pack.',
    imageUrl: 'https://picsum.photos/seed/masala/400/400',
    price: 250,
    type: 'ingredient',
  },
  {
    id: 'prod3',
    cookId: 'cook3',
    categoryId: 'bengali',
    name: 'Ready-to-eat Sandesh',
    description: 'Authentic Bengali Sandesh made from fresh chhena and jaggery. A box of 12 delicate and delicious sweets.',
    imageUrl: 'https://picsum.photos/seed/sandesh/400/400',
    price: 400,
    type: 'dish',
  },
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'ord1', customerName: 'Rohan Verma', productName: 'Garam Masala Spice Blend', quantity: 2, totalPrice: 500, status: 'Shipped', date: '2023-10-26' },
  { id: 'ord2', customerName: 'Sneha Patil', productName: 'Homemade Idli/Dosa Batter', quantity: 1, totalPrice: 150, status: 'Delivered', date: '2023-10-25' },
  { id: 'ord3', customerName: 'Amit Desai', productName: 'Ready-to-eat Sandesh', quantity: 1, totalPrice: 400, status: 'Pending', date: '2023-10-27' },
];

export const INITIAL_BANNER: Banner = {
  id: 'banner1',
  imageUrl: 'https://picsum.photos/seed/mainbanner/1600/600',
  title: 'Experience the Taste of Authentic India',
  subtitle: 'Handcrafted recipes and products from the heart of Indian kitchens.',
  ctaText: 'Explore Recipes',
  ctaLink: '#/recipes',
};
