const { forwardTo } = require('prisma-binding');

const Subscription = {
	listItems: {
		subscribe: (parent, args, ctx, info) => {
			return ctx.db.subscription.listItem(
				{
					where: {
						mutation_in: ['CREATED', 'UPDATED', 'DELETED']
					}
				},
				info
			);
		}
	}
};

module.exports = Subscription;
