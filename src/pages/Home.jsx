import Footer from '../components/footer/Footer';
import Items from '../components/items/Items';
import Navbar from '../components/navbar/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
   const navigate = useNavigate();
   const { accessToken, user } = useAuth();

   useEffect(() => {
      console.log(user);

      if (localStorage.getItem('accessToken') == null) {
         navigate('/auth');
      }
   }, [accessToken, navigate]);
   return (
      <>
         <Navbar />
         <Items />
         <Footer />
      </>
   );
}

export default Home;
