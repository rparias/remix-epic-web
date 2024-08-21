import { Link, useParams } from '@remix-run/react'

export default function ProfileRoute() {
	const params = useParams()
	const { username } = params

	return (
		<div className="container mb-48 mt-36">
			<h1 className="text-h1">{username}</h1>
			<Link to="notes" className="underline">
				Notes
			</Link>
		</div>
	)
}
