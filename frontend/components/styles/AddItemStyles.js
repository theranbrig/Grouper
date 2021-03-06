import styled from 'styled-components';

const AddItemStyles = styled.div`
  padding-top: 50px;
  min-height: 90vh;
  .add-item-button {
    margin-top: 32px !important;
    height: 40px;
    width: 40px;
    @media (max-width: 758px) {
      margin-left: calc(50% - 50px) !important;
      width: 100px;
      margin-top: 10px !important;
    }
  }
  i {
    color: ${props => props.theme.orange};
    @media (max-width: 758px) {
      padding-top: 2px;
      font-size: 1.54rem;
    }
  }
  input {
    margin: 10px 0 !important;
  }
  h1 {
    font-family: 'Lobster Two', cursive;
    font-size: 3rem;
    color: ${props => props.theme.orange};
    text-align: center;
  }
  @media (min-height: 758px) {
    min-height: 350px;
  }
`;

export default AddItemStyles;
