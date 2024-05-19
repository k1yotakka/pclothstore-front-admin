import React from 'react';

function ProductsNotFound() {
   return (
      <div
         className="flex flex-col items-center justify-center h-screen"
         style={{ zIndex: -100 }}
      >
         <div className="mb-4 text-6xl">
            <span role="img" aria-label="Disappointed face emoji">
               😞
            </span>
         </div>
         <h2 className="text-xl font-semibold mb-2">Не найдено :(</h2>
         <p className="text-gray-500 text-center mb-4">
            Таких товаров у нас нет
         </p>
      </div>
   );
}

export default ProductsNotFound;
