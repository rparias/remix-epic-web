import os from 'node:os';
import { type LinksFunction, json } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Outlet,
	Meta,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	type MetaFunction,
} from '@remix-run/react';
import faviconAssetUrl from './assets/favicon.svg';
import fontStylesheetUrl from './styles/font.css';
import tailwindUrl from './styles/tailwind.css';
import { getEnv } from './utils/env.server.ts';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Epic Notes' },
		{
			name: 'description',
			content: 'A simple note-taking app built with Remix',
		},
	];
};

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: fontStylesheetUrl },
		{ rel: 'stylesheet', href: tailwindUrl },
	].filter(Boolean);
};

export async function loader() {
	return json({ username: os.userInfo().username, ENV: getEnv() });
}

export default function App() {
	const data = useLoaderData<typeof loader>();
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
				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
