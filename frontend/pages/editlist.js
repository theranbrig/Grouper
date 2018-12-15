import PropTypes from 'prop-types';
import EditList from '../components/EditList';
import LoginCheck from '../components/LoginCheck';

const EditListPage = props => (
  <LoginCheck>
    <EditList id={props.query.id} />
  </LoginCheck>
);

EditListPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default EditListPage;
