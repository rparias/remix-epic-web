import {
  Links,
  LiveReload,
  Meta,
  Scripts,
} from "@remix-run/react";
import { type LinksFunction } from "@remix-run/node";
import faviconAssetUrl from './assets/favicon.svg';
import fontStylesheetUrl from './styles/font.css';
import tailwindUrl from './styles/tailwind.css'

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
    },
    {
      rel: 'stylesheet',
      href: tailwindUrl,
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
        <h1 className="p-8 text-xl">Hello world!</h1>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
