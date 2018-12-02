import React, { Component } from 'react';
import Link from 'next/link';
import { Grid, Image, Button } from 'semantic-ui-react';
import HomeStyles from './styles/HomeStyles';

class Home extends Component {
	render() {
		return (
			<HomeStyles>
				<Grid centered container>
					<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
						<h1>Grouper</h1>
						<Image src="../static/whitefish.png" alt="Fish Logo" centered />
            <h2>Simple Group Shopping</h2>
						<div className="button-area">
							<Button inverted size="big">
								<Link href="/login">
									<a>Login</a>
								</Link>
							</Button>
							<Button inverted size="big">
								<Link href="/join">
									<a>Sign Up</a>
								</Link>
							</Button>
						</div>
            <ul>
              <li>Divide and conquer while you shop.  Split up and find what you need around the store.</li>
              <li>Check off items as you pick them up.  Let others know you found what you were looking for.</li>
              <li>Set price limits.  Avoid overspending and stay within your budget.</li>
            </ul>
					</Grid.Column>
				</Grid>
			</HomeStyles>
		);
	}
}

export default Home;
