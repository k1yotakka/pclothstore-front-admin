import { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

function Auth() {
   const [isLogin, setIsLogin] = useState(true);

   return (
      <>
         {isLogin ? (
            <Login setIsLogin={setIsLogin} />
         ) : (
            <Register setIsLogin={setIsLogin} />
         )}
      </>
   );
}

export default Auth;
