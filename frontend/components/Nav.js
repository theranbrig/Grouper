import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import DeleteButton from './Logout';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles className="navigation-bar">
        <Link href="/">
          <a>Home</a>
        </Link>
        {me && (
          <React.Fragment>
            <Link href="/lists">
              <a>Lists</a>
            </Link>
            <Dropdown item text={`${me.username}`}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <DeleteButton />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </React.Fragment>
        )}
        {!me && (
          <React.Fragment>
            <Link href="/join">
              <a>Join</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </React.Fragment>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
