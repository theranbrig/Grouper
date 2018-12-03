import React from 'react';
import List from '../components/List';

const ListPage = props => (
	<div>
		<List id={props.query.id} />
	</div>
);

export default ListPage;
