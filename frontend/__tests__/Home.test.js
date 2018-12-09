import { shallow, mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: null } }
	}
];

const signedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: fakeUser() } }
	}
];

describe('Header', () => {
	it('should render the Header Logo', () => {
		const wrapper = shallow(<Header />);
		const img = wrapper.find('img');
		expect(img.props().alt).toContain('Grouper Logo');
	});
});

describe('NavBar', () => {
	it('should render the Navbar', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('.navigation-bar');
		expect(toJSON(nav)).toMatchSnapshot();
	});
});

describe('NavBar', () => {
	it('should render the Navbar', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('.navigation-bar');
		expect(toJSON(nav)).toMatchSnapshot();
	});
});
