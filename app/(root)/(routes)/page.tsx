import prismadb from '@/lib/prismadb';

import Categories from '@/components/categories';
import Companions from '@/components/companions';
import SearchInput from '@/components/search-input';

interface RootPageProps {
	searchParams: {
		categoryId: string;
		name: string;
	};
}

export default async function Home({ searchParams }: RootPageProps) {
	const data = await prismadb.companion.findMany({
		where: {
			categoryId: searchParams.categoryId,
			name: {
				search: searchParams.name,
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			_count: {
				select: {
					messages: true,
				},
			},
		},
	});
	const categories = await prismadb.category.findMany();

	return (
		<main className="h-full p-4 space-y-2">
			<SearchInput />
			<Categories data={categories} />
			<Companions data={data} />
		</main>
	);
}
