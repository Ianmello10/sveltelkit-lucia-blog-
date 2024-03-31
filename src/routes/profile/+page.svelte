<script lang="ts">
	import NavBar from '$lib/components/navBar.svelte';
	export let data;

	console.log(data.userComment, 'teste');
</script>

<nav class="w-[95%] mx-auto py-4">
	<NavBar>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img alt="Tailwind CSS Navbar component" src={data.user?.image} />
				</div>
			</div>
			<ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
				<li><a href="/">Home</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	</NavBar>
</nav>

<div class="overflow-x-auto w-[90%] mx-auto mt-12">
	<h2>Meus comentários:</h2>
	<form method="post" action="?/delete">
		<table class="table mt-10">
			<!-- head -->
			<thead>
				<tr>
					<th>Likes</th>
					<th>Post</th>
					<th>Comentario</th>
					<th>Deletar</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each data.userComment as comment}
					<tr>
						<th>1</th>
						<td><a href="/{comment.postSlug}">{comment.postSlug}</a></td>
						<td>{comment.content}</td>

						<td>
							<input name="id" value={comment.id} type="hidden" />
							<button class="btn btn-sm" type="submit">deletar</button></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</form>
</div>
