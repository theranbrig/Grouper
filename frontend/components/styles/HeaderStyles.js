import styled from 'styled-components';

const StyledHeader = styled.header`
  .bar {
    border-bottom: 5px solid ${props => props.theme.darkBlue};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .bar img {
    width: 100px;
    @media (max-width: 1300px) {
      width: 150px;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.darkBlue};
  }
`;

export default StyledHeader;
