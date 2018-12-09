import React from 'react';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import IndividualList, { INDIVIDUAL_LIST_QUERY } from '../components/List';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeList, fakeListItem } from '../lib/testUtils';

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
