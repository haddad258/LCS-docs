import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import useAuth from 'src/hooks/useAuth';
import { AppSidebarNav } from './AppSidebarNav';
import Paths from 'src/services/common.settings/config';
import _navAdmin from 'src/navigations/navigationAdmin';
import _navComponenet from 'src/navigations/_navComponenet';
import i18n from 'src/i18n';
function renderSidebarNav(user) {
  if (user.privilege === 'design') {
    return <AppSidebarNav items={_navComponenet} />;
  } else if (user.privilege === 'SUADMIN') {
    return <AppSidebarNav items={_navAdmin} />;
  }
  return null;
}
function renderSidebarNavRH(user) {
  if (user.privilege === 'design') {
    return <AppSidebarNav items={_navComponenet} />;
  } else if (user.privilege === 'SUADMINRH') {
    return <AppSidebarNav items={_navAdmin} />;
  } else if (user.privilege === 'SUADMINRH') {
    return <AppSidebarNav items={_navAdmin} />;

  }
  return null;
}
function AppSidebar() {
  const dispatch = useDispatch();
  const { sidebarUnfoldable } = useSelector((state) => state);
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const { user } = useAuth();

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img src={Paths.appSrcLogo} alt="Logo" height={32}  />
          <span 
          className="small text-body-secondary"
          style={{ textDecoration: 'none', marginLeft: '8px' }}
          >{i18n.t('SISidebarTitle')}</span>
          {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> */}
          <CIcon customClassName="sidebar-brand-narrow" icon={"sygnet"} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <CSidebarNav>
        <SimpleBar>{renderSidebarNav(user)}</SimpleBar>
        <SimpleBar>{renderSidebarNavRH(user)}</SimpleBar>
      </CSidebarNav>
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !sidebarUnfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
}

export default React.memo(AppSidebar);