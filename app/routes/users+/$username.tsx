import { json, type LoaderFunctionArgs } from '@remix-run/node';
import {
	Link,
	useLoaderData,
	useRouteError,
	type MetaFunction,
} from '@remix-run/react';
import { db } from '#app/utils/db.server.ts';
import { invariantResponse } from '#app/utils/misc.tsx';

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
	const displayName = data?.user.name || params.username;
	return [
		{ title: `${displayName} | Epic Notes Remix` },
		{
			name: 'description',
			content: `Profile of ${displayName} on Epic Notes Remix`,
		},
	];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
	// throw new Error('🐨 Loader error')
	const user = db.user.findFirst({
		where: {
			username: { equals: params.username },
		},
	});

	invariantResponse(user, 'User not found');

	return json({
		user: {
			name: user.name,
			username: user.username,
		},
	});
}

export default function ProfileRoute() {
	// throw new Error('🐨 Component error')
	const data = useLoaderData<typeof loader>();
	const { user } = data;

	return (
		<div className="container mb-48 mt-36">
			<h1 className="text-h1">{user.username}</h1>
			<Link to="notes" className="underline" prefetch="render">
				Notes
			</Link>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="container mx-auto flex h-full w-full items-center justify-center bg-destructive p-20 text-h2 text-destructive-foreground">
			<h1>Oh no!</h1>
			<p>Something bad happened! Sorry!</p>
		</div>
	);
}
