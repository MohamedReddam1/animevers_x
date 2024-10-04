import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f1120] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Logo and About Section */}
          <div className="flex-1">
            <img src="https://i.imgur.com/RG6qk7K.png" alt="Website Logo" className="h-12 mb-4" />
            <p className="text-gray-400 text-sm">
              Discover the world of anime with us! Stay updated with the latest and greatest in anime entertainment.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Enter your email address to get the latest updates and news about anime delivered straight to your inbox.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 px-4 rounded-l-md bg-gray-700 placeholder-gray-400 text-gray-300 outline-none"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-r-md transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                  Anime List
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">&copy; 2024 Anime Verse X. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
