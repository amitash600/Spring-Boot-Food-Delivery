import React from 'react';
import { Store, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">FoodDelivery</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your favorite food delivery platform. Order from the best restaurants in your city and get food delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@fooddelivery.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 mt-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">1-800-FOOD-DEL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/restaurants" className="text-gray-300 hover:text-white text-sm">
                  Restaurants
                </a>
              </li>
              <li>
                <a href="/orders" className="text-gray-300 hover:text-white text-sm">
                  My Orders
                </a>
              </li>
              <li>
                <a href="/profile" className="text-gray-300 hover:text-white text-sm">
                  Profile
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-300 hover:text-white text-sm">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Pizza
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Burgers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Sushi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Tacos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Pasta
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 FoodDelivery. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
