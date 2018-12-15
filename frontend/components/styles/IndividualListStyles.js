import styled from 'styled-components';

const IndividualListStyles = styled.div`
  min-height: 90vh;
  margin-top: 10px;
  color: ${props => props.theme.offWhite};
  h1 {
    color: ${props => props.theme.orange} !important;
    font-family: 'Lobster Two', cursive;
    font-size: 3.5rem;
    padding-top: 30px;
  }
  button {
    margin-top: 5px !important;
  }
  .header {
    padding: 5px 0 10px !important;
    font-size: 1.3rem;
  }
  .ui.inverted.segment {
    background: ${props => props.theme.darkBlue};
  }
  .in-cart {
    background-color: ${props => props.theme.orange} !important;
    div.header {
      color: ${props => props.theme.black} !important;
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
  a {
    color: ${props => props.theme.orange};
    font-size: 1.5rem;
  }
  .top-edit-button {
    margin-left: 10px !important;
    margin-top: 0 !important;
    i {
      color: ${props => props.theme.orange};
    }
  }
  h2 {
    margin: 5px 0 !important;
  }
`;

export default IndividualListStyles;
