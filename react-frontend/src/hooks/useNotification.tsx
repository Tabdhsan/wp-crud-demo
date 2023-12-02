import { useState } from 'react';

interface Notification {
	open: boolean;
	message: string;
	severity: 'success' | 'info' | 'warning' | 'error';
}

const useNotification = () => {
	const [notificationInfo, setNotificationInfo] = useState<Notification>({
		open: false,
		message: '',
		severity: 'success',
	});

	const showNotification = (
		message: Notification['message'],
		severity: Notification['severity']
	) => {
		setNotificationInfo({
			open: true,
			message,
			severity,
		});
	};

	const hideNotification = () => {
		setNotificationInfo({
			...notificationInfo,
			open: false,
		});
	};

	return {
		notificationInfo,
		showNotification,
		hideNotification,
	};
};

export default useNotification;
