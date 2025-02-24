import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <NavBar></NavBar>
        </div>
        <div className="w-full p-4">
          <Outlet></Outlet>
        </div>
      </div>
     
    </div>
    );
};

export default MainLayout;