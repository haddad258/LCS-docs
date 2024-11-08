import React from 'react'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PaymentModes = React.lazy(() => import('src/viewConfig/payment.configs'))
const Profiles = React.lazy(() => import('src/viewConfig/profilesId'))

const Customers = React.lazy(() => import('src/viewConfig/customers'))
const CustomersInfo = React.lazy(() => import('src/viewConfig/customers/info'))
const PaymentCards = React.lazy(() => import('src/viewConfig/customers/payment.cards'))

const Subscriptions = React.lazy(() => import('src/viewConfig/customers/subscriptions'))
const Providers = React.lazy(() => import('src/viewConfig/providers'))
const Publications = React.lazy(() => import('src/viewConfig/providers/Publications'))
const ProviderCalendars = React.lazy(() => import('src/viewConfig/providers/calendars'))

const Categories = React.lazy(() => import('src/viewConfig/categories'))
const Items = React.lazy(() => import('src/viewConfig/items'))
const itemsKits = React.lazy(() => import('src/viewConfig/itemsKits'))
const Brands = React.lazy(() => import('src/viewConfig/brands'))
const Discounts = React.lazy(() => import('src/viewConfig/discounts'))
const Advertisements = React.lazy(() => import('src/viewConfig/advertisement'))
const Articles = React.lazy(() => import('src/viewConfig/articles'))
const Placks = React.lazy(() => import('src/viewConfig/placks'))
const ArticlesDiscounts = React.lazy(() => import('src/viewConfig/articles/discounts.articles'))
const ArticlesPlacks = React.lazy(() => import('src/viewConfig/articles/articles.placks'))
const ArticlesProviders = React.lazy(() => import('src/viewConfig/articles/articles.providers'))
const ArticlesNotes = React.lazy(() => import('src/viewConfig/articles/articles.notes'))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const StatusOrders = React.lazy(() => import('src/viewConfig/orders/orders.status'))
const Orders = React.lazy(() => import('src/viewConfig/orders/index'))
const OrdersDetails = React.lazy(() => import('src/viewConfig/orders/orders.details/index'))



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Page404 = React.lazy(() => import('src/Templates/pages/page404/Page404'))

const RouteConfig = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/settings/customers', name: 'Customers', element: Customers },
  { path: '/settings/subscriptions/customers', name: 'Subscriptions', element: Subscriptions },
  { path: '/settings/info/customers', name: 'CustomersInfo', element: CustomersInfo },
  { path: '/settings/payments/cards/customers', name: 'PaymentCards', element: PaymentCards },
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  { path: '/settings/providers', name: 'Providers', element: Providers },
  { path: '/settings/calendars/providers', name: 'ProviderCalendars', element: ProviderCalendars },
  { path: '/settings/publications/providers', name: 'Publications', element: Publications },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  { path: '/settings/payment/mode', name: 'PaymentModes', element: PaymentModes },
  { path: '/settings/profiles/list', name: 'Profiles', element: Profiles },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  { path: '/settings/categories', name: 'Categories', element: Categories },
  { path: '/settings/items', name: 'Items', element: Items },
  { path: '/settings/itemskits', name: 'itemsKits', element: itemsKits },
  { path: '/settings/brands', name: 'Brands', element: Brands },
  { path: '/settings/discounts', name: 'Discounts', element: Discounts },
  { path: '/settings/advertisements', name: 'Advertisements', element: Advertisements },


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  { path: '/settings/articles', name: 'Articles', element: Articles },
  { path: '/settings/discount/view/config/articles', name: 'ArticlesDiscounts', element: ArticlesDiscounts },
  { path: '/settings/placks', name: 'Placks', element: Placks },
  { path: '/settings/placks/view/config/articles', name: 'ArticlesPlacks', element: ArticlesPlacks },
  { path: '/settings/providers/view/config/articles', name: 'ArticlesProviders', element: ArticlesProviders },
  { path: '/settings/crm/review/note/articles', name: 'ArticlesNotes', element: ArticlesNotes },
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: '/accounts/settings/status/orders', name: 'StatusOrders', element: StatusOrders },
  { path: '/accounts/settings/orders', name: 'Orders', element: Orders },
  { path: '/accounts/settings/details/orders', name: 'OrdersDetails', element: OrdersDetails },
  


  { path: '/*', name: 'PageNotFound', element: Page404 },
]

export default RouteConfig
