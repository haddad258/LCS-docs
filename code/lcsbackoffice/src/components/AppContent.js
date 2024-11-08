import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import routesTemplate from '../Routes/routesTemplate';
import routeSupper from "../Routes/routes.Supper"
import routeConfig from "../Routes/routes.config"

import useAuth from '../hooks/useAuth';

function AppContent() {
  const { user } = useAuth();
  const routes = user.privilege === 'SUADMIN' ? routeSupper : [];
  const RouteConfig = user.privilege === 'SUADMIN' ? routeConfig : [];
  const routesViewDesign = user.privilege === 'design' ? routesTemplate : [];

  return (
    <div style={{ padding: '2%' }}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) =>
            route.element ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            ) : null
          )}
            {RouteConfig.map((route, idx) =>
            route.element ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            ) : null
          )}
          
          {routesViewDesign.map((route, idx) =>
            route.element ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name} Z
                element={<route.element />}
              />
            ) : null
          )}
 

          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default React.memo(AppContent);
