import styled from 'styled-components';

const FormStyles = styled.div`
	margin: 10px 0 0;
	color: white;
	font-family: 'Roboto', sans-serif;
	padding: 0 0 150px;
	min-height: 95vh;
	h1 {
		letter-spacing: 0.1rem;
		color: ${props => props.theme.orange};
		padding: 40px 0;
		font-family: 'Lobster Two', cursive;
		font-size: 4rem;
	}
	label {
		letter-spacing: 0.1rem;
		margin: 20px 0 !important;
	}
	button {
		color: ${props => props.theme.orange} !important;
		font-size: 2rem !important;
		margin: 15px 10% 30px !important;
		width: 80%;
		font-family: 'Lobster Two', sans-serif !important;
		text-align: center;
		padding: 10px 0;
	}
	a {
		color: ${props => props.theme.orange} !important;
		font-size: 1.5rem;
	}
	p {
		color: ${props => props.theme.black};
	}
	.back-link {
		width: 20%;
		font-size: 1.5rem !important;
		@media (max-width: 750px) {
			width: 70%;
		}
	}
	.edit-list-button {
		margin-top: 30px !important;
    width: 70%;
	}
`;

export default FormStyles;
