<script lang="ts">
	import { MONTHS_SHORT, parseDate, daysBetween, type Entry } from '$lib/diary';

	let { entries }: { entries: Entry[] } = $props();

	const today = new Date();
	// entries are newest-first, so the last one is the oldest
	const first = $derived(entries[entries.length - 1]);
	const kept = $derived(daysBetween(parseDate(first.date), today));
	const thisMonth = $derived(
		entries.filter((e) => {
			const d = parseDate(e.date);
			return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
		}).length
	);
	const thisWeek = $derived(
		entries.filter((e) => {
			const n = daysBetween(parseDate(e.date), today);
			return n >= 0 && n <= 7;
		}).length
	);
	const firstShort = $derived(MONTHS_SHORT[parseDate(first.date).getMonth()].toLowerCase());
	const firstDay = $derived(parseDate(first.date).getDate());
</script>

<div class="panel">
	<h3>your diary</h3>
	<div class="streak">
		<span class="n">{kept}</span>
		<span class="u">days kept</span>
	</div>
	<div class="streak-sub">
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
		</svg>
		{entries.length} entries since {firstShort} {firstDay}
	</div>
	<div class="statgrid">
		<div class="stat"><div class="v">{thisMonth}</div><div class="l">this month</div></div>
		<div class="stat"><div class="v">{thisWeek}</div><div class="l">this week</div></div>
	</div>
</div>

<style>
	.panel {
		background: color-mix(in oklch, var(--panel) 86%, transparent);
		border: 1px solid color-mix(in oklch, var(--panel-line) 70%, transparent);
		border-radius: 20px;
		padding: 18px;
	}
	h3 {
		margin: 0 0 14px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dim);
	}
	.streak { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
	.streak .n { font-size: 40px; font-weight: 800; line-height: 1; letter-spacing: -0.03em; }
	.streak .u { font-size: 13px; color: var(--dim); }
	.streak-sub { font-size: 13px; color: var(--dim); display: flex; align-items: center; gap: 7px; }
	.statgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
	.stat { background: var(--card); border-radius: 13px; padding: 12px 13px; }
	.stat .v { font-size: 21px; font-weight: 700; letter-spacing: -0.02em; }
	.stat .l { font-size: 11.5px; color: var(--dim); margin-top: 2px; }
</style>
