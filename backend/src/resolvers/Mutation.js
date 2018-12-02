const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const Mutations = {
	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		// Hash Password
		const password = await bcrypt.hash(args.password, 15);
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: ['USER'] }
				}
			},
			info
		);
		// Create JWT
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// Set JWT as cookie for response
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
		});
		console.log('You Signed Up');
		return user;
	}
};

module.exports = Mutations;
