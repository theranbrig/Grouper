import PropTypes from 'prop-types';
import List from '../components/List';
import LoginCheck from '../components/LoginCheck';

const ListPage = props => (
  <LoginCheck>
    <List id={props.query.id} />
  </LoginCheck>
);

ListPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default ListPage;
