<script lang="ts">
	import type { Post } from '$lib/types';

	//	export let posts: Post[];
	//export let queryValue: string;
	//export let image: string | null;
</script>

<div class="navbar bg-base-100 px-1">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">daisyUI</a>
	</div>
	<div class="flex-none gap-2">
		<slot />
	</div>
</div>
