// routes/login/github/callback/+server.ts
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { github, lucia } from '$lib/server/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		console.log('UserHook', githubUser);

		// Replace this with your own DB client.
		//const existingUser = await db.table('user').where('github_id', '=', githubUser.id).get();

		const existingUser = await db.user.findUnique({
			where: {
				github_id: githubUser.id
			}
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			const findImage = await db.user.findUnique({
				where: {
					github_id: githubUser.id,
					image: null
				}
			});

			if (findImage) {
				const updateUser = await db.user.update({
					where: {
						github_id: githubUser.id
					},
					data: {
						image: githubUser.avatar_url
					}
				});
			}
		} else {
			const userId = generateId(15);

			await db.user.create({
				data: {
					id: userId,
					github_id: githubUser.id,
					username: githubUser.login,
					image: githubUser.avatar_url as string
				}
			});
			// Replace this with your own DB client.
			//await db.table('user').insert({
			//id: userId,
			//github_id: githubUser.id,
			//username: githubUser.login
			//});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: number;
	login: string;
	avatar_url: string;
}
