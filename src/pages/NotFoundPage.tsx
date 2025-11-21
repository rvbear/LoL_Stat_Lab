// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-9xl font-bold text-hextech-gold-400">404</h1>
        <p className="text-2xl mt-4 mb-8">Page Not Found</p>
        <Link 
            to="/"
            className="px-6 py-3 bg-hextech-blue-500 text-hextech-gold-100 rounded-md border border-hextech-gold-400 hover:bg-hextech-gold-400 hover:text-hextech-black transition-colors"
        >
            Go Back Home
        </Link>
    </div>
  );
};

export default NotFoundPage;
