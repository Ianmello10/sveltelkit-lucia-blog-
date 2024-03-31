import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
//import type { User } from '$lib/types';
import type { User } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(307, '/login');
	}

	const user = event.locals.user;

	const userAccount: User | null = await db.user.findUnique({
		where: {
			github_id: user.githubId
		}
	});

	return {
		user: userAccount	};
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) {
			throw fail(401);
		}
	}
};
