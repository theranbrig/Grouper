const { forwardTo } = require('prisma-binding');

const Subscription = {
  // This is the list subscription for list item changes.  The Apollo Client needs to be rewrote to use this.  As of now the client uses polling to fetch data, as the docs said in most cases it is the best practice for fetching new queries.  This method could be used if updates were needed instantly, but for the purposes of this app it, the polling method works fine, without having to rewrite the Apollo Client.  This is here if I decide to make changes later.

  listItems: {
    subscribe: (parent, args, ctx, info) =>
      ctx.db.subscription.listItem(
        {
          where: {
            mutation_in: ['CREATED', 'UPDATED', 'DELETED'],
          },
        },
        info
      ),
  },
};

module.exports = Subscription;
