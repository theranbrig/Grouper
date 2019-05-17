const { forwardTo } = require('prisma-binding');

const Query = {
  async me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    const user = await ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
    return user;
  },
  list: forwardTo('db'),
  lists: forwardTo('db'),
  listItem: forwardTo('db'),
  friendRequests: forwardTo('db'),
};

module.exports = Query;
