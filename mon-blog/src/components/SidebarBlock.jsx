import React from 'react';

export default function SidebarBlock({ title, children }) {
    return (
        <div className="mb-6 border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
            <h3 className="bg-gray-800 text-white px-4 py-2 font-medium text-sm">
                {title}
            </h3>
            <div className="p-3">
                {children}
            </div>
        </div>
    );
}
