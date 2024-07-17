# Features

- Infinite scroll
- OAuth with github
- Search github users
- Search github repositories
- Cache fetched data to localstorage

# Stack

- React
- Typescript
- Redux Toolkit
- Redux Persist
- Tailwind CSS

# Server

- created a small Node.js server to proxy "get access token" request in order to protect environment secrets like GITHUB_CLIENT_SECRET.

# CLient

### Authentication

- used Github OAuth to get an access token on behalf of the user.
- once `getAccessTokenWithCodeQuery` query is successful, an access token is set to localStorage and another query is triggered to take advantage of the newly obtained token to get user data and show the home page.

### Api

- Redux-Toolkit Query slices
- an http client that gets the access token from `localStorage` and sends it in the `Authorization` header automatically.

### App

- the high level architecture of the app and routes for both guests and authenticated users.

### Components

- shared: highly reusable react components that can be used across multiple pages.

### Pages

- the code for the individual pages that make up the app.

### Store

- Redux store.
- redux-persist configuration that persists the redux store to `localStorage`.
