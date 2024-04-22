/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
	printWidth: 80,
	tabWidth: 1,
	singleQuote: true,
	bracketSameLine: true,
	trailingComma: 'es5',
	arrowParens: 'always',
	useTabs: true,
	semi: true,
	importOrder: [
		'^react(.*)',
		'<THIRD_PARTY_MODULES>',
		'^@/components/(.*)$',
		'^[./].*(?<!\\.(c|le|sc)ss)$',
		'^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$',
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderCaseInsensitive: true,
	importOrderSortSpecifiers: true,
	importOrderSeparation: true,
};

module.exports = config;
