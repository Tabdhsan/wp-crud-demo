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
        return <span>{children}</span>;
    }

    return <RouterLink to={to}>{children}</RouterLink>;
};


export default DisabledLink;