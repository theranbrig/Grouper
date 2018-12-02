import styled from 'styled-components';

const FormStyles = styled.div`
	margin: 10px 0 0;
	color: white;
	font-family: 'Roboto', sans-serif;
	padding: 0 0 150px;
	h1 {
		letter-spacing: 0.1rem;
		color: ${props => props.theme.orange};
		padding: 40px 0;
		font-family: 'Lobster', cursive;
		font-size: 4rem;
	}
	label {
		font-size: 1.4rem !important;
		letter-spacing: 0.1rem;
	}
	button {
		color: ${props => props.theme.orange} !important;
		font-size: 2rem !important;
		margin: 15px 10% 30px !important;
		width: 80%;
		font-family: 'Lobster', sans-serif !important;
		text-align: center;
		padding: 10px 0;
	}
	a {
		color: ${props => props.theme.orange} !important;
		font-size: 1.5rem;
	}
	input {
		margin: 20px 0 !important;
	}
	p {
		color: ${props => props.theme.black};
	}
`;

export default FormStyles;
