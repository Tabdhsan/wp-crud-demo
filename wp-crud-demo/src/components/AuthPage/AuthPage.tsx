import { useState } from 'react';
import { Stack, TextField, Typography, Button, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AuthFormik, AuthTypes } from './AuthTypes';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import DisabledLink from '../_general/DisabledLink';
import CustomNotification from '../_general/Notifications';
import { signinApi, signupApi } from '../../_apis/authentication';
import { UserSignInReq } from '../../_apis/apiTypes';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(search);
	const isSignupMode = queryParams.get('mode') === AuthTypes.SIGN_UP;

	const headerText = isSignupMode ? 'Sign Up' : 'Login';
	const linkText = isSignupMode
		? 'Already have an account? Login here!'
		: 'Do not have an account? Sign up here!';
	const linkTo = isSignupMode ? '/auth' : `/auth?mode=${AuthTypes.SIGN_UP}`;

	// TODOTAB: Move this to hook?
	const [notificationInfo, setNotificationInfo] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'info' | 'warning' | 'error';
	}>({
		open: false,
		message: '',
		severity: 'success',
	});

	const authFormik = useFormik<AuthFormik>({
		enableReinitialize: true,
		initialValues: {
			username: '',
			password: '',
			firstname: '',
			lastname: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Required'),
			password: Yup.string().required('Required'),
			firstname: isSignupMode
				? Yup.string().required('Required')
				: Yup.string().notRequired(),
			lastname: isSignupMode
				? Yup.string().required('Required')
				: Yup.string().notRequired(),
		}),
		onSubmit: async values => {
			// Add a delay of 2 seconds (2000 milliseconds)

			if (isSignupMode) {
				signupApi(values)
					.then(() => {
						setNotificationInfo({
							open: true,
							message: 'User created successfully!',
							severity: 'success',
						});
						navigate('/');
					})
					.catch(() => {
						setNotificationInfo({
							open: true,
							message: 'User creation failed!',
							severity: 'error',
						});
					});
			} else {
				const signinValues: UserSignInReq = {
					username: values.username,
					password: values.password,
				};

				signinApi(signinValues)
					.then(() => {
						setNotificationInfo({
							open: true,
							message: 'Login successful!',
							severity: 'success',
						});
						navigate('/');
					})
					.catch(() => {
						setNotificationInfo({
							open: true,
							message: 'Login failed!',
							severity: 'error',
						});
					});
			}
		},
	});

	const { handleSubmit, getFieldProps, isSubmitting, touched, errors } =
		authFormik;

	return (
		<Card
			sx={{
				width: '100%',
				maxWidth: '400px',
				margin: 'auto',
				padding: '20px',
				marginTop: '100px',
			}}
		>
			<FormikProvider value={authFormik}>
				<CustomNotification
					open={notificationInfo.open}
					onClose={() =>
						setNotificationInfo({
							...notificationInfo,
							open: false,
						})
					}
					message={notificationInfo.message}
					severity={notificationInfo.severity}
				/>
				<Form noValidate onSubmit={handleSubmit}>
					<Stack gap={2}>
						<Typography variant='h4' textAlign='center'>
							{headerText}
						</Typography>
						<TextField
							disabled={isSubmitting}
							label='User Name'
							error={Boolean(touched.username && errors.username)}
							helperText={touched.username && errors.username}
							{...getFieldProps(`username`)}
						/>
						{isSignupMode && (
							<Stack gap={2}>
								<TextField
									disabled={isSubmitting}
									label='First Name'
									error={Boolean(
										touched.firstname && errors.firstname
									)}
									helperText={
										touched.firstname && errors.firstname
									}
									{...getFieldProps('firstname')}
								/>
								<TextField
									disabled={isSubmitting}
									label='Last Name'
									error={Boolean(
										touched.lastname && errors.lastname
									)}
									helperText={
										touched.lastname && errors.lastname
									}
									{...getFieldProps('lastname')}
								/>
							</Stack>
						)}
						<TextField
							disabled={isSubmitting}
							label='Password'
							type='password'
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
							{...getFieldProps('password')}
						/>
						<Button
							disabled={isSubmitting}
							variant='contained'
							type='submit'
						>
							Submit
						</Button>
						<DisabledLink to={linkTo} disabled={isSubmitting}>
							{linkText}
						</DisabledLink>
					</Stack>
				</Form>
			</FormikProvider>
		</Card>
	);
};

export default AuthPage;
