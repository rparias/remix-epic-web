import {
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	json,
	redirect,
} from '@remix-run/node';
import { Link, useLoaderData, type MetaFunction } from '@remix-run/react';
import { floatingToolbarClassName } from '#app/components/floating-toolbar.tsx';
import { Button } from '#app/components/ui/button.tsx';
import { db } from '#app/utils/db.server.ts';
import { invariantResponse } from '#app/utils/misc.tsx';

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
	const title = data?.note.title || null;
	const content = data?.note.content || null;
	return [
		{ title: `${title} | ${params.username}'s Notes | Epic Notes Remix` },
		{
			name: 'description',
			content,
		},
	];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: { equals: params.noteId },
		},
	});

	invariantResponse(note, 'Note not found');

	return json({
		note: {
			title: note.title,
			content: note.content,
		},
	});
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
	const intent = formData.get('intent');

	invariantResponse(intent === 'delete', 'Invalid intent');

	db.note.delete({
		where: {
			id: { equals: params.noteId },
		},
	});
	return redirect(`/users/${params.username}/notes`);
}

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>();
	const { note } = data;

	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{note.title}</h2>
			<div className="overflow-y-auto pb-24">
				<p className="whitespace-break-spaces text-sm md:text-lg">
					{note.content}
				</p>
			</div>
			<div className={floatingToolbarClassName}>
				<form method="post">
					{/* Wrapping button on a form allow Remix to handle edge cases, like clicking button twice or leaving the page */}
					<Button
						type="submit"
						variant="destructive"
						name="intent"
						value="delete"
					>
						Delete
					</Button>
				</form>
				<Button asChild>
					<Link to="edit">Edit</Link>
				</Button>
			</div>
		</div>
	);
}
