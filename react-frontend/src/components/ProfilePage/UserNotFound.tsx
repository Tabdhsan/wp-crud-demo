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
			<Grid item xs={4}>
				<Stack spacing={3}>
					<Typography variant='h1'>Uh Oh!</Typography>
					<Typography variant='h5'>
						We have searched far and wide and cannot seem to find
						that user. Go back to the home page to find all the best
						users
					</Typography>
					<a
						href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
						target='_blank'
					>
						<img
							className='fourOhFour'
							alt='Upload a profile pic!'
							src='/UhOh.png'
						/>
					</a>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default UserNotFound;
