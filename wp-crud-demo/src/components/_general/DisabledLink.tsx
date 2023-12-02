import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface DisabledLinkProps {
	to: string;
	disabled: boolean;
	children: React.ReactNode;
}

const DisabledLink = (props: DisabledLinkProps) => {
	const { to, disabled, children } = props;
	if (disabled) {
		return <span style={{ textAlign: 'center' }}>{children}</span>;
	}

	return (
		<RouterLink to={to} style={{ textAlign: 'center' }}>
			{children}
		</RouterLink>
	);
};

export default DisabledLink;
