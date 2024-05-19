import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyOrder() {
   const containerStyle = {
      minHeight: `calc(100vh - 14.9rem)`,
   };

   const navigate = useNavigate();

   return (
      <div
         className="flex flex-col items-center justify-center"
         style={containerStyle}
      >
         <div className="mb-4 text-6xl">
            <span role="img" aria-label="Sad face emoji">
               🥺
            </span>
         </div>
         <h2 className="text-2xl font-semibold mb-2">У вас нет заказов</h2>
         <p className="text-gray-500 mb-4">
            Вы нищеброд? Оформите хотя бы один заказ.
         </p>
         <button
            onClick={() => {
               navigate('/home');
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
         >
            Вернуться назад
         </button>
      </div>
   );
}

export default EmptyOrder;
