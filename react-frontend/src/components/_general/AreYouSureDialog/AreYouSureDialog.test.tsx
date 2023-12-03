import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AreYouSureDialog from './AreYouSureDialog';

describe('AreYouSureDialog', () => {
	test('renders with the correct title', () => {
		const { getByText } = render(
			<AreYouSureDialog
				open={true}
				onClose={() => {}}
				onDelete={() => {}}
			/>
		);

		expect(getByText('Are you sure?'));
	});

	test('calls onClose when "No" button is clicked', () => {
		const onCloseMock = jest.fn();
		const { getByText } = render(
			<AreYouSureDialog
				open={true}
				onClose={onCloseMock}
				onDelete={() => {}}
			/>
		);

		fireEvent.click(getByText('No'));
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	test('calls onDelete when "Yes" button is clicked', () => {
		const onDeleteMock = jest.fn();
		const { getByText } = render(
			<AreYouSureDialog
				open={true}
				onClose={() => {}}
				onDelete={onDeleteMock}
			/>
		);

		fireEvent.click(getByText('Yes'));
		expect(onDeleteMock).toHaveBeenCalledTimes(1);
	});
});
