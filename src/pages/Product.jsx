import Footer from '../components/footer/Footer';  
import Navbar from '../components/navbar/Navbar';  
import { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { useParams } from 'react-router-dom';  
import axiosInstance from '../interceptor'; 
  
function Product() {   
  
   const { id } = useParams();  
   const [product, setProduct] = useState(null)  
   const [isLoading, setIsLoading] = useState(true)  
  
  
   const accessToken = localStorage.getItem('accessToken')  
   const navigate = useNavigate();  
   useEffect(() => {  
      console.log('accessToken:', accessToken);  
      if (accessToken == null) {  
         navigate('/auth');  
      }  
   }, [accessToken, navigate]);  
  
   useEffect(() => {  
      const fetchData = async () => {  
         try {  
            const response = await axiosInstance.get(`/api/product/${id}`);  
            setProduct(response.data); 
            setIsLoading(false);  
         } catch (error) {  
            console.log(error);  
            setIsLoading(false);  
         }  
      };  
  
      fetchData();  
   }, [id]);  
  
   const containerStyle = {  
      minHeight: `calc(100vh - 16.25rem)`,  
   };  
  
   const user = JSON.parse(localStorage.getItem('user'))  
  
   const addToCart = async () => {  
         await axiosInstance.post('/api/cart', {  
            userId: user.userId,  
            product: {  
               id:id  
            }  
         });  
   };  
  
   if (isLoading){  
      return <span>Loading...</span>  
   }  
  
   return (  
      <>  
         <Navbar />  
  
         <div  
            className="w-[1400px] m-auto mt-8 flex-1 flex"  
            style={containerStyle}  
         >  
            {/* Image */}  
            <div className="w-[350px] h-[350px] border rounded-2xl mr-8">  
               <img  
                  className="w-full"  
                  src={product.imageUrl}  
                  alt="product"  
               />  
            </div>  
  
            {/* Product Info */}  
            <div className="flex-1 flex flex-col h-[350px] justify-between">  
               {/* Title */}  
               <div>  
                  <span className="font-inter font-[500] text-2xl mb-4">  
                     {product.name}  
                  </span>  
                  <br />  
  
                  {/* Description */}  
                  <span className="text-gray-600 mb-4">  
                     {' '}  
                     {/* Add margin-bottom to the description */}  
                     {product.description}  
                  </span>  
               </div>  
 
            {/* Size, Color, and Category */} 
          <div className="space-y-4"> 
            {/* Size Options */} 
            {product.size && ( // Use product.size directly 
              <div> 
                <label className="block text-sm font-medium text-gray-700">Size:</label> 
                <p className="mt-1 text-sm text-gray-500">{product.size}</p>  
              </div> 
            )} 
 
            {/* Color Options */} 
            {product.color && ( // Use product.color directly 
              <div> 
                <label className="block text-sm font-medium text-gray-700">Color:</label> 
                <div className="mt-1 flex items-center space-x-3"> 
                  <div className="relative"> 
                    <input type="radio" name="color" value={product.color} checked className="sr-only" id={`color-${product.color}`} /> 
                    <label htmlFor={`color-${product.color}`} className="block h-6 w-6 rounded-full border-2 border-gray-300 ring-2 ring-blue-500" style={{ backgroundColor: product.color }} />  
                  </div> 
                </div> 
              </div> 
            )} 
 
            {/* Category */} 
            {product.category && ( // Use product.category directly 
              <div> 
                <label className="block text-sm font-medium text-gray-700">Category:</label> 
                <p className="mt-1 text-smtext-gray-500">{product.category.name}</p>  
              </div> 
            )} 
          </div> 
  
               {/* Price */}  
               <div className="flex items-center">  
                  {' '}  
                  {/* Container for price and button */}  
                  <span className="text-2xl font-semibold">${product.price}</span>  
                  <button   
                     onClick={()=>{  
                        addToCart()  
                     }}  
                     className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4">  
                        Add to Cart  
                  </button>  
               </div>  
            </div>  
         </div>  
  
         <Footer />  
      </>  
   );  
}  
  
export default Product;