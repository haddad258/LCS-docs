import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilSettings,
} from '@coreui/icons'
import { CNavGroup, CNavItem, /* CNavTitle */ } from '@coreui/react'
import i18n from 'src/i18n'
const _navAdmin = [
  {
    component: CNavGroup,
    name: i18n.t('dashboardMenuTitle'),
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('reportingMenuTitle'),
        to: '/supper/view/applications/reporting',
      },
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('generalSettingsMenuTitle'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: i18n.t('privilegesMenuTitle'),
        to: '/supper/settings/privilege/users/list',
      },
      {
        component: CNavItem,
        name: i18n.t('usersMenuTitle'),
        to: '/supper/settings/admins/users/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('SettingsCustomers'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: i18n.t('CustomersList'),
        to: '/settings/customers',
      },
      {
        component: CNavItem,
        name: i18n.t('customerInfo'),
        to: '/settings/info/customers',
      },
      {
        component: CNavItem,
        name: i18n.t('Subscriptions'),
        to: '/settings/subscriptions/customers',
      },
      {
        component: CNavItem,
        name: i18n.t('PaymentCardsList'),
        to: '/settings/payments/cards/customers',
      },
      
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('Settingsproviders'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: i18n.t('providersList'),
        to: '/settings/providers',
      },
      {
        component: CNavItem,
        name: i18n.t('ArticlesProvidersList'),
        to: '/settings/providers/view/config/articles',
      },
      {
        component: CNavItem,
        name: i18n.t('calendars'),
        to:  '/settings/calendars/providers'
      },

      {
        component: CNavItem,
        name: i18n.t('publications'),
        to: '/settings/publications/providers',
      },
      {
        component: CNavItem,
        name: i18n.t('ReviewNoteCRM'),
        to: '/settings/crm/review/note/articles',
      },
      
     
      
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('Settingsplacks'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: i18n.t('placksList'),
        to: '/settings/placks',
      },
      {
        component: CNavItem,
        name: i18n.t('placksInfo'),
        to: '/settings/placks/view/config/articles',
      },
      {
        component: CNavItem,
        name: i18n.t('discounts'),
        to: '/settings/discounts',
      },
      {
        component: CNavItem,
        name: i18n.t('discountArticles'),
        to: '/settings/discount/view/config/articles',
      },
      
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('settingsApps'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('PaymentMode'),
        to: '/settings/payment/mode',
      },
      {
        component: CNavItem,
        name: i18n.t('profilesId'),
        to: '/settings/profiles/list',
      },
      
      {
        component: CNavItem,
        name: i18n.t('Categories'),
        to: '/settings/categories',
      },
      {
        component: CNavItem,
        name: i18n.t('Items'),
        to: '/settings/items',
      },
      {
        component: CNavItem,
        name: i18n.t('ItemsKits'),
        to: '/settings/itemskits',
      },
      {
        component: CNavItem,
        name: i18n.t('Brands'),
        to: '/settings/brands',
      },
      {
        component: CNavItem,
        name: i18n.t('articles'),
        to: '/settings/articles',
      },
      {
        component: CNavItem,
        name: i18n.t('advertisements'),
        to: '/settings/advertisements',
      },
      
    ],
  },

  {
    component: CNavGroup,
    name: i18n.t('SettingsOrders'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
  
      {
        component: CNavItem,
        name: i18n.t('StatusOrders'),
        to: '/accounts/settings/status/orders',
      },
      {
        component: CNavItem,
        name: i18n.t('ordersList'),
        to: '/accounts/settings/orders',
      },
      {
        component: CNavItem,
        name: i18n.t('StatusOrders'),
        to: '/accounts/settings/details/orders',
      },
    ],
  },
]

export default _navAdmin
