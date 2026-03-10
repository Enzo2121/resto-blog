import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-400 py-6 text-center text-sm border-t border-gray-700">
            <div className="container mx-auto px-4">
                &copy; {currentYear} Mon Restaurant. Tous droits réservés.
            </div>
        </footer>
    );
}
