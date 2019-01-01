![Grouper](frontend/static/logo.png)

# Grouper

Group shopping and lists made easy. Check them off as you go and get real-time updates as you shop. Split up and let others get items. Mark them off as you find them.

## About

**Frontend**

- Next.js React - Server Side Rendered React
- Apollo Boost - Mutations / Queries / State Management

**Backend**

- GraphQL Yoga Server - Express Server
- Prisma DB - PostgreSQL Relational Database

This project is developed first from a boilerplate that I have adapted for Next.js React and GraphQL with a Prisma SQL database. It can be found [HERE](https://github.com/theranbrig/React-GraphQL-Fullstack-Boilerplate).

**Features**

- This was built to utilize Next.js with React on the frontend for quick SSR React Components and caching.
- Apollo Boost works to connect the backend data to the client side, as well has hold local state. All GraphQL Mutations and Queries are handled through Apollo.
- The API uses GraphQL with a GraphQL server to connect to a Prisma database that is built using PostgreSQL. The relational data structure allows for quick querying to the server.
- A testing suite was built using Jest and Enzyme to make sure that everything is up and running properly. Snapshot testing was integrated as well.
- The app is deployed using Heroku on both the front and back ends.

This was a quick five day build meant to act as a coding challenge interview, so it is far from perfect yet.

**Deploy**

[Deployed Application](https://grouper-frontend.herokuapp.com)

**Test Users**

To test the deployed site you may use:

- _user1@email.com_
- _user2@email.com_
- _user3@email.com_
- _user4@email.com_
- _user5@email.com_
- All user passwords are: _password_

You may also feel free to create your own user. Full site testing can be done with each user. You may add other users to your lists, or test the app by logging in a another user account in an incognito window to see the live updates.

- **Note** - Since both the frontend and backend are deployed on Heroku there is an issue with Safari and the new cross site tracking blocker feature. This can be worked around, though it is just best to use Chrome or Firefox at this point in time. If you would like to use it on Safari you must change the Prevent Cross-Site Tracking setting to off. This issue is noted, and will be fixed in the future, with custom domain names to the frontend and backend.

## Screenshots

![Screenshot1](https://i.imgur.com/BwIfJ5m.png)
![Screenshot2](https://i.imgur.com/Sa8VlMo.png)

## Installation

### Install Dependencies

Make sure you have [Node.js](http://nodejs.org/), [Prisma](https://prisma.io), and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Download and install dependencies.

```sh
git clone git@github.com:theranbrig/grown # or clone your own fork
cd grouper
<!-- Be sure to install dependencies in both frontend and backend folders -->
cd frontend
npm install
cd backend
npm install
```

### Prisma Setup

Make sure that you connect your app to a database first. This one is connected to a Prisma test database, but you can connect it to your own SQL database by following the directions at [Prisma](https://prisma.io). Below is a guide to set up your own Prisma Database.

### Backend

Make sure you are working in the backend folder of the `grown` project.

```sh
cd backend
```

First you need to install the Prisma CLI.

```sh
npm install -g prisma
```

After that you may need to login which can be done by using:

```sh
prisma login
```

Next you need to initialize the database by using.

```sh
prisma init
```

Follow the prompts as they are given. I recommend using the `Demo Server` to test, but you may use any other DB that you want. Follow through with the rest of the steps by naming it and giving it the stage `dev`. You may also get a prompt asking for the Programming Language. For that you may set it to `Don't Generate`.

Your Prisma server should be set up. You now need to change the files a bit to work with our project.

**Optional** - You may also delete the `datamodel.prisma` file that was created, as our data model will be built using the `datamodel.graphql`.

In the root directory of the `backend` folder be sure that you create and set up your own `variables.env` file with the following information:

```sh

cd backend
touch `variables.env`

```

Fill in the `variables.env` file with your own information. The `PRISMA_ENDPOINT` is found in the `prisma.yml` file.

```env
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="YOUR PRISMA ENDPOINT HERE FROM PRISMA.YML FILE THAT WAS CREATED"
PRISMA_SECRET="MAKEUPYOUROWNSECRET"
APP_SECRET="MAKEUAUPANOTHERSECRET"
PORT=4444
STRIPE_SECRET="PRIVATEKEYNEEDEDFORDEPLOY"
```

In the `prisma.yml` file be sure to include the following data.

```yml
# DEVELOPMENT ENDPOINT - PUT IN VARIABLES.ENV - UNCOMMENT FOR DEVELOPMENT / COMMENT OUT FOR PRODUCTION

endpoint: ${env:PRISMA_ENDPOINT}

# PRODUCTION ENDPOINT - USE YOUR OWN - UNCOMMENT OR REWRITE FOR PRODUCTION
#endpoint: YOUR OWN END POINT

datamodel: datamodel.graphql
secret: ${env:PRISMA_SECRET}
hooks:
  post-deploy:
    - graphql get-schema -p prisma
```

Finally, you can run the following to deploy the datamodel to the database at any time:

```sh
npm run deploy
```

Once the prisma database is set up you may run the development server with:

```sh
npm run dev
```

Your backend should now be running on [localhost:4444](http://localhost:4444/).

### Frontend

Make sure your dependencies are installed in the `frontend` folder. You may then use:

```sh
npm run dev
```

Your app should now be visible on [localhost:7777](http://localhost:7777/).

Make sure you are running both the `frontend` and `backend` folders.

### Testing

Testing should be run from the frontend folder. Be sure that you have run `git init` on the repo to make sure that the tests will run.

```sh
cd frontend
npm test
```

## Built With

- [Node](https://github.com/nodejs/node)
- [React](https://reactjs.org)
- [GraphQL](https://graphql.org/)
- [Prisma](https://prisma.io)
- [Apollo](https://www.apollographql.com/client)
- [Semantic UI](https://github.com/Semantic-Org/Semantic-UI-React)
- [Jest](https://github.com/facebook/jest/)
- [Heroku](https://github.com/heroku)

## Author

## Author

Theran Brigowatz is a Full-stack Web Developer currently out of Seoul, South Korea, but transitioning back to the US. Check him out at the following:

- [theran.co](https://www.theran.co)
- theran.brigowatz@gmail.com
- [twitter.com/wellBuilt](https://www.twitter.com/wellBuilt)
- [github.com/theranbrig](https://www.github.com/theranbrig)

> Made with :heart: and :coffee:.
