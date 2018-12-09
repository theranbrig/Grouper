import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UserList from '../components/UserList';
import { fakeItem, fakeUser } from '../lib/testUtils';

const listData = {
	id: '01234567890',
	users: [fakeUser()],
	name: 'Grocery List',
	type: 'Groceries',
	items: [fakeItem()]
};

describe('<Login/>', () => {
	it('should render the login page', () => {
		const wrapper = shallow(<UserList list={listData} />);
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
	});
});
