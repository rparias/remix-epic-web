# remix-epic-web

Application made following the [epicweb course](https://www.epicweb.dev/).

## Fullstack foundations

- **Styling:** Modern practices for managing CSS.
- **Routing:** Plan and implement URL-driven navigation.
- **Loading Data:** Strategies for loading and rendering data.
- **Data Mutations:** Execute CRUD operations, safely.
- **SEO:** Ensure page content gets discovered, organically.
- **Error Handling:** Effective strategies, without the ambiguity.

## Remix Documentation

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app
server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
