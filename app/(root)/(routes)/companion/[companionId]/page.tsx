import { FunctionComponent } from 'react';

import prismadb from '@/lib/prismadb';

import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
	params: {
		companionId: string;
	};
}

const CompanionIdPage: FunctionComponent<CompanionIdPageProps> = async ({
	params,
}) => {
	// TODO - Check subscription status
	const companion = await prismadb.companion.findUnique({
		where: { id: params.companionId },
	});

	const categories = await prismadb.category.findMany();

	return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
