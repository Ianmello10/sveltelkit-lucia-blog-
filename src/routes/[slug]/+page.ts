import { error } from '@sveltejs/kit';

export async function load({ params, data }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
			comment: data.comment,
			user: data.user
		};
	} catch (err) {
		error(404, `Could not find ${params.slug}`);
	}
}
