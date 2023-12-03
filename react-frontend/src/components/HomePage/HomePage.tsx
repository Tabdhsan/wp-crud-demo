import NavBar from '../_general/NavBar';
import { Stack, Grid } from '@mui/material';
import UserCard from './UserCard';
import { useState, useEffect } from 'react';
import { getAllUsersApi } from '../../_apis/users';
import { User } from '../../_apis/apiTypes';

const HomePage = () => {
	const [allUsers, setAllUsers] = useState<User[]>([]);

	useEffect(() => {
		if (allUsers.length > 0) return;
		// API will never return an empty array of users
		getAllUsersApi()
			.then(res => {
				setAllUsers(res.data);
			})
			.catch(err => console.log(err));
	}, [allUsers.length]);

	return (
		<Stack>
			<NavBar />
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				direction='row'
				gap={4}
				sx={{ padding: '2rem 1rem', margin: 'auto' }}
			>
				{allUsers?.map(item => (
					<Grid item xs={12} sm={3} key={item.id}>
						<UserCard id={item.id} name={item.username} />
					</Grid>
				))}
			</Grid>
		</Stack>
	);
};

export default HomePage;
