import { fail, redirect } from '@sveltejs/kit';
import { db, users } from '$lib/server/db';
import { hashPassword, createToken } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.userId) redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim().toLowerCase();
		const password = data.get('password') as string;

		if (!email || !password) return fail(400, { error: 'заполни все поля' });
		if (password.length < 8) return fail(400, { error: 'пароль минимум 8 символов' });

		const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
		if (existing) return fail(400, { error: 'этот email уже зарегистрирован' });

		const [user] = await db
			.insert(users)
			.values({ email, passwordHash: await hashPassword(password) })
			.returning();

		cookies.set('token', createToken(user.id), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(302, '/');
	}
};
