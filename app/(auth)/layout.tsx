import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex items-center justify-center h-full pb-16">
			{children}
		</div>
	);
};

export default AuthLayout;
