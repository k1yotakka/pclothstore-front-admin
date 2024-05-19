import React, { useState } from 'react';
import axiosInstance from '../../interceptor';

const UserPopup = ({ user, closePopup, logout }) => {
   const [firstName, setFirstName] = useState(user.firstName);
   const [lastName, setLastName] = useState(user.lastName);
   const [email, setEmail] = useState(user.email);
   const [userId, setUserId] = useState(user.userId)
   const [password, setPassword] = useState('');

   const handleSave = async () => {
 
      const response = await axiosInstance.put(`/api/customer/${userId}`, {
         email:user.email,
         firstName,
         lastName,
         password
      });
      const newUser = {
         userId: response.data.id,
         firstName: response.data.firstName,
         lastName: response.data.lastName,
         email: response.data.email,
         token: localStorage.getItem('accessToken')
      }
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(newUser));
      console.log(localStorage.getItem('user'));
      closePopup();
      window.location.reload();
   };

   const handleLogout = () => {
      logout();
      closePopup();
      window.location.reload();
   };

   return (
      <div style={popupStyles}>
         <div style={popupContentStyles}>
            <h2 className="text-2xl font-bold mb-4">Edit User Data</h2>
            <label className="block mb-2">
               First Name:
               <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1"
               />
            </label>
            <label className="block mb-2">
               Last Name:
               <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1"
               />
            </label>
            <label className="block mb-4">
               Email:
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1"
               />
            </label>
            <label className="block mb-4">
               Password:
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded mt-1"
               />
            </label>
            <div className="flex justify-between">
               <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
               >
                  Save
               </button>
               <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded"
               >
                  Logout
               </button>
               <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
               >
                  Close
               </button>
            </div>
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
   width: '300px',
};

export default UserPopup;
