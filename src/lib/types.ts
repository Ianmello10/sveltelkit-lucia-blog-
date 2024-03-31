export type Categories = 'svelte' | 'kit';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};

export type User = {
	id: string;
	github_id: string;
	name: string;
	image: string | null;
};
