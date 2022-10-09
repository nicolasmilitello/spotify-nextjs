import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: [
		'/',
		'/artist/:id*',
		'/album/:id*',
		'/user',
		'/yourlibrary',
		'/track/:id*',
		'/search',
		'/login',
	],
};

export async function middleware(req: NextRequest) {
	const token = await getToken({
		req: req,
		secret: process.env.JWT_SECRET,
	});

	const { pathname, origin } = req.nextUrl;

	if (pathname.includes('/login') && token) {
		return NextResponse.redirect(`${origin}`);
	}

	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	if (!token && pathname !== '/login') {
		return NextResponse.redirect(`${origin}/login`);
	}
}
