import { createContext, useContext, useState } from 'react';
import { getUser, signInUser } from '../services/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  const login = async (email, password) => {
      const authenticated = await signInUser({ eamil, password });

      if (authenticated) {
          setUser(authenticated);
      }
  };

  const logout = () => {
      setUser({ eamil: null });
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('userUser must b used in a UserProvider');
    }
    return context;
};
