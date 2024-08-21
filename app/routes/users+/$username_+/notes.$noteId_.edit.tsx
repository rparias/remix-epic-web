import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import { db } from 'app/utils/db.server';
import { invariantResponse } from 'app/utils/misc';
import { floatingToolbarClassName } from '~/components/floating-toolbar';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

export async function loader({ params }: LoaderFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: {
				equals: params.noteId,
			},
		},
	});

	invariantResponse(note, 'Note not found', { status: 404 });

	return json({
		note: { title: note.title, content: note.content },
	});
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>();

	return (
		<Form method="post" className="p-8">
			<div className="mt-4">
				<Label>Title</Label>
				<Input name="title" defaultValue={data.note.title} />
			</div>
			<div className="mt-4">
				<Label>Content</Label>
				<Textarea name="content" defaultValue={data.note.content} />
			</div>
			<div className={floatingToolbarClassName}>
				<Button variant="secondary" type="reset">
					Reset
				</Button>
				<Button type="submit">Submit</Button>
			</div>
		</Form>
	);
}
