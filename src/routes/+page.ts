import type { Post, User } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	const res = await fetch('api/posts');

	const posts: Post[] = await res.json();

	const user = data.user;

	return {
		posts: posts,
		user: user
	};
};
