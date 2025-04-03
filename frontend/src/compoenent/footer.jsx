import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
  Heart,
  ArrowRight,
  CreditCardIcon,
} from "lucide-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className=" w-full bg-gray-900 text-gray-300 px-4 py-8">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-white">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm mt-1">
                Get the latest updates, deals and special offers
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-6 rounded-l-md focus:outline-none text-gray-900"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition duration-200">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Musdar Shope</h2>
            <p className="mb-4 text-sm leading-relaxed">
              Premium quality products designed for your everyday needs. We
              focus on style, quality, and affordability.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <BsFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <BsTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Shop</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Sale Items
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Trending Now
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Customer Care</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>
                  123 Abubaker Alrazi Street, Slsulimanya, Alriyadh, Saudi Arab
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+966 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>almusdarthafa999@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 Your Brand Name. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className=" rounded p-1">
                  <CreditCardIcon size={24} className="text-gray-800" />
                </div>
                <div className=" rounded p-1">
                  <ShoppingBag size={24} className="text-gray-800" />
                </div>
                <div className=" rounded p-1">
                  <Heart size={24} className="text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
