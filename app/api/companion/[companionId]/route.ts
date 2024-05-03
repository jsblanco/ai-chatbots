import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
	req: Request,
	{ params }: { params: { companionId: string } }
) {
	try {
		const body = await req.json();
		const user = await currentUser();

		const { src, name, description, instructions, seed, categoryId } = body;
		if (!user || !user.id || !user.firstName) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!params.companionId) {
			return new NextResponse('Requested companion does not exist', {
				status: 400,
			});
		}

		if (!src || !name || !description || !instructions || !seed || !categoryId) {
			return new NextResponse('Missing required data', { status: 400 });
		}

		// TODO - Check for subscription

		const companion = await prismadb.companion.update({
			where: {
				id: params.companionId,
			},
			data: {
				src,
				name,
				description,
				instructions,
				seed,
				categoryId,
				userId: user.id,
				userName: user.firstName,
			},
		});

		return NextResponse.json(companion);
	} catch (error) {
		console.error('[COMPANION_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
