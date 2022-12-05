import {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import {firebase, auth} from '../firebase';

const AuthContext = createContext<{user: firebase.User | null}>({
  user: null,
});

interface State {
  user: firebase.User | null;
  isLoading: boolean;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<State>({
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setState({user, isLoading: false});
    });
    return unsubscribed;
  }, []);
  return (
    <AuthContext.Provider value={{user: state.user}}>
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
