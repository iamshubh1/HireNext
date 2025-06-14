import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2648F0] to-[#DE4A82] text-white py-10 mt-20 shadow-inner">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight">Hire<span className="text-white/70">Next</span></h2>
            <p className="text-sm opacity-80">© {new Date().getFullYear()} HireNext. All rights reserved.</p>
          </div>

          <div className="flex space-x-5">
            {/* Facebook */}
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg className="w-7 h-7 text-white hover:text-white/80 transition-transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.505 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>

            {/* Twitter */}
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg className="w-7 h-7 text-white hover:text-white/80 transition-transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.94 9.94 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195 4.918 4.918 0 0 0-8.384 4.482A13.978 13.978 0 0 1 1.671 3.15 4.915 4.915 0 0 0 3.195 9.724a4.9 4.9 0 0 1-2.229-.616v.062a4.923 4.923 0 0 0 3.946 4.827 4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.417 9.867 9.867 0 0 1-6.102 2.104c-.395 0-.787-.023-1.175-.067A13.945 13.945 0 0 0 7.548 22c9.057 0 14.009-7.504 14.009-14.009 0-.213-.004-.426-.014-.637A10.025 10.025 0 0 0 24 4.557z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg className="w-7 h-7 text-white hover:text-white/80 transition-transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.6v-5.569c0-1.326-.027-3.036-1.852-3.036-1.854 0-2.137 1.447-2.137 2.941v5.664h-3.6V9.756h3.459v1.464h.049c.482-.914 1.662-1.874 3.421-1.874 3.656 0 4.332 2.406 4.332 5.537v5.569zM5.337 8.291a2.07 2.07 0 1 1 0-4.139 2.07 2.07 0 0 1 0 4.139zM7.118 20.452h-3.6V9.756h3.6v10.696zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.207 24 24 23.226 24 22.271V1.729C24 .774 23.207 0 22.225 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
