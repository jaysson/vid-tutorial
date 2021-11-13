# Vid-Tutorials

This project is build using [AdonisJS](https://adonisjs.com/) (backend) and [React](https://reactjs.org/) (frontend).
The git commit history can give you an overview of what is boilerplate code and what is custom.

## Usage

```shell
# Dev
yarn
cp .env.example .env
yarn test
node ace migration:run
node ace db:seed
yarn dev

# Production
yarn build
cp .env build/.env
cd build
mkdir tmp
touch tmp/db.sqlite3
yarn install --production
node ace migration:run
node ace db:seed
node server.js
```

## Backend

Adonis is a full stack MVC framework similar to Laravel, RoR. Useful to
build [majestic monoliths](https://m.signalvnoise.com/the-majestic-monolith/) in NodeJS.

If you are more into microservices, we can use NestJS/Express as well.

### Routes

There are two endpoints registered in `start/routes.ts`. One for searching/listing the tutorials and another for fetching a
single tutorial details. On the topic of routing: I like how using RESTful routes for everything reduces the need for
many fancy patterns. Ref: [_Cruddy by design_ by Adam Wathan](https://www.youtube.com/watch?v=MF0jFKvS4SI).

The requests are throttled, as every API should be.

### Data & Persistence

Added `Teacher`, `Topic`, and `Tutorial` models with their relationships. While I was told it's not required to store it
to DB, it just made more sense to do it that way and query those in SQL. In real applications too, backend is the right
place for search as we can then personalise it for the user better.

### API testing

The tests are written with the help of [japa](https://github.com/thetutlage/japa). It provides `chai` assertions.

## Frontend

Since AdonisJS has in built support for compiling frontend assets, I chose to use it. We could use NextJS if we were to
separate out frontend and backend. The frontend code resides in `resources`.

Some choices and reasons for the same are below. Please note that these are still _opinions_. Team triumphs personal
opinions.

- Using TailwindCSS: https://adamwathan.me/css-utility-classes-and-separation-of-concerns/.
- Kebab case file names even for frontend components: JS/TS files are modules. It makes sense to have consistent file
  naming irrespective of whether it's a component or a regular module. This also works well when we want to export
  multiple components from a single file.
- Multiple components from a single file: I try to follow "Keep what changes together, together". A file is a module,
  and moving a component outside the module is a conceptual, domain driven decision
- SWR: I prefer thin frontends. Using Redux and such global state management solutions tend to end up creating two
  databases/source of truths. One on the backend and one on the frontend. This creates all sort of complications in
  merging changes & cache invalidation. This is worth it for offline apps, but for everything
  else, [backend is a great place for global state](https://javascript.plainenglish.io/react-query-you-may-not-need-state-management-%EF%B8%8F-15de0837a569)
- Infinite scroll: This is how most of the web & mobile pagination is nowadays 🤷🏼‍♂️

## What can be done next?

- OpenAPI specs
- JSON:API standard
- Generate API clients based on OpenAPI specs
