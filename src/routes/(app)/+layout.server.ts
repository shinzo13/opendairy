import { redirect } from '@sveltejs/kit';
import { db, users } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.userId) redirect(302, '/login');

	const [user] = await db.select({ id: users.id, email: users.email })
		.from(users)
		.where(eq(users.id, locals.userId))
		.limit(1);

	if (!user) redirect(302, '/login');

	return { user };
};
