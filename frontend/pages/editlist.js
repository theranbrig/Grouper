import EditList from '../components/EditList';
import LoginCheck from '../components/LoginCheck';

const EditListPage = props => (
	<LoginCheck>
		<EditList id={props.query.id} />
	</LoginCheck>
);

export default EditListPage;
