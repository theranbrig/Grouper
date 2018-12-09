import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import AddListItem from '../components/AddListItem';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const mocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: fakeUser() } }
	}
];

describe('<AddList/>', () => {
	it('renders and matches the snap shot', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				apolloClient = client;
				<AddListItem id="abc123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('Button'))).toMatchSnapshot();
	});
});
