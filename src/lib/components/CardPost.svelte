<script lang="ts">
	export let title: string;
	export let description: string;
	export let categories: string[];
	export let slug: string;
</script>

<div class="card card-side flex-row-reverse bg-base-100 shadow-lg mt-8">
	<figure class="w-40 m-4 rounded-md">
		<img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" />
	</figure>
	<div class="card-body">
		<h2 class="card-title"><a href={slug}>{title}</a></h2>
		<div class="card-actions justify-start">
			{#each categories as category}
				<div class="badge badge-outline">{category}</div>
			{/each}
		</div>
		<p>{description}</p>
		<div class="card-actions justify-start">
			<button class="btn btn-primary">Veja mais</button>
		</div>
	</div>
</div>
