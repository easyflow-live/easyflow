# Easy Flow Project Manager

[Check out the live website](https://www.easyflow.com)

Easy Flow is a real time collaborative project manager based on Kanban methodology. We make everything easier so you and your team can focus on complete tasks and ship great products.

### Features

- It has most of the features available on Trello, like creating and editing new cards, dragging around cards and so on.
- Supports GitHub flavored markdown, which enables stuff like headings and checklists on the cards.
- Works great on touch devices.

### Tech stack

- [React](https://github.com/facebook/react)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [Sass](https://github.com/sass/sass)
- [Webpack](https://github.com/webpack/webpack)
- [Babel](https://github.com/babel/babel)

### Development

#### Simplified setup

```shell
# Clone this reposittory

cd easyflow

npm install

npm run dev
```

The app will run on http://127.0.0.1:3000

You need to create a file with the name `.env` in the root directory with the following variables:

```
REACT_APP_API_KEY =
REACT_APP_AUTH_DOMAIN =
REACT_APP_DATABASE_URL =
REACT_APP_PROJECT_ID =
REACT_APP_STORAGE_BUCKET =
REACT_APP_MESSAGING_SENDER_ID =
REACT_APP_ID =
PORT = 3000
```

For production deployment run:

```shell
npm run deploy
```
