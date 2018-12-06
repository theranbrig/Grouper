import styled from 'styled-components';

const ListsStyles = styled.div`
	color: ${props => props.theme.offWhite};
	margin-top: 10px;
	font-family: 'Roboto', sans-serif;
	h1,
	h2 {
		font-family: 'Lobster Two', cursive;
		color: ${props => props.theme.orange};
		letter-spacing: 0.15rem;
	}
	h1 {
		font-size: 4rem;
	}
	h2 {
		font-size: 3rem;
	}
	.header {
		font-size: 1.5rem !important;
	}
	.description {
		font-size: 1.2rem !important;
		padding-top: 10px;
	}
	.ui.inverted.segment {
		background: ${props => props.theme.darkBlue};
	}
	.ui.list {
		padding-bottom: 50px;
	}
	i {
		width: 20px;
		padding-right: 10px;
		margin-bottom: 10px;
	}
`;

export default ListsStyles;
