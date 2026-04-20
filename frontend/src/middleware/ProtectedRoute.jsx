import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
    // Jika syarat (role/auth) tidak terpenuhi, lempar ke halaman lain
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    // Jika terpenuhi, tampilkan halaman yang dituju
    return children ? children : <Outlet />;
};

export default ProtectedRoute;