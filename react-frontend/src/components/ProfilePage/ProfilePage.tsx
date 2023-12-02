import { Stack, TextField, Typography, Button } from '@mui/material';
import './ProfilePage.css';
import NavBar from '../_general/NavBar';
import { useFormik, FormikProvider, Form } from 'formik';
import * as Yup from 'yup';
import { ProfileFormik } from './ProfileTypes';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	deleteUserByIdApi,
	getUserByIdApi,
	updateUserByIdApi,
} from '../../_apis/users';
import { User } from '../../_apis/apiTypes';
import { Card, Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import { ID_COOKIE } from '../../utils/envConstants';
import UserNotFound from './UserNotFound';
import { alphanumericValidation } from '../../utils/validationConstants';
import useNotification from '../../hooks/useNotification';
import CustomNotification from '../_general/Notifications';
import AreYouSureDialog from '../_general/AreYouSureDialog/AreYouSureDialog';

const ProfilePage = () => {
	const params = useParams();
	const [cookies] = useCookies();
	const { notificationInfo, showNotification, hideNotification } =
		useNotification();

	const [curUser, setCurUser] = useState<User | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const isSelf =
		!!params.id && parseInt(params.id) === cookies[ID_COOKIE ?? ''];

	// These would be also editable in the future
	const curTab = 'Profile';
	const tabs = ['Profile', 'Notifications', 'Messages', 'Settings'];
	const hobbies = [
		'Watching Netflix',
		'Playing Video Games',
		'Petting Their Dog',
	];

	const enterEditMode = () => {
		setIsEditMode(true);
	};

	const exitEditMode = () => {
		setIsEditMode(false);
	};

	const openDialog = () => {
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
	};

	const deleteUser = () => {
		if (!params.id) return;
		deleteUserByIdApi(params.id)
			.then(() => {})
			.catch(err => console.log(err));
	};

	const onDelete = () => {
		deleteUser();
		closeDialog();
	};

	const profileFormik = useFormik<ProfileFormik>({
		enableReinitialize: true,
		initialValues: {
			username: curUser?.username || '',
			firstname: curUser?.firstname || '',
			lastname: curUser?.lastname || '',
			description: curUser?.description || '',
		},
		validationSchema: Yup.object({
			username: alphanumericValidation,
			firstname: alphanumericValidation,
			lastname: alphanumericValidation,
			description: Yup.string().notRequired(),
		}),
		onSubmit: async values => {
			if (!params.id) return;

			updateUserByIdApi(params.id, values)
				.then(res => {
					setCurUser(res.data);
					exitEditMode();
					showNotification('User updated successfully!', 'success');
				})
				.catch(err => {
					showNotification(err, 'error');
				});
		},
	});

	const { handleSubmit, getFieldProps, touched, errors } = profileFormik;

	useEffect(() => {
		if (!params.id) return;
		getUserByIdApi(params?.id)
			.then(res => {
				setCurUser(res.data);
			})
			.catch(err => console.log(err));
	}, [params]);

	if (!curUser)
		return (
			<>
				<NavBar />
				<UserNotFound />
			</>
		);

	return (
		<Stack>
			<CustomNotification
				open={notificationInfo.open}
				onClose={hideNotification}
				message={notificationInfo.message}
				severity={notificationInfo.severity}
			/>
			<AreYouSureDialog
				open={dialogOpen}
				onClose={closeDialog}
				onDelete={onDelete}
			/>

			<NavBar />
			<FormikProvider value={profileFormik}>
				<Form noValidate onSubmit={handleSubmit}>
					<Grid
						container
						justifyContent='center'
						sx={{ width: '100%' }}
					>
						<Grid item xs={8} sm={3}>
							<Stack sx={{ width: '100%' }}>
								<Stack sx={{ width: '100%' }}>
									<img
										className='profilePic'
										alt='Upload a profile pic!'
										src='/blankProfPic.jpg'
									/>
								</Stack>
							</Stack>

							{isSelf && (
								<Stack
									className='editButtons'
									sx={{ margin: '1rem 3rem' }}
								>
									<Typography
										onClick={enterEditMode}
										sx={{
											color: 'blue',
											opacity: 0.7,
											fontSize: '0.75rem',
											cursor: 'pointer',
										}}
									>
										EDIT PROFILE
									</Typography>
									<Typography
										onClick={openDialog}
										sx={{
											color: 'red',
											opacity: 0.7,
											fontSize: '0.75rem',
											cursor: 'pointer',
										}}
									>
										DELETE PROFILE
									</Typography>
								</Stack>
							)}

							{isSelf && (
								<Stack
									className='tabStack'
									spacing={1}
									sx={{ margin: '2rem 3rem' }}
								>
									{tabs.map(tabName => (
										<Typography
											className={
												curTab == tabName
													? 'active'
													: 'inactive'
											}
											sx={{ cursor: 'pointer' }}
											variant='h6'
											key={tabName}
										>
											{tabName}
										</Typography>
									))}
								</Stack>
							)}
						</Grid>
						<Grid item xs={12} sm={9}>
							<Stack spacing={3} sx={{ margin: '2rem 4rem' }}>
								<Card className='profileCard'>
									<Stack gap={2} p={2}>
										{isEditMode ? (
											<Stack gap={2}>
												<Stack
													spacing={1}
													direction='row'
												>
													<TextField
														sx={{ width: '50%' }}
														label='First Name'
														{...getFieldProps(
															'firstname'
														)}
														error={Boolean(
															touched.firstname &&
																errors.firstname
														)}
														helperText={
															touched.firstname &&
															errors.firstname
														}
													/>
													<TextField
														sx={{ width: '50%' }}
														label='Last Name'
														{...getFieldProps(
															'lastname'
														)}
														error={Boolean(
															touched.lastname &&
																errors.lastname
														)}
														helperText={
															touched.lastname &&
															errors.lastname
														}
													/>
												</Stack>
												<TextField
													label='Username'
													{...getFieldProps(
														'username'
													)}
													error={Boolean(
														touched.username &&
															errors.username
													)}
													helperText={
														touched.username &&
														errors.username
													}
												/>
												<TextField
													label='Description'
													{...getFieldProps(
														'description'
													)}
													error={Boolean(
														touched.description &&
															errors.description
													)}
													helperText={
														touched.description &&
														errors.description
													}
												/>

												<Stack
													direction='row'
													gap={1}
													alignSelf='flex-end'
												>
													<Button
														variant='contained'
														onClick={exitEditMode}
													>
														Cancel
													</Button>
													<Button
														variant='contained'
														type='submit'
													>
														Save
													</Button>
												</Stack>
											</Stack>
										) : (
											<Stack>
												<Typography variant='h4'>
													{curUser.firstname}{' '}
													{curUser.lastname}
												</Typography>
												<Typography
													sx={{ fontWeight: '700' }}
												>
													@{curUser.username}
												</Typography>
												<Typography
													sx={{ marginTop: '1.5rem' }}
												>
													{curUser.description}
												</Typography>
											</Stack>
										)}
									</Stack>
								</Card>
								<Card className='profileCard'>
									<Stack spacing={1} p={2}>
										<Typography variant='overline'>
											{curUser.firstname}'s hobbies
											include...
										</Typography>
										<Stack direction='column' spacing={2}>
											{hobbies.map(hobby => (
												<Typography
													variant='body2'
													className='profileHobby'
												>
													{hobby}
												</Typography>
											))}
										</Stack>
									</Stack>
								</Card>
							</Stack>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
		</Stack>
	);
};

export default ProfilePage;
