import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

// Fazer uma action para deletar comentario

export const load: PageServerLoad = async ({ params, locals }) => {
	const slug = params.slug;
	const user = locals.user;
	const comments = await db.comment.findMany({
		where: {
			postSlug: slug
		}
	});
	console.log(comments);
	return {
		comment: comments,
		user: user
	};
};

export const actions: Actions = {
	//commentValid: async (event) => {
	//if (!event.locals.user) return;
	//const user = event.locals.user.username
	//},

	create: async ({ request, locals, params }) => {
		const slug = params.slug;

		const data = await request.formData();
		const content = data.get('content');

		const user = locals.user?.id;
		if (!user) return;

		const userFind = await db.user.findUnique({
			where: {
				id: user
			}
		});

		if (!userFind) return;

		console.log('Slug create comment:', slug);

		const comment = await db.comment.create({
			data: {
				content: content as string,
				userId: user,
				postSlug: slug
			}
		});
		return { sucess: true };
	},

	delete: async ({ request, locals, params }) => {
		const user = locals.user?.id;
		if (!user) return;

		const data = await request.formData();
		const id = Number(data.get('id'));
		const slug = params.slug;

		console.log('eeuu id:', id);

		const deleteComment = await db.comment.delete({
			where: {
				userId: user,
				postSlug: slug,
				id: id
			}
		});
	}
};
