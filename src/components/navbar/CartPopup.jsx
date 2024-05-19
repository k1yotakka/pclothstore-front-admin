import React, { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor';

const CartPopup = ({ closePopup }) => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [cartItems, setCartItems] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const cartResponse = await axiosInstance.get(`/api/cart/user/${user.userId}`);
            setCartItems(cartResponse.data);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   const handleRemoveItem = async(id) => {
      await axiosInstance.delete(`/api/cart/user/${user.userId}/product/${id}`)
   };

   const handleCheckout = async () => {
      const purchaseList = cartItems.map(item => ({
        product: { id: item.product.id },
        userId: user.userId
      }));
    
      try {
        const response = await axiosInstance.post('/api/purchases/list', purchaseList);
        console.log(response.data);
        await axiosInstance.delete(`/api/cart/user/${user.userId}/all`)
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

   const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
         return text.substring(0, maxLength) + '...';
      }
      return text;
   };

   return (
      <div style={popupStyles}>
         <div style={popupContentStyles}>
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length > 0 ? (
               <div className="space-y-4">
                  <div style={cartItemsContainerStyles} className="space-y-4">
                     {cartItems.map((item) => (
                        <div
                           key={item.product.id}
                           className="flex justify-between items-center border-b pb-2"
                        >
                           <div className="w-16 h-16 flex-shrink-0">
                              <img
                                 src={item.product.imageUrl}
                                 alt={item.product.name}
                                 className="w-full h-full object-cover rounded"
                              />
                           </div>
                           <div className="flex-col ml-4 items-center">
                              <span className="font-bold">
                                 {truncateText(item.product.name, 20)}
                              </span>
                              <span className="text-gray-500 ml-2">
                                 ${item.product.price}
                              </span>
                           </div>
                           <button
                              onClick={() => {handleRemoveItem(item.product.id); 
                              window.location.reload();}}
                              className="text-red-500 hover:text-red-700"
                           >
                              Remove
                           </button>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                     <span className="font-bold">Total:</span>
                     <span className="font-bold">
                        $
                        {cartItems.reduce(
                           (total, item) => total + item.product.price,
                           0,
                        )}
                     </span>
                  </div>
                  <button
                     onClick={handleCheckout}
                     className="w-full px-4 py-2 bg-green-500 hover:bg-green-700 transition-all 0.2s text-white rounded mt-4"
                  >
                     Proceed to Checkout
                  </button>
               </div>
            ) : (
               <p>Your cart is empty</p>
            )}
            <button
               onClick={closePopup}
               className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
               Close
            </button>
         </div>
      </div>
   );
};

const popupStyles = {
   position: 'fixed',
   top: '0',
   left: '0',
   width: '100%',
   height: '100%',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
};

const popupContentStyles = {
   backgroundColor: 'white',
   padding: '20px',
   borderRadius: '10px',
   textAlign: 'center',
   width: '500px',
   maxHeight: '80vh',
   overflowY: 'auto',
};

const cartItemsContainerStyles = {
   maxHeight: '30vh',
   overflowY: 'auto',
   scrollbarWidth: 'none',
   msOverflowStyle: 'none',
};

const hideScrollbarStyles = `
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export default CartPopup;
