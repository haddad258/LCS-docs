import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserLogin } from 'src/services';
const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };


const setSession = (accessToken, accessUser) => {
  return new Promise((resolve) => {
    if (accessToken) {
      localStorage.setItem('@accessToken', accessToken);
      localStorage.setItem('@accessUser', accessUser);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('@accessToken');
      localStorage.removeItem('@accessUser');
      delete axios.defaults.headers.common.Authorization;
    }
    resolve();
  });
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }
    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }
    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => { },
  logout: () => { },
  register: () => { },
  checklogin: () => { },
  loginEmploye:()=>{}
  
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (email, password) => {
    try {
      const response = await UserLogin.UserLogin({ email, password });
      if (response) {
        await Promise.all([
          setSession(response.token, JSON.stringify(response.user)),
          dispatch({ type: 'LOGIN', payload: { user: response.user } })
        ]);
        return true;
      } else {
        setSession();
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setSession();
      return false;
    }
    
  };
  const loginEmploye = async (email, password) => {
    try {
      const response = await UserLogin.UserLoginEmploye({ email, password });
      if (response) {
        setSession(response.token, JSON.stringify(response.user))
        dispatch({ type: 'LOGIN', payload: { user: response.user } });
        return true;
      } else {
        setSession()
        return false
      }


    } catch (error) {
      console.error('Login failed:', error);
      setSession()
      return false;
    }
  };
  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    setSession()
    dispatch({ type: 'LOGOUT' });
  };
  const checklogin = () => {
      const accessToken = localStorage.getItem('@accessToken');
      if (accessToken) {
        try {
          const userData = JSON.parse(localStorage.getItem('@accessUser'));
          if (userData) {
            dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: userData } });
           return true
          } else {
            console.error('User data not found in localStorage');
            dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
            return false
          }
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
          return false
        }
      } else {
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
        return false
      }
  }
  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('@accessToken');
      if (accessToken) {
        try {
          const userData = JSON.parse(localStorage.getItem('@accessUser'));
          if (userData) {
            dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: userData } });
          } else {
            console.error('User data not found in localStorage');
            dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
          }
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
        }
      } else {
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);
  // SHOW LOADER
  if (!state.isInitialised) return <p>hee</p>;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register,checklogin, loginEmploye }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
