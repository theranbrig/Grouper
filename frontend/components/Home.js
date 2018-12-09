import Link from 'next/link';
import React, { Component } from 'react';
import { Button, Grid, Icon, Image } from 'semantic-ui-react';
import HomeStyles from './styles/HomeStyles';
import User from './User';

class Home extends Component {
	render() {
		return (
			<User>
				{({ data: { me } }) => {
					return (
						<HomeStyles>
							<Grid centered container>
								<Grid.Column mobile={16} tablet={12} computer={8} textAlign="center">
									<h1>Grouper</h1>
									<Image src="../static/whitefish.png" alt="Fish Logo" centered />
									<h2>Simple Group Shopping</h2>
									{me ? (
										<div className="button-area">
											<Button inverted size="big">
												<Link href="/lists">
													<a>Go to Lists</a>
												</Link>
											</Button>
										</div>
									) : (
										<div className="button-area">
											<Button inverted size="huge">
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
									)}
									<ul>
										<li>
                      <Icon name="group"/>
											<p>Divide and conquer while you shop. Split up and find what you need around the
											store.</p>
										</li>
										<li>
                      <Icon name="shopping cart"/>
											<p>Check off items as you pick them up. Let others know you found what you were
											looking for.</p>
										</li>
										<li>
                      <Icon name="dollar"/>
                      <p>Set price limits. Avoid overspending and stay within your budget.</p>
                    </li>
									</ul>
								</Grid.Column>
							</Grid>
						</HomeStyles>
					);
				}}
			</User>
		);
	}
}

export default Home;
