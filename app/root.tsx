import {
	Link,
  Links,
  LiveReload,
  Outlet,
  Meta,
  Scripts,
} from "@remix-run/react";
import { type LinksFunction } from "@remix-run/node";
import faviconAssetUrl from './assets/favicon.svg';
import fontStylesheetUrl from './styles/font.css';
import tailwindUrl from './styles/tailwind.css';

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: fontStylesheetUrl },
		{ rel: 'stylesheet', href: tailwindUrl },
	].filter(Boolean)
}

export default function App() {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col justify-between bg-background text-foreground">
				<header className="container mx-auto py-6">
					<nav className="flex justify-between">
						<Link to="/">
							<div className="font-light">epic</div>
							<div className="font-bold">notes</div>
						</Link>
						<Link className="underline" to="users/kody/notes/d27a197e">
							Kody's Notes
						</Link>
						</nav>
				</header>
        <div className="flex-1">
					<Outlet />
				</div>

				<div className="container mx-auto flex justify-between">
					<div>
						<div className="font-light">epic</div>
						<div className="font-bold">notes</div>
					</div>
				</div>
				<div className="h-5" />
				<Scripts />
				<LiveReload />
      </body>
    </html>
  );
}
