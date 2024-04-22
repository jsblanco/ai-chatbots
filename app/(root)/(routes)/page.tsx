import SearchInput from '@/components/search-input';

export default function Home() {
	return (
		<main className="h-full p-4 space-y-2">
			<h1 className="text-3xl">Root (protected)</h1>
			<SearchInput />
		</main>
	);
}
