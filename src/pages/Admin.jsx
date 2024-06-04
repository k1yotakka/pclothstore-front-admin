import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import axiosInstance from '../interceptor';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
   const navigate = useNavigate();
   const { accessToken, user } = useAuth();

   useEffect(() => {
      if (localStorage.getItem('accessToken') == null) {
         navigate('/auth');
      }
      console.log(JSON.parse(localStorage.getItem("user") ))

      
      if (JSON.parse(localStorage.getItem('user')).role !== 'ADMIN') {
         navigate('/');
      }
   }, [accessToken, navigate]);

   const [products, setProducts] = useState([]);
   const [users, setUsers] = useState([]);
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [updateProduct, setUpdateProduct] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);

            const usersResponse = await axiosInstance.get('/api/customer');
            setUsers(usersResponse.data);

            const productsResponse = await axiosInstance.get('/api/product');
            setProducts(productsResponse.data);

            const categoriesResponse = await axiosInstance.get('/api/category');
            setCategories(categoriesResponse.data);

            setIsLoading(false);
         } catch (error) { 
            alert('Ошибка при получения данных');
         }
      };

      fetchData();
   }, []);

   const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      description: '',
      category: '',
      size: '',
      color: '',
      imageUrl: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (updateProduct) {
         setUpdateProduct({
            ...updateProduct,
            [name]: value,
         });
      } else {
         setNewProduct({
            ...newProduct,
            [name]: value,
         });
      }
   };

   const handleCategoryChange = (e) => {
      const selectedCategory = categories.find(category => category.id === parseInt(e.target.value));
      if (updateProduct) {
         setUpdateProduct({
            ...updateProduct,
            category: selectedCategory,
         });
      } else {
         setNewProduct({
            ...newProduct,
            category: selectedCategory,
         });
      }
   };

   const addProduct = async () => {
      try {
         await axiosInstance.post('/api/product', {
            ...newProduct,
            category: {
               id: newProduct.category.id,
            },
         });

         window.location.reload();
      } catch (error) {
         alert('Ошибка при добавлении продукта');
      }
   };

   const updateProductHandler = async () => {
      try {
         await axiosInstance.put(`/api/product`, {
            ...updateProduct,
            category: {
               id: updateProduct.category.id,
            },
         });

         window.location.reload();
      } catch (error) {
         alert('Ошибка при обновлении продукта');
      }
   };

   const removeProduct = async (id) => {
      try {
         await axiosInstance.delete(`/api/product/${id}`);
         setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
         alert('Ошибка при удалении продукта');
      }
   };

   const editProduct = (product) => {
      setUpdateProduct(product);
   };

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <Navbar />
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Панель Администратора</h1>
            <div className="mb-8">
               <h2 className="text-xl font-semibold mb-2">
                  {updateProduct ? 'Update Product' : 'Add Product'}
               </h2>
               <div className="flex flex-col space-y-4">
                  <input
                     type="text"
                     name="name"
                     value={
                        updateProduct ? updateProduct.name : newProduct.name
                     }
                     onChange={handleChange}
                     placeholder="Name"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                     type="number"
                     name="price"
                     value={
                        updateProduct ? updateProduct.price : newProduct.price
                     }
                     onChange={handleChange}
                     placeholder="Price"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <textarea
                     name="description"
                     value={
                        updateProduct
                           ? updateProduct.description
                           : newProduct.description
                     }
                     onChange={handleChange}
                     placeholder="Description"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <select
                     name="category"
                     value={
                        updateProduct
                           ? updateProduct.category.id
                           : newProduct.category.id
                     }
                     onChange={handleCategoryChange}
                     className="p-2 border border-gray-300 rounded"
                  >
                     <option value="">Select Category</option>
                     {categories.map(category => (
                        <option key={category.id} value={category.id}>
                           {category.name}
                        </option>
                     ))}
                  </select>

                  
                  <input
                     type="text"
                     name="size"
                     value={
                        updateProduct ? updateProduct.size : newProduct.size
                     }
                     onChange={handleChange}
                     placeholder="Size"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                     type="text"
                     name="color"
                     value={
                        updateProduct ? updateProduct.color : newProduct.color
                     }
                     onChange={handleChange}
                     placeholder="Color"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                     type="text"
                     name="imageUrl"
                     value={
                        updateProduct
                           ? updateProduct.imageUrl
                           : newProduct.imageUrl
                     }
                     onChange={handleChange}
                     placeholder="Image URL"
                     className="p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                     onClick={updateProduct ? updateProductHandler : addProduct}
                     className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-800 "
                  >
                     {updateProduct ? 'Update Product' : 'Add Product'}
                  </button>
               </div>
            </div>
            <div className="mb-8">
               <h2 className="text-2xl font-semibold mb-4 text-gray-600">Список Товаров</h2>
               <div className="overflow-x-auto shadow-lg rounded-lg">
                  <table className="min-w-full bg-white border border-gray-300">
                     <thead>
                        <tr className="bg-gray-300">
                           <th className="px-4 py-2 border-b text-left">ID</th>
                           <th className="px-4 py-2 border-b text-left">Name</th>
                           <th className="px-4 py-2 border-b text-left">Price</th>
                           <th className="px-4 py-2 border-b text-left">Description</th>
                           <th className="px-4 py-2 border-b text-left">Category</th>
                           <th className="px-4 py-2 border-b text-left">Size</th>
                           <th className="px-4 py-2 border-b text-left">Color</th>
                           <th className="px-4 py-2 border-b text-left">Image URL</th>
                           <th className="px-4 py-2 border-b text-left">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.map((product) => (
                           <tr key={product.id} className="hover:bg-gray-100">
                              <td className="px-4 py-2 border-b">{product.id}</td>
                              <td className="px-4 py-2 border-b">{product.name}</td>
                              <td className="px-4 py-2 border-b">${product.price}</td>
                              <td className="px-4 py-2 border-b">{product.description}</td>
                              <td className="px-4 py-2 border-b">{product.category.name}</td>
                              <td className="px-4 py-2 border-b">{product.size}</td>
                              <td className="px-4 py-2 border-b">{product.color}</td>
                              <td className="px-4 py-2 border-b">{product.imageUrl}</td>
                              <td className="px-4 py-2 border-b">
                                 <div className="flex space-x-2">
                                    <button
                                       onClick={() => editProduct(product)}
                                       className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gray-800 transition-all duration-300"
                                    >
                                       Edit
                                    </button>
                                    <button
                                       onClick={() => removeProduct(product.id)}
                                       className="bg-red-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-900 transition-all duration-300"
                                    >
                                       Remove
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            <div>
               <h2 className="text-2xl font-semibold mb-4 text-gray-600">Список Пользователей</h2>
               <div className="overflow-x-auto shadow-lg rounded-lg">
                  <table className="min-w-full bg-white border border-gray-300">
                     <thead>
                        <tr className="bg-gray-300">
                           <th className="px-4 py-2 border-b text-left">ID</th>
                           <th className="px-4 py-2 border-b text-left">First Name</th>
                           <th className="px-4 py-2 border-b text-left">Last Name</th>
                           <th className="px-4 py-2 border-b text-left">Email</th>
                           <th className="px-4 py-2 border-b text-left">Role</th>
                        </tr>
                     </thead>
                     <tbody>
                        {users.map((user) => (
                           <tr key={user.id} className="hover:bg-gray-100">
                              <td className="px-4 py-2 border-b">{user.id}</td>
                              <td className="px-4 py-2 border-b">{user.firstName}</td>
                              <td className="px-4 py-2 border-b">{user.lastName}</td>
                              <td className="px-4 py-2 border-b">{user.email}</td>
                              <td className="px-4 py-2 border-b">{user.role}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Admin;
