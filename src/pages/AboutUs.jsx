import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const AboutUs = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex-grow">
                <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">О Нас</h1>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Welcome to P-Cloth Store! We are a dedicated team providing high-quality clothing and accessories. Our mission is to offer our customers the best products and services.
                        </p>
                        <p>
                            Located in Almaty, Kazakhstan, we are committed to sustainability and innovation in the fashion industry. We believe in creating fashion that not only looks good but also feels good and does good for the planet.
                        </p>
                        <p>
                            Our team consists of passionate individuals who strive to bring you the latest trends and timeless pieces that you can cherish for years to come. We take pride in our attention to detail and our commitment to customer satisfaction.
                        </p>
                        <p>
                            Thank you for choosing P-Cloth Store. We look forward to serving you and helping you express your unique style.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
