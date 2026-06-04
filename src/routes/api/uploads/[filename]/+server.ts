import { readUpload } from '$lib/server/uploads';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const buf = await readUpload(params.filename);
	if (!buf) error(404);

	const ext = params.filename.split('.').pop()?.toLowerCase() ?? 'jpg';
	const mime: Record<string, string> = {
		jpg: 'image/jpeg', jpeg: 'image/jpeg',
		png: 'image/png', webp: 'image/webp', gif: 'image/gif', heic: 'image/heic'
	};

	return new Response(buf, {
		headers: {
			'Content-Type': mime[ext] ?? 'image/jpeg',
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
