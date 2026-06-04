<script lang="ts">
	import { goto } from '$app/navigation';
	import { MONTHS, DOW, parseDate, buildMonth, type Entry } from '$lib/diary';

	let { entries }: { entries: Entry[] } = $props();

	const today = new Date();
	const oldest = $derived(parseDate(entries[entries.length - 1].date));

	let ym = $state({ y: today.getFullYear(), m: today.getMonth() });

	const minIdx = $derived(oldest.getFullYear() * 12 + oldest.getMonth());
	const maxIdx = today.getFullYear() * 12 + today.getMonth();
	const idx = $derived(ym.y * 12 + ym.m);
	const weeks = $derived(buildMonth(ym.y, ym.m, entries));

	function step(d: number) {
		const n = idx + d;
		if (n < minIdx || n > maxIdx) return;
		ym = { y: Math.floor(n / 12), m: ((n % 12) + 12) % 12 };
	}

	function isToday(day: number) {
		return ym.y === today.getFullYear() && ym.m === today.getMonth() && day === today.getDate();
	}
</script>

<div class="panel">
	<div class="cal-head">
		<div class="m">{MONTHS[ym.m]} {ym.y}</div>
		<div class="cal-nav">
			<button onclick={() => step(-1)} disabled={idx <= minIdx} aria-label="previous month">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
			</button>
			<button onclick={() => step(1)} disabled={idx >= maxIdx} aria-label="next month">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
			</button>
		</div>
	</div>
	<div class="cal-grid">
		{#each DOW as d, i (i)}
			<div class="dow">{d}</div>
		{/each}
		{#each weeks.flat() as cell, i (i)}
			{#if !cell}
				<div></div>
			{:else if cell.entry}
				<button
					class="cal-cell has"
					class:today={isToday(cell.d)}
					title={cell.entry.description}
					onclick={() => goto(`/entry/${cell!.entry!.id}`)}
				>{cell.d}</button>
			{:else}
				<div class="cal-cell" class:today={isToday(cell.d)}>{cell.d}</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.panel {
		background: color-mix(in oklch, var(--panel) 86%, transparent);
		border: 1px solid color-mix(in oklch, var(--panel-line) 70%, transparent);
		border-radius: 20px;
		padding: 18px;
	}
	.cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
	.cal-head .m { font-size: 14px; font-weight: 700; }
	.cal-nav { display: flex; gap: 4px; }
	.cal-nav button {
		width: 24px; height: 24px; border-radius: 7px;
		border: 1px solid var(--line); background: transparent; color: var(--dim);
		cursor: pointer; display: grid; place-items: center;
	}
	.cal-nav button:hover:not(:disabled) { color: var(--text); border-color: var(--accent); }
	.cal-nav button:disabled { opacity: 0.3; cursor: default; }
	.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; }
	.cal-grid .dow { font-size: 9.5px; color: var(--dimmer); text-align: center; padding-bottom: 4px; font-weight: 600; }
	.cal-cell {
		aspect-ratio: 1; border-radius: 8px; display: grid; place-items: center;
		font-size: 11.5px; color: var(--dim); position: relative;
		border: none; background: transparent; font-family: inherit;
	}
	.cal-cell.today { box-shadow: inset 0 0 0 1px var(--accent); color: var(--text); }
	.cal-cell.has { cursor: pointer; color: var(--text); font-weight: 600; background: var(--accent-soft); }
	.cal-cell.has:hover { background: color-mix(in oklch, var(--accent) 30%, transparent); }
	.cal-cell.has::after {
		content: ''; position: absolute; bottom: 4px; width: 4px; height: 4px;
		border-radius: 50%; background: var(--accent);
	}
</style>
