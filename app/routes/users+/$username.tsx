import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx';
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
	const user = db.user.findFirst({
		where: {
			username: { equals: params.username },
		},
	});

	invariantResponse(user, 'User not found', { status: 404 });

	return json({
		user: {
			name: user.name,
			username: user.username,
		},
	});
}

export default function ProfileRoute() {
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
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	);
}
