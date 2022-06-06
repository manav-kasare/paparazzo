import React, {useCallback, useContext, useState} from 'react';
import {dark} from '../constants';
import {ITheme, IUseData, IUser} from '../constants/types';

export const DataContext = React.createContext({});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ITheme>(dark);
  const [user, setUser] = useState<IUser | null>(null);

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );

  const contextValue = {
    theme,
    setTheme,
    user,
    handleUser,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
