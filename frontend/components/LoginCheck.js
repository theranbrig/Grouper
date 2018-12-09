import { Query } from 'react-apollo';
import Login from './Login';
import { CURRENT_USER_QUERY } from './User';

const LoginCheck = props => (
	<Query query={CURRENT_USER_QUERY}>
		{({ data, loading }) => {
			if (loading) return <p>Loading...</p>;
			if (!data.me) {
				return (
					<div>
						<Login />
					</div>
				);
			}
			return props.children;
		}}
	</Query>
);

export default LoginCheck;
