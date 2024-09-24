import { type MetaFunction } from '@remix-run/react';
import { type loader as notesLoader } from './notes.tsx';

export const meta: MetaFunction<
	null,
	{ 'routes/users+/$username_+/notes': typeof notesLoader }
> = ({ params, matches }) => {
	const notesMatch = matches.find(
		match => match.id === 'routes/users+/$username_+/notes',
	);
	const displayName = notesMatch?.data?.owner.name ?? params.username;
	const notesCount = notesMatch?.data?.notes.length ?? 0;
	const notesText = notesCount === 1 ? 'note' : 'notes';
	return [
		{ title: `${displayName}'s Notes | Epic Notes Remix` },
		{
			name: 'description',
			content: `Checkout ${displayName}'s ${notesCount} ${notesText} on Epic Notes Remix`,
		},
	];
};

export default function NotesIndexRoute() {
	return (
		<div className="container pt-12">
			<p className="text-body-md">Select a note</p>
		</div>
	);
}
