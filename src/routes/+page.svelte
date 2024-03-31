<script lang="ts">
	import CardPost from '$lib/components/CardPost.svelte';
	import NavBar from '$lib/components/navBar.svelte';
	import type { Post, User } from '$lib/types';
	import { categoryBar } from '$lib/category';
	export let data: { posts: Post[]; user: User };

	console.log(data);

	let searchQuery: string = '';

	$: filteredPosts = data.posts.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<nav class="w-full py-4 px-2">
	<NavBar>
		<div class="form-control">
			<input
				bind:value={searchQuery}
				type="text"
				placeholder="Search"
				class="input input-bordered w-24 md:w-auto"
			/>
		</div>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img alt="Tailwind CSS Navbar component" src={data.user.image} />
				</div>
			</div>
			<ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<a href="/profile" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/">Settings</a></li>
				<li><a href="/">Logout</a></li>
			</ul>
		</div>
	</NavBar>
</nav>

<section class="w-full mx-auto flex-col lg:gap-x-20 h-auto px-2 lg:flex">
	<div class="w-full lg:w-[15%] lg:h-[100vh] px-2 mt-4 bg-red-200">
		<ul class="flex lg:flex-col lg:gap-y-4 mt-2 gap-x-4 gap-y-2 justify-center flex-wrap">
			{#each categoryBar as categoryPost}
				<li class=" w-auto bg-gray-100 p-2 rounded-md">{categoryPost}</li>
			{/each}
		</ul>
	</div>

	<div class="w-[90%] lg:w-[70%] mx-auto flex flex-col lg:justify-around mt-4">
		{#each filteredPosts as post}
			<CardPost
				title={post.title}
				description={post.description}
				categories={post.categories}
				slug={post.slug}
			/>
		{/each}
	</div>
</section>
