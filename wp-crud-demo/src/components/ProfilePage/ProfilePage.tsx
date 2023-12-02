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

const ProfilePage = () => {
	const params = useParams();

	// TODOTAB: Should this be a state?
	// Also add the type
	const [curUser, setCurUser] = useState<User | null>(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [cookies] = useCookies();

	// these would be state
	const curTab = 'Profile';
	const tabs = ['Profile', 'Notifications', 'Messages', 'Settings'];
	const hobbies = [
		'Watching Netflix',
		'Playing Video Games',
		'Petting Their Dog',
	];

	// should actually be returned from api call
	const isSelf =
		!!params.id &&
		parseInt(params.id) === cookies['wp-crud-demo-profileid'];

	useEffect(() => {
		if (!params.id) return;
		getUserByIdApi(params?.id)
			.then(res => {
				setCurUser(res.data);
			})
			.catch(err => console.log(err));
	}, [params]);

	const enterEditMode = () => {
		setIsEditMode(true);
	};

	const exitEditMode = () => {
		setIsEditMode(false);
	};

	const deleteUser = () => {
		if (!params.id) return;
		deleteUserByIdApi(params.id)
			.then(({ data }) => {
				console.log(data);
				console.log('deleted');

				// TODOTAB: Redirect to home page
			})
			.catch(err => console.log(err));
	};

	const profileFormik = useFormik<ProfileFormik>({
		enableReinitialize: true,
		initialValues: {
			username: curUser?.username || '',
			firstname: curUser?.firstname || '',
			lastname: curUser?.lastname || '',
			description: curUser?.description || '',
		},
		validationSchema: Yup.object({}),
		onSubmit: async values => {
			if (!params.id) return;
			// Add a delay of 2 seconds (2000 milliseconds)
			await new Promise(resolve => setTimeout(resolve, 2000)); // TODOTAB: Remove this artificial delay
			updateUserByIdApi(params.id, values)
				.then(res => {
					console.log('result', res);
					setCurUser(res.data);
					exitEditMode();
				})
				.catch(err => console.log(err));

			console.log('submit values', values);
		},
	});

	const { handleSubmit, getFieldProps } = profileFormik;

	//TODOTAB: Handle this better ?
	// TODOTAB: Maybe check if a 404 was returned from the API
	if (!curUser)
		return (
			<>
				<NavBar />
				<div>User Not Found</div>;
			</>
		);

	return (
		<Stack>
			{/* TODOTAB: Where should navbar be? */}
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
									{/* TODOTAB: Add are you sure dialog */}
									<Typography
										onClick={deleteUser}
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
													/>
													<TextField
														sx={{ width: '50%' }}
														label='Last Name'
														{...getFieldProps(
															'lastname'
														)}
													/>
												</Stack>
												<TextField
													label='Username'
													{...getFieldProps(
														'username'
													)}
												/>
												<TextField
													label='Description'
													{...getFieldProps(
														'description'
													)}
												/>

												{/* TODOTAB: See if this is used else where */}
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
