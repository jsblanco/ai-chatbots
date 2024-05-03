const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
	try {
		await db.category.createMany({
			data: [
				{ name: 'Historical figures' },
				{ name: 'Fiction' },
				{ name: 'Politics' },
			],
		});
	} catch (error) {
		console.error('Error seeding default categories.', error);
	} finally {
		await db.$disconnect();
	}
}

main();
