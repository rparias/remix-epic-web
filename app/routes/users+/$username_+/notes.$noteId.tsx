import {
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
	json,
	redirect,
} from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from 'app/utils/db.server';
import { floatingToolbarClassName } from '~/components/floating-toolbar';
import { Button } from '~/components/ui/button';
import { invariantResponse } from '~/utils/misc';

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

export async function action({ params }: ActionFunctionArgs) {
	db.note.delete({
		where: { id: { equals: params.noteId } },
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
					<Button type="submit" variant="destructive">
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
