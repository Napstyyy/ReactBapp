// Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomBottomNavigation from '../../widgets/CustomBottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();

  // Definir las rutas donde quieres que aparezca el BottomNavigationBar
  const routesWithBottomNav = ['/Home'];

  const showBottomNav = routesWithBottomNav.includes(location.pathname);

  return (
    <div className="layout">
      {children}
      {showBottomNav && <CustomBottomNavigation />}
    </div>
  );
};

export default Layout;
