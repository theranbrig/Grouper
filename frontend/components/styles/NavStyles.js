import styled from 'styled-components';

const NavStyles = styled.ul`
	margin-top: 0 !important;
	padding: 16px 0 0 0;
	display: flex;
	height: 60px;
	justify-self: end;
	font-size: 1.2rem;
	@media (max-width: 700px) {
		padding: 8px 0 0;
	}
	p,
	a,
	button {
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		position: relative;
		text-transform: uppercase;
		font-size: 1.2rem;
		background: none;
		border: 0;
		text-decoration: none;
		color: ${props => props.theme.darkBlue};
		letter-spacing: 0.1rem;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
		@media (max-width: 700px) {
			font-size: 10px;
			padding: 0 10px;
		}
		&:last-child {
			border-right: none;
		}
		&:hover {
			border-bottom: 3px ${props => props.theme.orange} solid;
		}
	}
	@media (max-width: 1300px) {
		width: 100%;
		justify-content: center;
		margin: 10px 0;
		a {
			font-size: 1.2rem;
		}
	}
`;

export default NavStyles;
