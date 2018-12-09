import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
	darkBlue: '#4f5d75',
	orange: '#ef8354',
	lightGrey: '#bfc0c0',
	black: '#2d3142',
	offWhite: '#fefefe'
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

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<div />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
