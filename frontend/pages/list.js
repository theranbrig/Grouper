import React from 'react';
import List from '../components/List';
import LoginCheck from '../components/LoginCheck';

const ListPage = props => (
	<LoginCheck>
		<List id={props.query.id} />
	</LoginCheck>
);

export default ListPage;
