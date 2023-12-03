import { Alert, Snackbar } from '@mui/material';

interface NotificationsProps {
	open: boolean;
	onClose: () => void;
	message: string;
	severity: 'success' | 'info' | 'warning' | 'error';
}

const CustomNotification = (props: NotificationsProps) => {
	const { open, onClose, message, severity } = props;

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={open}
			message={message}
			onClose={onClose}
			autoHideDuration={1000}
		>
			<Alert severity={severity}>{message}</Alert>
		</Snackbar>
	);
};

export default CustomNotification;
