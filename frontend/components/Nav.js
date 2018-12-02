import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => (
	<User>
		{({ data: { me } }) => {
			return (
				<NavStyles>
					<Link href="/">
						<a>Home</a>
					</Link>
					{me && (
						<>
							<Link href="/lists">
								<a>Lists</a>
							</Link>
							<Link href="/profile">
								<a>Profile</a>
							</Link>
						</>
					)}
					{!me && (
						<>
							<Link href="/join">
								<a>Join</a>
							</Link>
							<Link href="/login">
								<a>Login</a>
							</Link>
						</>
					)}
				</NavStyles>
			);
		}}
	</User>
);

export default Nav;
