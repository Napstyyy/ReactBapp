// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  return (
    <UserContext.Provider value={{ userType, setUserType, userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
