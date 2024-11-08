import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge, indent = false) => {

    return (
      <div style={{ display: "flex", alignItems: "center", color: "white" }}>
        <>
          {icon ? (
            icon
          ) : (
            indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )
          )}
          {name && name}
          {badge && (
            <CBadge color={badge.color} className="ms-auto">
              {badge.text}
            </CBadge>
          )}
        </>
      </div>
    )
  }
  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    const isActive = location.pathname === item.to;

  return (
    <NavLink style={{ textDecoration: "none", backgroundColor: "#FFAAFF" }} to={item.to}>
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        style={{
          backgroundColor: isActive ? "#96a4f7" : null, // Apply active color here
        }}
      >
        {navLink(name, icon, badge, indent)}
      </Component>
    </NavLink>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
      <Component
        compact
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }
  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
