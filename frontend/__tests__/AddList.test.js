import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ApolloConsumer } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import AddList, { CREATE_LIST_MUTATION } from '../components/AddList';
import { LISTS_QUERY } from '../components/Lists';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeList, fakeUser } from '../lib/testUtils';

const mocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: fakeUser() } }
	},
	{
		request: { query: CREATE_LIST_MUTATION, variables: { id: '3543' } },
		result: {
			data: {
				createList: { ...fakeList() }
			}
		}
	},
	{
		request: { query: LISTS_QUERY },
		result: {
			data: {
				lists: [fakeList()]
			}
		}
	}
];

describe('<AddList/>', () => {
	it('renders and matches the snap shot', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				apolloClient = client;
				<AddList id="abc123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
	});

	it('adds a list when clicked', async () => {
		let apolloClient;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <AddList id="1234567890" />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const {
			data: { me }
		} = await apolloClient.query({ query: CURRENT_USER_QUERY });
		wrapper.find('Button').simulate('click');
		await wait();
		// check if the item is in the cart
		const {
			data: { lists }
		} = await apolloClient.query({ query: LISTS_QUERY });
		expect(lists.length).toBe(1);
	});

	it('check for button render', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<AddList id="abc123" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const button = wrapper.find('Button');
		expect(button.text()).toContain('Add List');
	});
});
