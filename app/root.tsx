import {
  Links,
  LiveReload,
  Meta,
  Scripts,
} from "@remix-run/react";
import { type LinksFunction } from "@remix-run/node";
import faviconAssetUrl from './assets/favicon.svg';
import fontStylesheetUrl from './styles/font.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: faviconAssetUrl,
    },
    {
      rel: 'stylesheet',
      href: fontStylesheetUrl,
    }
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
