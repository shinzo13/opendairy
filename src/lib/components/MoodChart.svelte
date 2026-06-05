<script lang="ts">
	import { MOODS, moodCounts, type Entry } from '$lib/diary';

	let { entries }: { entries: Entry[] } = $props();

	const counts = $derived(moodCounts(entries));
	const max = $derived(counts.length ? Math.max(...counts.map(([, n]) => n)) : 1);
</script>

<div class="panel">
	<h3>how it felt</h3>
	{#if counts.length === 0}
		<p class="empty">no moods logged yet</p>
	{:else}
		<div class="chart">
			{#each counts as [m, n] (m)}
				<div class="col" title="{MOODS[m].label}: {n}">
					<span class="cnt">{n}</span>
					<div class="track">
						<div class="bar" style="height: {(n / max) * 100}%; background: {MOODS[m].color}"></div>
					</div>
					<span class="lbl">{MOODS[m].label}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.panel {
		background: color-mix(in oklch, var(--panel) 86%, transparent);
		border: 1px solid color-mix(in oklch, var(--panel-line) 70%, transparent);
		border-radius: 20px;
		padding: 18px;
	}
	h3 {
		margin: 0 0 16px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dim);
	}
	.empty { font-size: 13px; color: var(--dim); }

	.chart {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		padding-bottom: 26px; /* room for rotated labels */
	}
	.col {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}
	.cnt { font-size: 11px; font-weight: 700; color: var(--dim); }
	.track {
		width: 100%;
		height: 96px;
		display: flex;
		align-items: flex-end;
	}
	.bar {
		width: 100%;
		min-height: 4px;
		border-radius: 5px 5px 0 0;
		transition: height 0.3s cubic-bezier(0.2, 0.7, 0.3, 1);
	}
	.lbl {
		font-size: 10px;
		color: var(--dim);
		white-space: nowrap;
		transform: rotate(-40deg);
		transform-origin: top right;
		height: 0; /* let rotated text overflow into the reserved padding */
		align-self: center;
	}
</style>
