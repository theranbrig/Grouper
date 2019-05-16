const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// Check if user is a member of list
const checkUser = async (listId, ctx, args) => {
  const list = await ctx.db.query.list({ where: { id: listId } }, `{id, users {id}}`);
  if (!list.users.some(user => user.id === ctx.request.userId)) {
    throw new Error('You do not have permission to do that');
  }
  return true;
};

const Mutations = {
  // ////////////////////////////////////////////////////////////////////
  //         USER ACTIONS
  // ////////////////////////////////////////////////////////////////////
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // Check if user with submitted email exists
    const emailCheck = await ctx.db.query.user({ where: { email: args.email } });
    if (emailCheck) throw new Error(`${args.email} already has an account.  Please Log In.`);
    const nameCheck = await ctx.db.query.user({ where: { username: args.username } });
    // Check if user with submitted username exists
    if (nameCheck) throw new Error(`${args.username} already exists.  Please choose a new user name.`);
    // Set password hash and user info
    const password = await bcrypt.hash(args.password, 15);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          token: jwt.sign({ userId: args.email }, process.env.APP_SECRET),
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // Create JWT and set as cookie
    const token = await jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // Check email and password
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No user for email: ${email}. Please sign up first.`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Wrong Password`);
    }
    // Create JWT and set as cookie
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },

  // ////////////////////////////////////////////////////////////////////
  //         LIST ACTIONS
  // ////////////////////////////////////////////////////////////////////

  async createList(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    if (args.name.length < 1) {
      throw new Error('You must enter an list name.');
    }
    const list = ctx.db.mutation.createList(
      {
        data: {
          users: {
            connect: { id: ctx.request.userId },
          },
          ...args,
        },
      },
      info
    );
    return list;
  },
  async editList(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    checkUser(args.id, ctx, args);
    // Create Updates
    const updates = { ...args };
    // Remove new ID to save old ID over it
    delete updates.id;
    return ctx.db.mutation.updateList(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async removeList(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    checkUser(args.id, ctx, args);
    // Delete List
    return ctx.db.mutation.deleteList({ where: { id: args.id } }, info);
  },
  async addUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    checkUser(args.id, ctx, args);
    // Check if user exists
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) throw new Error('User does not exist');
    // Add user to list
    const list = await ctx.db.mutation.updateList(
      {
        where: { id: args.id },
        data: {
          users: {
            connect: { id: user.id },
          },
        },
      },
      info
    );
    return user;
  },
  async addUserByName(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    checkUser(args.id, ctx, args);
    // Check if user exists
    const user = await ctx.db.query.user({ where: { username: args.username } });
    if (!user) throw new Error('User does not exist');
    // Add user to list
    const list = await ctx.db.mutation.updateList(
      {
        where: { id: args.id },
        data: {
          users: {
            connect: { id: user.id },
          },
        },
      },
      info
    );
    return user;
  },
  async removeUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    checkUser(args.id, ctx, args);
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) throw new Error('User does not exist');
    // Check list has at least one user in it
    const checkForOneUser = await ctx.db.query.list({ where: { id: args.id } }, `{id, users {id}}`);
    if (checkForOneUser.users.length <= 1) throw new Error('Need at least one user in list.');
    // Update List
    const list = await ctx.db.mutation.updateList(
      {
        where: { id: args.id },
        data: {
          users: {
            disconnect: { id: user.id },
          },
        },
      },
      info
    );
    return list;
  },
  // ////////////////////////////////////////////////////////////////////
  //         LIST ITEM ACTIONS
  // ////////////////////////////////////////////////////////////////////
  async addItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    checkUser(args.list, ctx, args);
    if (args.name.length < 1) {
      throw new Error('You must enter an item name.');
    }
    // Create list item and add to list
    const listItem = await ctx.db.mutation.createListItem({
      data: {
        user: { connect: { id: ctx.request.userId } },
        ...args,
      },
    });
    const updatedList = await ctx.db.mutation.updateList({
      where: { id: args.list },
      data: { items: { connect: { id: listItem.id } } },
    });
    return updatedList;
  },
  async toggleInCart(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    // Get list item
    const item = await ctx.db.query.listItem({
      where: { id: args.id },
    });
    // Toggle if in cart
    const listItem = await ctx.db.mutation.updateListItem({
      where: { id: args.id },
      data: {
        inCart: !item.inCart,
      },
    });
    return listItem;
  },
  async editListItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // Create Updates
    const updates = { ...args };
    console.log(updates);
    // Remove new ID to save old ID over it
    delete updates.id;
    return ctx.db.mutation.updateListItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async removeListItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    return ctx.db.mutation.deleteListItem({ where: { id: args.id } }, info);
  },
  // ////////////////////////////////////////////////////////////////////
  //         FRIEND ACTIONS
  // ////////////////////////////////////////////////////////////////////
  async addFriend(parent, args, ctx, info) {
    const newFriend = await ctx.db.query.user({ where: { id: args.friendId } });
    if (!newFriend) {
      throw new Error('That user does not exist');
    }
    // Add user to list
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { id: args.userId },
        data: { friends: { connect: { id: newFriend.id } } },
      },
      info
    );
    console.log(updatedUser);
    const updatedFriend = await ctx.db.mutation.updateUser(
      {
        where: { id: args.friendId },
        data: { friends: { connect: { id: updatedUser.id } } },
      },
      info
    );
    console.log(updatedFriend);
    return updatedUser;
  },
  async removeFriend(parent, args, ctx, info) {
    const oldFriend = await ctx.db.query.user({ where: { username: args.friendName } });
    if (!oldFriend) {
      throw new Error('That user does not exist');
    }
    // Add user to list
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { username: args.username },
        data: { friends: { disconnect: { id: oldFriend.id } } },
      },
      info
    );
    const updatedFriend = await ctx.db.mutation.updateUser(
      {
        where: { username: args.friendName },
        data: { friends: { disconnect: { id: updatedUser.id } } },
      },
      info
    );
    console.log('updated', updatedUser);
    return updatedUser;
  },
  async sendFriendRequestById(parent, args, ctx, info) {
    const sender = await ctx.db.query.user({ where: { id: args.senderId } });
    const receiver = await ctx.db.query.user({ where: { id: args.receiverId } });
    if (!sender || !receiver) {
      throw new Error('User is not found');
    }
    const friendRequest = await ctx.db.mutation.createFriendRequest({
      data: {
        senderId: { connect: { id: sender.id } },
        receiverId: receiver.id,
        requestUsername: sender.username,
      },
    });
    return friendRequest;
  },
  async sendFriendRequestByUsername(parent, args, ctx, info) {
    const sender = await ctx.db.query.user({ where: { id: args.senderId } });
    const receiver = await ctx.db.query.user({ where: { username: args.receiverUsername } });
    if (!sender || !receiver) {
      throw new Error('User is not found');
    }
    console.log(sender);
    console.log(receiver);
    const friendRequest = await ctx.db.mutation.createFriendRequest({
      data: {
        receiverId: receiver.id,
        senderId: sender.id,
        requestUsername: sender.username,
      },
    });
    console.log(friendRequest);
    const updatedFriend = await ctx.db.mutation.updateUser({
      where: { id: receiver.id },
      data: { friendRequests: { connect: { id: friendRequest.id } } },
      info,
    });
    console.log(updatedFriend);
  },
  async removeFriendRequest(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first');
    }
    return ctx.db.mutation.deleteFriendRequest({ where: { id: args.id } }, info);
  },
  hideFriendRequest(parent, args, ctx, info) {
    const friendRequest = ctx.db.mutation.updateFriendRequest(
      {
        where: { id: args.id },
        data: { hidden: true },
      },
      info
    );
    return friendRequest;
  },
};

module.exports = Mutations;
