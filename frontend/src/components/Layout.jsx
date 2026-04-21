import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';

const Layout = ({ children, user }) => {

    // Kita pindahkan fungsi Logout ke sini supaya bisa dipakai 
    // oleh Navbar dan Sidebar sekaligus (terpusat)
    const onLogout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout', {
                withCredentials: true
            });
            window.location.href = "/"; 
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar di paling atas */}
            <Navbar user={user} logout={onLogout} />

            <div className="flex">
                {/* Sidebar di kiri */}
                <Sidebar user={user} logout={onLogout} />

                <main className="flex-1 md:ml-64">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;