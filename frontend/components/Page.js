import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';

const theme = {
  darkBlue: '#4f5d75',
  orange: '#ef8354',
  lightGrey: '#bfc0c0',
  black: '#2d3142',
  offWhite: '#fefefe',
};

const StyledPage = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  margin: 0 auto;
  background: ${props => props.theme.black};
`;

injectGlobal`
	html {
		box-sizing: border-box;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}

	body {
		padding: 0;
		margin: 0;
	}
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      <Header />
      <div />
      <Inner>{props.children}</Inner>
    </StyledPage>
  </ThemeProvider>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
