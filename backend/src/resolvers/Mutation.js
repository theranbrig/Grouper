const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const Mutations = {
	async signup(parent, args, ctx, info) {
		args.email = args.email.toLowerCase();
		// Set password hash and user info
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
		// Create JWT and set as cookie
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
		});
		console.log('You Signed Up');
		return user;
	},
	async signin(parent, { email, password }, ctx, info) {
		// Check email and password
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(`No user for email: ${email}`);
		}
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error(`Wrong Password`);
		}
		// Create JWT and set as cookie
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 14 // Two week token
		});
		return user;
	},
	async signout(parent, args, ctx, info) {
		ctx.response.clearCookie('token');
		return { message: 'Goodbye!' };
	},
	async createList(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			throw new Error('You must log in first');
		}
		const list = ctx.db.mutation.createList(
			{
				data: {
					users: {
						connect: { id: ctx.request.userId }
					},
					...args
				}
			},
			info
		);
		return list;
	},
	async addUser(parent, args, ctx, info) {
		const user = await ctx.db.query.user({ where: { email: args.email } });
		if (!user) throw new Error('User does not exist');
		console.log(user);
		const list = await ctx.db.mutation.updateList(
			{
				where: { id: args.id },
				data: {
					users: {
						connect: { id: user.id }
					}
				}
			},
			info
		);
		console.log(list);
		// const list = await ctx.db.mutation.updateList(
		// 	{
		// 		data: {
		// 			users: {
		// 				connect: { id: user.id }
		// 			}
		// 		},
		// 		where: {
		// 			id: args.id
		// 		}
		// 	},
		// 	info
		// );
		return list;
	}
};

module.exports = Mutations;
