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
		padding: 5px 0 10px !important;
		font-size: 1.5rem;
	}
	.ui.inverted.segment {
		background: ${props => props.theme.darkBlue};
	}
  .in-cart {
    background-color: ${props => props.theme.orange} !important;
    .header {
      color: ${props => props.theme.black}
    }
    i {
      color: ${props => props.theme.black};
    }
  }
  .out-cart {
    div.header {
      color: ${props => props.theme.orange} !important;
    }
    i {
      color: ${props => props.theme.orange};
    }
  }
`;

export default IndividualListStyles;
