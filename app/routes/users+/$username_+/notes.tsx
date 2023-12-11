import { Link, NavLink, Outlet, useParams } from "@remix-run/react";
import { cn } from "~/utils/misc";

export default function NotesRoute() {
	const params = useParams();
	const { username } = params;

	return (
		<div className="flex h-full justify-between pb-12 border-8 border-blue-500">
			<div>
				<h1 className="text-h1">Notes</h1>
				<ul>
					<li><Link to=".." relative="path" className="underline">Back to {username}</Link></li>
					<li><NavLink to="some-note-id" className={({isActive}) => cn("underline", isActive && "bg-accent")}>Some Note</NavLink></li>
				</ul>
			</div>
      <Outlet />
		</div>
	)
}