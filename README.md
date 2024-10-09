<a name="readme-top"></a>

# Inkposter
A web browser-based multiplayer party game for 3-9 players based on skribbl.io, Gartic Phone and Fake Artist goes to New York made for course DH2643 @ KTH.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#description">Description</a>
      <ul>
        <li><a href="#play-the-game">Play the game</a></li>
      </ul>
    </li>
    <li><a href="#setup">Setup</a></li>
      <ul>
        <li><a href="#built-with">Built with</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#api-endpoints">API Endpoints</a></li>
      </ul>
    <li><a href="#workflows">Workflows</a></li>
    <li>
      <a href="#file-structure">File structure</a>
      <ul>
        <li><a href="#front-end">Front-end</a></li>
        <li><a href="#back-end">Back-end</a></li>
      </ul>
    </li>
    <li><a href="#the-developers">The Developers</a></li>
  </ol>
</details>

## Description
How to play

### Play the game

A demo is deployed on Heroku: https://inkposter-917d97c7bb64.herokuapp.com.

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>

## Setup
Prerequisites:
- You will need env variables `MongoDB_URI` and `OpenAPI_KEY` set.

### Built with
- React
- Node.js
- Express
- MongoDB
- Socket.io
- TailwindCSS

### Installation
To start the REST API server and the client application:

**Docker-compose (recommended during development)**

The docker image for Inkposter is deployed on: https://hub.docker.com/repository/docker/ziyi01/inkposter/.

Use `docker pull ziyi01/inkposter` to pull the docker image.

1. Build the image using `docker-compose.yml` from root
```
$ docker-compose build
```
2. Run the development environment/docker container on `localhost:3000`
```
$ docker-compose up -d
```

Use `docker-compose down -v` to close the container process.

**npm CLI**

1. Install npm dependencies with
```
$ npm run dev-build
```
2. Start the server on localhost with
```
$ npm start
```

### API Endpoints
| **Method**   | **URL**                            | **Description**   |
|--------------|------------------------------------|-------------------|
| `POST`       | `/user`                            |                   |
| `GET`        | `/user/:userID`                    |                   |
| `GET`        | `/user/:userID/userStats`          |                   |
| `PUT`        | `/user/:userID/username`           |                   |
| `PUT`        | `/user/:userID/avatar`             |                   |
| `PUT`        | `/user/:userID/previousTheme`      |                   |
| `PUT`        | `/user/:userID/sessionResults`     |                   |
| `DELETE`     | `/user/:userID/delete`             |                   |
| `GET`        | `/openai/username`                 |                   |
| `GET`        | `/openai/sessionPrompts`           |                   |

## Workflows
| **File**        | **Workflow**                       | **Description**                   | **On**                              |
|-----------------|------------------------------------|-----------------------------------|-------------------------------------|
| `node.js.yml`   | `Node.js CI`                       | Runs unit tests in `/test`        | Pull and Push to `main`-branch      |
| `docker.yml`    | `Docker CI`                        | Deploys the docker image          | Push to `main`-branch               |
| `main.yml`      | `Deploy`                           | Deploys the application to Heroku | Pull request `main`-branch          |

### Tests
Test coverage is reported when creating a pull-request into the `main`-branch. Unit tests are separated into the folders `./app/__tests__` for UI tests and `./server/__test__` for server tests:

| **File**             | **Test**                                  | **Type**            |
|----------------------|-------------------------------------------|---------------------|
| `App.test.tsx`       | `App renders login page properly`         | UI test             |
| `App.test.tsx`       | `Login button fires off callback`         | UI test             |
| `App.test.tsx`       | `Redirect to /login when app rendered`    | UI test             |
| `db.test.js`         | `Create and delete user`                  | Database test       |
| `db.test.js`         | `Retrieve user`                           | Database test       |
| `db.test.js`         | `Retrieve user stats`                     | Database test       |
| `db.test.js`         | `Update username`                         | Database test       |
| `route.test.js`      | `/api/user/0 return test user`            | REST API test       |
| `route.test.js`      | `/api/user/0/user_stats return stats`     | REST API test       |
| `route.test.js`      | `/api/user/10000 return 404`              | REST API test       |


## File structure
### Front-end
```
└── src/
    ├── components/
    │   └── toolbar.tsx
    ├── presenters/
    │   └── player-game-presenter.tsx
    |   └── host-game-presenter.tsx
    ├── views/
    │   ├── homepage.tsx
    │   ├── host-game.tsx
    │   ├── host-session-end.tsx
    │   ├── host-voting.tsx
    │   ├── host-waiting.tsx
    │   ├── loading.tsx
    │   ├── login-page.tsx
    │   ├── player-game.tsx
    │   ├── player-session-end.tsx
    │   ├── player-voting.tsx
    │   ├── player-waiting.tsx
    │   └── profile.tsx
    ├── App.css
    ├── App.tsx
    ├── global.css
    ├── index.css
    ├── index.tsx
    ├── serModel.tsx
    └── logo.svg
```

### Back-end
```
└── server/
    ├── bin/
    │   └── www
    ├── routes/
    │   └── api.js
    ├── app.js
    └── db.js
```

## The Developers
- <a href="/">Jessica Gorwat</a>
- <a href="/">Julia Hallberg</a>
- <a href="/">Oliver Kamruzzaman</a>
- <a href="/">Julia Wang</a>

<p align="right">(<a href="#readme-top">Back to Top</a>)</p>
