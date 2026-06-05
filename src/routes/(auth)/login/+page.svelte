<script lang="ts">
	import Toast from '$lib/components/Toast.svelte';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

{#if form?.error}
	{#key form}
		<Toast message={form.error} variant="error" />
	{/key}
{/if}

<div class="auth-page">
	<h1>sign in</h1>

	<form method="POST">
		<label>
			<span>email</span>
			<input type="email" name="email" required autocomplete="email" />
		</label>
		<label>
			<span>password</span>
			<input type="password" name="password" required autocomplete="current-password" />
		</label>
		<button type="submit">sign in</button>
	</form>

	<p class="switch">no account? <a href="/register">sign up</a></p>
</div>

<style>
	.auth-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		padding: 32px 24px;
	}

	h1 { font-size: 24px; font-weight: 700; margin-bottom: 32px; }

	form {
		width: 100%;
		max-width: 360px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	label { display: flex; flex-direction: column; gap: 6px; }

	span { font-size: 12px; color: var(--text-muted); }

	input {
		background: var(--surface);
		border: 1px solid var(--surface2);
		border-radius: var(--radius);
		color: var(--text);
		font-family: var(--font);
		font-size: 15px;
		padding: 12px 14px;
		outline: none;
		width: 100%;
	}

	input:focus { border-color: var(--accent); }

	button {
		margin-top: 4px;
		padding: 14px;
		background: var(--accent);
		color: #111;
		border: none;
		border-radius: var(--radius);
		font-size: 15px;
		font-weight: 600;
	}

	.switch { margin-top: 24px; font-size: 14px; color: var(--text-muted); }
	.switch a { color: var(--accent); }
</style>
