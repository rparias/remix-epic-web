import { Link, useParams } from "@remix-run/react";

export default function KodyProfileRoute() {
	const params = useParams();
	const { username } = params;

	return (
		<div className="container mb-48 mt-36 border-4 border-green-500">
			<h1 className="text-h1">{username}</h1>
			<Link to='notes' className="underline">Notes</Link>
		</div>
	)
}
