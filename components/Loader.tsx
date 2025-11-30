import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-0 left-0 w-12 h-12 bg-iki-love rounded-full mix-blend-multiply animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-0 right-0 w-12 h-12 bg-iki-good rounded-full mix-blend-multiply animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-iki-paid rounded-full mix-blend-multiply animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-iki-need rounded-full mix-blend-multiply animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
      <h3 className="text-xl font-bold text-gray-700">Recherche de votre équilibre...</h3>
      <p className="text-gray-500 mt-2">L'IA analyse vos réponses pour trouver votre Ikigai.</p>
    </div>
  );
};