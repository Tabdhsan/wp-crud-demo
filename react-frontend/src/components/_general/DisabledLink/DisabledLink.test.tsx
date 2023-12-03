import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import DisabledLink from './DisabledLink';

describe('DisabledLink', () => {
	test('renders as disabled when disabled is true', () => {
		const { getByText } = render(
			<DisabledLink to='/some-path' disabled={true}>
				Link Text
			</DisabledLink>
		);

		const disabledLink = getByText('Link Text');
		expect(disabledLink).toHaveStyle('text-align: center');
	});

	test('renders as a RouterLink when disabled is false', () => {
		const { getByText } = render(
			<MemoryRouter>
				<DisabledLink to='/some-path' disabled={false}>
					Link Text
				</DisabledLink>
			</MemoryRouter>
		);

		const routerLink = getByText('Link Text');
		expect(routerLink.tagName).toBe('A');
		expect(routerLink).toHaveStyle('text-align: center');
	});
});
