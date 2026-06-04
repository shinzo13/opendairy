import { fail, redirect } from '@sveltejs/kit';
import { db, entries } from '$lib/server/db';
import { saveUpload } from '$lib/server/uploads';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const date = data.get('date') as string;
		const description = (data.get('description') as string)?.trim();
		const body = (data.get('body') as string)?.trim() ?? '';
		const image = data.get('image') as File;

		if (!image || image.size === 0) return fail(400, { error: 'photo is required' });
		if (!description) return fail(400, { error: 'description is required' });
		if (!date) return fail(400, { error: 'date is required' });

		const imageFilename = await saveUpload(image);

		await db.insert(entries).values({
			userId: locals.userId!,
			date,
			description,
			body,
			imageFilename
		});

		redirect(302, '/');
	}
};
