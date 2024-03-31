<script>
	export let data;
	export let form;
	export let comment;
	console.log(data);
	//console.log(comment, 'front:');

	//console.log(data);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published at {data.meta.date}</p>

	<div>
		{#each data.meta.categories as category}
			<span>
				{category}
			</span>
		{/each}
	</div>

	<div>
		<svelte:component this={data.content} />
	</div>
	<h2>Commentarios :</h2>
	{#if data.user}
		<form method="POST" action="?/create">
			<input name="content" />

			<button type="submit">Enviar</button>
		</form>
	{:else}
		<input type="text" disabled placeholder="Faça login" />

		<a href="/login">Login</a>
	{/if}

	{#if data.comment && data.comment.length > 0}
		{#each data.comment as comment, index}
			{comment.content}

			{#if data.user?.id === comment.userId}
				<form method="post" action="?/delete">
					<input name="id" value={comment.id} type="hidden" />

					<button type="submit">Deletar</button>
				</form>
			{/if}
		{/each}
	{/if}
</article>
