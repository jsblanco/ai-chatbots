'use client';

import { FunctionComponent } from 'react';

import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { Clock, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

interface CategoriesProps {
	data: Category[];
}

const categoryButtonClasses =
	'flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md hover:opacity-75 transition';
const activeBg = 'bg-primary/25';
const inactiveBg = 'bg-primary/10';

const Categories: FunctionComponent<CategoriesProps> = ({ data }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoryId = searchParams.get('categoryId');

	const onClick = (id?: string) => {
		const query = { categoryId: id };
		const url = queryString.stringifyUrl(
			{ url: window.location.href, query },
			{ skipNull: true }
		);
		router.push(url);
	};

	return (
		<div className="w-full overflow-x-auto space-x-2 flex p-1">
			<button
				className={cn(
					categoryButtonClasses,
					'space-between',
					categoryId ? inactiveBg : activeBg
				)}
				onClick={() => onClick()}>
				<Clock className="pr-2" />
				Latest
			</button>
			{data.map((category) => (
				<button
					className={cn(
						categoryButtonClasses,
						category.id === categoryId ? activeBg : inactiveBg
					)}
					key={category.id}
					onClick={() => onClick(category.id)}>
					<h1>{category.name}</h1>
				</button>
			))}
		</div>
	);
};

export default Categories;
