import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Privacy Policy</h1>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            At P-Cloth Store, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Information Collection</h2>
                        <p>
                            We collect information that you provide to us directly, such as when you create an account, make a purchase, or contact us for support. We also collect information automatically as you navigate through the site, such as IP addresses and browsing behavior.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Information Use</h2>
                        <p>
                            We use your information to provide, maintain, and improve our services, process transactions, and communicate with you. We may also use your information for marketing purposes, such as sending promotional emails, which you can opt out of at any time.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Information Protection</h2>
                        <p>
                            We implement a variety of security measures to protect your personal information from unauthorized access, use, or disclosure. We use encryption, secure servers, and other technologies to ensure the safety of your data.
                        </p>
                        <p>
                            By using our website, you consent to the terms of this Privacy Policy. We may update this policy from time to time, and any changes will be posted on this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
