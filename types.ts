
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Cook {
  id: string;
  name: string;
  bio: string;
  specialty: string;
  location: string;
  profilePictureUrl: string;
  categoryId: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  cookId: string;
  categoryId: string;
  prepTime: string;
  cookTime: string;
  servings: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  type: 'dish' | 'ingredient' | 'utensil';
  cookId: string;
  categoryId: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Order {
  id:string;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export type UserRole = 'user' | 'cook' | 'admin';
