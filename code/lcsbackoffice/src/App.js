import React, { Suspense, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import AuthGuard from './hooks/auth/AuthGuard';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./Templates/pages/login/Login'));
const LoginUser = React.lazy(() => import('./Templates/pages/loginUser/Login'));
const Register = React.lazy(() => import('./Templates/pages/register/Register'));
const Page404 = React.lazy(() => import('./Templates/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./Templates/pages/page500/Page500'));
const PaymentModule = React.lazy(() => import('./payment/index'));

// Define your routes as an array
const routes = [
  {
    element: (
      <AuthGuard>
        <DefaultLayout />
      </AuthGuard>
    ),
    children: [
   
      {
        path: '/*',
        element: <DefaultLayout />,
      },

    ]
  },
  { path: '/', element: <Login /> },
  { path: '/test/admin', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/login/user', element: <LoginUser /> },
  { path: '/register', element: <Register /> },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/payment', element: <PaymentModule /> },
];

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  useEffect(() => {
   

    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
  
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, [setColorMode, isColorModeSet, storedTheme, navigate]);

  // Use the useRoutes hook to get the matched element
  const content = useRoutes(routes);

  return (
    <>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        {content}
      </Suspense>
    </>
  );
};

export default App;
