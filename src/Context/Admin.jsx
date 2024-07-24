import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => {
    const savedLoginState = localStorage.getItem('isAdminOfEcommLogin');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isAdminOfEcommLogin', JSON.stringify(isLogin));
  }, [isLogin]);

  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <AdminContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
