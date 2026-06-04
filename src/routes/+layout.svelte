<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>opendiary</title>
</svelte:head>

<!-- ambient atmosphere: warm glows + grain + vignette, fixed behind everything -->
<div class="atmo" aria-hidden="true">
	<div class="glow g1"></div>
	<div class="glow g2"></div>
	<div class="glow g3"></div>
	<div class="grain"></div>
	<div class="vignette"></div>
</div>

<div class="app">
	{@render children()}
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(:root) {
		/* warm-tinted dark palette */
		--bg: oklch(0.17 0.012 70);
		--bg-deep: oklch(0.13 0.01 70);
		--panel: oklch(0.205 0.012 72);
		--panel-line: oklch(0.3 0.012 72);
		--card: oklch(0.225 0.013 72);
		--line: oklch(0.34 0.012 72);
		--text: oklch(0.96 0.006 80);
		--dim: oklch(0.66 0.012 78);
		--dimmer: oklch(0.5 0.01 78);
		--accent: #f5c242;
		--accent-soft: color-mix(in oklch, var(--accent) 16%, transparent);

		--sans: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
		--serif: 'Newsreader', Georgia, serif;

		--radius: 12px;

		/* legacy aliases (kept so existing components keep working) */
		--surface: var(--panel);
		--surface2: var(--line);
		--text-muted: var(--dim);
		--font: var(--sans);
	}

	:global(body) {
		background: var(--bg);
		color: var(--text);
		font-family: var(--sans);
		min-height: 100dvh;
		overflow-x: hidden;
		-webkit-font-smoothing: antialiased;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		cursor: pointer;
		font-family: inherit;
	}

	.app { position: relative; z-index: 1; }

	/* ── atmosphere ── */
	.atmo { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
	.glow { position: absolute; border-radius: 50%; filter: blur(70px); }
	.g1 {
		width: 60vw; height: 50vw; left: 50%; top: -18vw; transform: translateX(-50%);
		background: radial-gradient(circle, color-mix(in oklch, var(--accent) 26%, transparent), transparent 68%);
	}
	.g2 {
		width: 46vw; height: 46vw; left: -10vw; bottom: -16vw;
		background: radial-gradient(circle, oklch(0.5 0.12 40 / 0.22), transparent 70%);
	}
	.g3 {
		width: 40vw; height: 40vw; right: -8vw; top: 30vh;
		background: radial-gradient(circle, oklch(0.55 0.09 150 / 0.13), transparent 70%);
	}
	.vignette {
		position: absolute; inset: 0;
		background: radial-gradient(120% 90% at 50% 38%, transparent 42%, var(--bg-deep) 100%);
	}
	.grain {
		position: absolute; inset: -50%; opacity: 0.05; mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}
</style>
