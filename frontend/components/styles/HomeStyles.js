import styled from 'styled-components';

const HomeStyles = styled.div`
	margin: 10px auto 0;
	background: ${props => props.theme.black};
	color: ${props => props.theme.offWhite};
	text-align: center;
	padding-bottom: 120px;
	min-height: 90vh;
	h1 {
		font-family: 'Lobster Two', cursive;
		color: ${props => props.theme.orange};
		font-size: 5rem;
		letter-spacing: 0.15rem;
		padding: 40px 0 0 0;
	}
	h2 {
		font-family: 'Lobster Two', cursive;
		color: ${props => props.theme.orange};
		font-size: 2rem;
	}
	img {
		margin: 0 0 30px 0;
	}
	a,
	button {
		color: ${props => props.theme.orange};
		font-size: 2rem;
		margin: 15px 10% !important;
		width: 80%;
		font-family: 'Lobster Two', sans-serif;
		text-align: center;
		padding: 10px 0;
	}
	.button-area {
		display: grid;
		padding-top: 20px;
	}
	ul {
		list-style: none;
		padding: 30px 0 0;
	}
	li {
		font-family: 'Roboto', sans-serif;
		font-size: 1.5rem;
		width: 80%;
		margin: 40px 12%;
		text-align: center;
	}
	i {
		margin: 10px 0;
		font-size: 3rem;
		color: ${props => props.theme.orange};
	}
`;

export default HomeStyles;
