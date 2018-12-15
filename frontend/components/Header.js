import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Nav from './Nav';
import Logo from './styles/Logo';
import StyledHeader from './styles/HeaderStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <StyledHeader>
    <Logo className="bar">
      <div>
        <img src="../static/logo.png" alt="Grouper Logo" />
      </div>
      <Nav />
    </Logo>
  </StyledHeader>
);

export default Header;
