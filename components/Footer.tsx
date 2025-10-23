
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Newsletter */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Subscribe to our Newsletter</h3>
                        <p className="text-gray-400 mb-4">Get the latest recipes and offers directly in your inbox.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {/* SVGs for social icons would go here */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Bharat Spice. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
