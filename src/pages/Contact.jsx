import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Свзь С Нами</h1>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            We'd love to hear from you! If you have any questions or feedback, feel free to reach out to us.
                        </p>
                        <div className="space-y-4">
                            <p>
                                <strong>Email:</strong> <a href="mailto:contact@pclothstore.com" className="text-blue-500 hover:underline">contact@pclothstore.com</a>
                            </p>
                            <p>
                                <strong>Phone:</strong> <a href="tel:+77771234567" className="text-blue-500 hover:underline">+7 (777) 123-4567</a>
                            </p>
                            <p>
                                <strong>Address:</strong> 515 Jandosova, Almaty, Kazakhstan 111000
                            </p>
                        </div>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-800"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
