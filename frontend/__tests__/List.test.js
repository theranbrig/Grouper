import { mount } from 'enzyme';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import IndividualList from '../components/List';
import { CURRENT_USER_QUERY } from '../components/User';
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



describe('<List/>', () => {
	it('renders loading screen', () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<IndividualList id="1234567890" />
			</MockedProvider>
		);
		expect(wrapper.text()).toContain('Loading...');
	});
});
