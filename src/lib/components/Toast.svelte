<script lang="ts">
	import { onMount } from 'svelte';

	let { message }: { message: string } = $props();
	let visible = $state(true);

	onMount(() => {
		const t = setTimeout(() => (visible = false), 3200);
		return () => clearTimeout(t);
	});
</script>

{#if visible}
	<div class="toast" class:hide={!visible}>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="20 6 9 17 4 12" />
		</svg>
		{message}
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 200;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		background: var(--accent);
		color: #111;
		border-radius: 40px;
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
		box-shadow: 0 4px 24px rgba(0,0,0,0.4);
		animation: in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both,
		           out 0.3s ease 2.9s both;
	}

	@keyframes in {
		from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	@keyframes out {
		from { opacity: 1; }
		to   { opacity: 0; }
	}
</style>
