import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import { INDIVIDUAL_LIST_QUERY } from '../components/List';
import AddListItem, { ADD_ITEM_MUTATION } from '../components/AddListItem';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeList } from '../lib/testUtils';

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
