import EditItem from '../components/EditItem';
import LoginCheck from '../components/LoginCheck';

const EditItemPage = props => (
  <LoginCheck>
    <EditItem id={props.query.id} />
  </LoginCheck>
);

export default EditItemPage;
