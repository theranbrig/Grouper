import styled from 'styled-components';

const IndividualListStyles = styled.div`
	min-height: 90vh;
	margin-top: 10px;
	color: ${props => props.theme.offWhite};
	h1 {
		color: ${props => props.theme.orange} !important;
		font-family: 'Lobster', cursive;
		font-size: 3.5rem;
		padding-top: 20px;
	}
	button {
		margin-top: 5px !important;
	}
	.header {
		padding: 5px 0 !important;
		font-size: 1.2rem;
	}
	.ui.inverted.segment {
		background: ${props => props.theme.darkBlue};
	}
`;

export default IndividualListStyles;
