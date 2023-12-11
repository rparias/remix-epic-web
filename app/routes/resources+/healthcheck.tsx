// NOTE: A Resource Route is like a regular route, but it doesn't have a default export.
// http://localhost:3000/resources/healthcheck

export async function loader() {
	return new Response('OK')
}
