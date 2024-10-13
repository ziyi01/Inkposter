import React from 'react';


export {}; //prevents global component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-pink-300 text-white">
            {children}
        </div>
    );
};

export default Layout;