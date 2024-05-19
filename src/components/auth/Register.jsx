import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register({ setIsLogin }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const { register } = useAuth();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // (*читать это после того как прочитал остальные комменты ниже) Если добавил какое то новое поле, то добавь его еще и в параметр функции register,
         // затем перейди в файл AuthContext и там тоже написал что нужно изменить
         await register({ email, password, firstname, lastname }).then(() => {
            navigate('/home');
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Регистрация</h2>
            <form onSubmit={handleSubmit}>
               {/* Email */}
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="email"
                  >
                     Почта
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="email"
                     type="email"
                     placeholder="Почта"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               {/* Password */}
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

               {/* Name */}
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="email"
                  >
                     Имя
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="name"
                     type="name"
                     placeholder="Имя"
                     value={firstname}
                     onChange={(e) => setFirstname(e.target.value)}
                  />
               </div>

               {/* Lastname */}
               <div className="mb-4">
                  <label
                     className="block text-gray-700 text-sm font-bold mb-2"
                     htmlFor="email"
                  >
                     Фамилия
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="lastname"
                     type="lastname"
                     placeholder="Фамилия"
                     value={lastname}
                     onChange={(e) => setLastname(e.target.value)}
                  />
               </div>

               {/* Если нужны еще поля можешь копи пастом такой же див создать, и не забудь создать еще state сверху и поменять onChange */}

               <div className="flex items-centerjustify-between">
                  <button
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                  >
                     Зарегистрироваться
                  </button>
               </div>
            </form>
            <span>Уже есть аккаунт? </span>
            <span
               className="cursor-pointer text-[#5d5c5c] underline"
               onClick={() => {
                  setIsLogin(true);
               }}
            >
               Войдите
            </span>
         </div>
      </div>
   );
}

export default Register;
