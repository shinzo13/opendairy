import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	// already signed in → straight to the diary
	if (locals.userId) redirect(302, '/home');
};
