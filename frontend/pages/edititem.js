import PropTypes from 'prop-types';
import EditItem from '../components/EditItem';
import LoginCheck from '../components/LoginCheck';

const EditItemPage = props => (
  <LoginCheck>
    <EditItem id={props.query.id} />
  </LoginCheck>
);

EditItemPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default EditItemPage;
