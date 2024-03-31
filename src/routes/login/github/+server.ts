import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';
import { github } from '$lib/server/auth';
import type { RequestEvent } from './$types';

export async function GET(e: RequestEvent): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	e.cookies.set('github_oauth_state', state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	redirect(302, url.toString());
}
