import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from 'app/utils/db.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
	const note = db.note.findFirst({
		where: {
			id: { equals: params.noteId },
		},
	})

	return new Response(JSON.stringify({ note }), {
		headers: { 'content-type': 'application/json' },
	})
}

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>()
	// @ts-expect-error 🦺 we'll fix this next
	const { note } = data

	return (
		<div className="absolute inset-0 flex flex-col px-10">
			<h2 className="mb-2 pt-12 text-h2 lg:mb-6">{note.title}</h2>
			<div className="overflow-y-auto pb-24">
				<p className="whitespace-break-spaces text-sm md:text-lg">
					{note.content}
				</p>
			</div>
		</div>
	)
}
