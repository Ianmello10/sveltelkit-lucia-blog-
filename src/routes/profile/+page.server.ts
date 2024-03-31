import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { User } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	if (!user) {
		redirect(307, '/login');
	}

	const userAccount: any = await db.user.findUnique({
		where: {
			github_id: user.githubId
		},
		include: {
			comment: true
		}
	});

	console.log(userAccount);

	return {
		user: userAccount,
		userComment: userAccount.comment
	};
};

export const actions: Actions = {
	delete: async ({ request, locals, params }) => {
		const user = locals.user?.id;
		if (!user) {
			redirect(307, '/login');
		}

		const data = await request.formData();
		const id = Number(data.get('id'));
		//const slug = params.slug;

		const deleteComment = await db.comment.delete({
			where: {
				userId: user,
				id: id
			}
		});
	}
};
