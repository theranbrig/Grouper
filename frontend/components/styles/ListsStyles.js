import styled from 'styled-components';

const ListsStyles = styled.div`
  color: ${props => props.theme.offWhite};
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
  min-height: 95vh;
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
    line-height: 2rem !important;
  }
  .description {
    font-size: 1.2rem !important;
    line-height: 1.75rem !important;
    padding: 10px 0 !important;
  }
  .ui.inverted.segment {
    background: ${props => props.theme.darkBlue};
  }
  .ui.horizontal.segments {
    border: none;
  }
  .ui.list {
    padding-bottom: 50px;
  }
  i {
    width: 20px;
    padding-right: 10px;
    margin-bottom: 10px;
  }
  .delete-button,
  .edit-button {
    margin-top: 3px !important;
    color: ${props => props.theme.orange} !important;
    width: 33px;
    margin-top: 7px !important;
  }
  .ui.segment {
    border: none !important;
  }
  .user-icon {
    margin-left: 15px;
  }
`;

export default ListsStyles;
