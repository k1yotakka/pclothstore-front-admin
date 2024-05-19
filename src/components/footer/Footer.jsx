import React from 'react';

const Footer = () => {
   return (
      <footer className="bg-gray-800 text-white py-8 px-4 mb-[-10px] w-full">
         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            {/* Left side - Company info */}
            <div className="mb-4 md:mb-0">
               <h2 className="text-2xl font-semibold">P-Cloth Store</h2>
               <p className="text-sm">
                  515 Jandosova, Almaty, Kazakhstan 111000
               </p>
            </div>

            {/* Right side - Links */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
               <a href="#" className="hover:underline">
                  About Us
               </a>
               <a href="#" className="hover:underline">
                  Contact
               </a>
               <a href="#" className="hover:underline">
                  Privacy Policy
               </a>
            </div>
         </div>

         {/* Bottom - Copyright */}
         <div className="text-center mt-8 text-sm">
            &copy; {new Date().getFullYear()} P-Cloth Store. All rights
            reserved.
         </div>
      </footer>
   );
};

export default Footer;
