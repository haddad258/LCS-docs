import React from 'react'

const UsersAdmin = React.lazy(() => import('../viewSuperAdmin/userAdmin'))
const Reporting = React.lazy(() => import('../viewSuperAdmin/reporting'))
const Privileges = React.lazy(() => import('src/viewSuperAdmin/privileges'))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Page404 = React.lazy(() => import('src/Templates/pages/page404/Page404'))

const routeSupper = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/supper/view/applications/reporting', name: 'Reporting', element: Reporting },
  { path: '/supper/settings/admins/users/list', name: 'UserList', element: UsersAdmin },
  { path: '/supper/settings/privilege/users/list', name: 'Privileges', element: Privileges },
  { path: '/*', name: 'PageNotFound', element: Page404 },
]

export default routeSupper
