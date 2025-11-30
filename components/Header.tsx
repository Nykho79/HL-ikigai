import React from 'react';

export const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-center items-center bg-white/50 backdrop-blur-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        {/* 
            IMPORTANT : Placez votre image sous le nom 'logo.png' dans le dossier public/ 
            ou à la racine du site pour qu'elle s'affiche ici.
        */}
        <img 
            src="/logo.png" 
            alt="Logo HumanLab" 
            className="h-24 w-auto object-contain drop-shadow-sm"
            onError={(e) => {
                // Fallback discret si l'image n'est pas trouvée
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
            }}
        />
        
        {/* Fallback caché par défaut (s'affiche si l'image manque) */}
        <div className="fallback hidden relative w-12 h-12">
            <div className="absolute inset-0 bg-iki-love rounded-full opacity-70 translate-x-1 -translate-y-1"></div>
            <div className="absolute inset-0 bg-iki-paid rounded-full opacity-70 -translate-x-1 translate-y-1"></div>
            <div className="absolute inset-0 bg-iki-need rounded-full opacity-70 translate-x-1 translate-y-1"></div>
            <div className="absolute inset-0 bg-iki-good rounded-full opacity-70 -translate-x-1 -translate-y-1"></div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
          HumanLab - <span className="text-indigo-600">Ikigai</span>
        </h1>
      </div>
    </header>
  );
};