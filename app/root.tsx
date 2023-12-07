import {
  Links,
  LiveReload,
  Meta,
  Scripts,
} from "@remix-run/react";
import { type LinksFunction } from "@remix-run/node";
import faviconAssetUrl from './assets/favicon.svg';
import fontStylesheetUrl from './styles/font.css';
import tailwindUrl from './styles/tailwind.css';

// import css bundles to support importing directly 'some.css' instead of css url
// NOTE: it's not recommended to bundle all the css files, because if we change one of
// the css file, it will create a new bundle for all of them. 
// It's better to separate them and only use bundle for third party styles which we don't modify.
import { cssBundleHref } from '@remix-run/css-bundle';
import './styles/global.css';

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: fontStylesheetUrl },
		{ rel: 'stylesheet', href: tailwindUrl },
		cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : null,
	].filter(Boolean)
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
