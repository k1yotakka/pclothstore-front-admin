import Item from '../item/Item';
import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor';
import ProductsNotFound from '../ProductsNotFound';

function Items() {
   const user = JSON.parse(localStorage.getItem('user'))

   const [products, setProducts] = useState([]);
   const [cartProducts, setCartProducts] = useState([]);
   const [categories, setCategories] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {

            const response = await axiosInstance.get('/api/product');
            setProducts(response.data);

            const uniqueCategories = Array.from(
               new Set(response.data.map((product) => product.category.name)),
            );
            setCategories(uniqueCategories);

            const cartResponse = await axiosInstance.get(`/api/cart/user/${user.userId}`);
            setCartProducts(cartResponse.data);
         } catch (error) {
            // alert('Error while fetching data, check console!');
            console.log(error);
         }
      };

      fetchData();
   }, []);

   const [selectedCategory, setSelectedCategory] =
      useState('Мужские кроссовки');

   // Replace items with products
   const filteredItems = products.filter((item) => {
      const matchesCategory = item.category.name.includes(selectedCategory);
      const matchesSearch = item.name
         .toLowerCase()
         .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
   });

   const containerStyle = {
      minHeight: `calc(100vh - 16rem)`,
   };

   return (
      <div className="w-[1400px] m-auto mt-4" style={containerStyle}>
         <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-inter font-bold">
               {/* Selected Category */}
               {selectedCategory}
            </h1>

            {/* Map other categories */}
            <div className="flex font-inter font-[400] text-[16px] w-[650px] justify-between text-[#969292]">
               {/* REPLACE categories_mock with categories*/}
               {categories.map((category) => (
                  <span
                     key={category}
                     className={`cursor-pointer hover:opacity-45 transition-all duration-200 ease-in-out ${
                        selectedCategory === category
                           ? 'font-bold text-black'
                           : ''
                     }`}
                     onClick={() => setSelectedCategory(category)}
                  >
                     {category}
                  </span>
               ))}
            </div>
         </div>
         {/* START FILTER */}
         <div>
            <div className="mt-4" style={{ position: 'relative' }}>
               <input
                  type="text"
                  placeholder="Поиск по названию"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
               />
               <img
                  src="/svg/search.svg"
                  alt="search icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
               />
            </div>
         </div>
         {/* END FILTER */}
         <div className="h-fit mt-6 flex flex-wrap">
            {filteredItems.length < 1 ? (
               <div
                  className="absolute top-0 left-0 w-full"
                  style={{ zIndex: -100 }}
               >
                  <ProductsNotFound />
               </div>
            ) : (
               filteredItems.map((item, index) => {
                  return (
                     <Item
                        title={item.name}
                        price={item.price}
                        description={item.description}
                        category={item.category.name}
                        img_url={item.imageUrl}
                        color={item.color}
                        key={item.id}
                        id={item.id}
                        isInCart={cartProducts.includes(item)}
                        isOrder={false}
                     />
                  );
               })
            )}
         </div>
      </div>
   );
}

export default Items;
