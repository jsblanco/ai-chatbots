import prismadb from '@/lib/prismadb';

import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';

export default async function Home() {
	const categories = await prismadb.category.findMany();

	return (
		<main className="h-full p-4 space-y-2">
			<h1 className="text-3xl">Root (protected)</h1>
			<SearchInput />
			<Categories data={categories} />
		</main>
	);
}
