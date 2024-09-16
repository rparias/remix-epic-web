import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { db } from 'app/utils/db.server';
import { cn, invariantResponse } from '~/utils/misc';

export async function loader({ request, params }: LoaderFunctionArgs) {
	const owner = db.user.findFirst({
		where: {
			username: { equals: params.username },
		},
	});

	invariantResponse(owner, 'Owner not found');

	const notes = db.note
		.findMany({
			where: {
				owner: {
					username: { equals: params.username },
				},
			},
		})
		.map(({ id, title }) => ({ id, title }));

	return json({ owner, notes });
}

export default function NotesRoute() {
	const data = useLoaderData<typeof loader>();
	const { owner, notes } = data;
	const ownerDisplayName = owner.username;
	const navLinkDefaultClassName =
		'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl';

	return (
		<main className="container flex h-full min-h-[400px] pb-12 px-0 md:px-8">
			<div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0">
				<div className="relative col-span-1">
					<div className="absolute inset-0 flex flex-col">
						<Link to=".." relative="path" className="pb-4 pl-8 pr-4 pt-12">
							<h1 className="text-base font-bold md:text-lg lg:text-left lg:text-2xl">
								{ownerDisplayName}'s Notes
							</h1>
						</Link>
						<ul className="overflow-y-auto overflow-x-hidden pb-12">
							{notes.map(({ id, title }) => (
								<li className="p-1 pr-0" key={id}>
									<NavLink
										preventScrollReset={true}
										to={id}
										className={({ isActive }) =>
											cn(navLinkDefaultClassName, isActive && 'bg-accent')
										}
									>
										{title}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="relative col-span-3 bg-accent md:rounded-r-3xl">
					<Outlet />
				</div>
			</div>
		</main>
	);
}
