import { Stack, Typography, Grid } from '@mui/material';
import './ProfilePage.css';

const UserNotFound = () => {
	return (
		<Grid
			container
			sx={{ height: '90vh', width: '100%', textAlign: 'center' }}
			justifyContent={'center'}
			alignContent={'center'}
		>
			<Grid item xs={8}>
				<Stack spacing={3}>
					<Typography variant='h1'>Uh Oh!</Typography>
					<Typography variant='h5'>
						We have searched far and wide and cannot seem to find
						that user. Go back to the home to find all the best
						users
					</Typography>
					<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
						<img
							className='fourOhFour2'
							alt='Upload a profile pic!'
							src='../../../public/UhOh.png'
						/>
					</a>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default UserNotFound;
