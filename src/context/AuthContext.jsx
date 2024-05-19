import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
   accessToken: null,
   user: null,
   login: () => {},
   logout: () => {},
});

export const AuthProvider = ({ children }) => {
   const [accessToken, setAccessToken] = useState(null);
   const [user, setUser] = useState(null);

   const login = async ({ email, password }) => {
      try {
         const response = await axios.post(
            // здесь тоже поменять
            'http://localhost:8080/api/v1/auth/authenticate',
            {
               email,
               password,
            },
            {
               ContentType: 'application/json',
            },
         );

         setAccessToken(response.data.token);
         setUser(response.data);
         localStorage.setItem('accessToken', response.data.token);
         localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
         console.log(error);
      }
   };

   // (* читать этот коммент после того как прочитал комменты в файле src/components/auth/Register.jsx) новые поля добавить сюда
   const register = async ({ email, password, firstname, lastname }) => {
      try {
         const response = await axios.post(
            // здесь тоже поменять
            'http://localhost:8080/api/v1/auth/register',
            {
               email,
               password,
               first_name: firstname,
               last_name: lastname,
            },
            {
               ContentType: 'application/json',
            },
         );

         setAccessToken(response.data.token);
         setUser(response.data);
         localStorage.setItem('accessToken', response.data.token);
         localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
         console.log(error);
      }
   };

   const logout = () => {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
   };

   return (
      <AuthContext.Provider
         value={{
            accessToken: accessToken,
            user: user,
            login,
            register,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
