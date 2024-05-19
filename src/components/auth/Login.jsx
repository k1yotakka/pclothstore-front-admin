import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLogin }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login } = useAuth();
   const navigate = useNavigate();

   console.log(localStorage.getItem('accessToken'));

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await login({ email, password }).then(() => {
            navigate('/home');
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Вход</h2>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="email"
                  >
                     Email
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="mb-6">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="password"
                  >
                     Пароль
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="password"
                     type="password"
                     placeholder="Пароль"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="flex items-centerjustify-between">
                  <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                  >
                     Войти
                  </button>
               </div>
            </form>
            <span>Еще нет аккаунта?  </span>
            <span
               className="cursor-pointer text-[#5d5c5c] underline mt-2"
               onClick={() => {
                  setIsLogin(false);
               }}
            >
               Зарегистрируйтесь
            </span>
         </div>
      </div>
   );
}

export default Login;
