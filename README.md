<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/56924174?s=400&u=8fb7ae1cdc2f64d7342cd267b8435428274b72ec&v=4" height="100" /><br/>
  <span><b>EasyFlow</b>: <span>Project Management Tool</span><br/>

  <p align="center">
    <a href="https://easyflow.live" target="_blank">easyflow.live</a>
  </p>
</p>

<hr>

Easy Flow is a real time collaborative project manager based on Kanban methodology. We make everything easier so you and your team can focus on complete tasks and ship great products.

This mono-repo boilerplate consists of the following packages:

- [Current version v1](./packages/v1)
- Next version (working in progress)
  - [Frontend](./packages/frontend)
  - [Backend](./packages/backend)

## Next version packages

### 1. [**Frontend**](./packages/frontend): Next.js application

This application is the primary user-facing application. Once it’s up and running (see Development section), it’s available on http://localhost:3000/.

### 2. [**Backend**](./packages/backend): Dockerized Hasura application

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/easyflow-live/easyflow
```

### 2. **Install Lerna**

```sh
npm install
```

### 3. **Bootstrap the packages**

From the project root, we can run the following command to bootstrap the packages and install all their dependencies and linking any cross-dependencies:

```sh
npx lerna bootstrap
```

### 4. **Start the packages**

Before start the project, duplicate the `.env` example and fill it.

```sh
cp packages/frontend/.env.example packages/frontend/.env && cp packages/backend/.env.example packages/backend/.env
```

From the project root, we can run the following commands to start the project:

```sh
npm run frontend:dev
```

The above command will start the frontend package on [http://localhost:3000/](http://localhost:3000).

```sh
npm run backend:dev
```

The command will start the backend containers. If everything goes well, it’ll be up and running on http://localhost:8080/v1/graphql.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center">
      <a href="http://twitter.com/piheirofellipe">
        <img src="https://avatars2.githubusercontent.com/u/434694?s=460&v=4" width="70px;" alt="Fellipe Pinheiro"/>
        <br />
        <sub><b>Fellipe Pinheiro</b></sub>
      </a>
      <br />
      <a href="#code-pinheirofellipe" title="Code">💻</a>
      <a href="#design-pinheirofellipe" title="Code">🎨</a>
      <a href="#code-review-pinheirofellipe" title="Code">👀</a>
    </td>
    <td align="center">
      <a href="http://twitter.com/piheirofellipe">
        <img src="https://avatars3.githubusercontent.com/u/1120412?s=460&v=4" width="70px;" alt="Erick Almeida"/>
      <br /><sub><b>Erick Almeida</b></sub>
      </a>
      <br />
      <a href="#code-pinheirofellipe" title="Code">💻</a>
      <a href="#code-pinheirofellipe" title="Code">🤔</a>
    </td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
