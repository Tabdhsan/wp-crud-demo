import { Stack, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { AccountCircle, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signoutApi } from '../../_apis/authentication';
import { useCookies } from 'react-cookie';

const NavBar = () => {
	const navigate = useNavigate();
	const [cookies] = useCookies();

	// TODOTAB: Move cookei name to env variable
	const navigateToUserPage = () => {
		const profileId = cookies['wp-crud-demo-profileid'];
		console.log('outside');
		if (!profileId) return;
		console.log('inside');
		navigate(`/profile/${profileId}`);
	};

	const navigateToHomePage = () => {
		navigate('/');
	};

	const signout = () => {
		signoutApi().catch(err => console.log(err));
		navigate('/auth/?mode=signin');
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				{/* Left side with logo and name */}
				<Stack
					style={{
						display: 'flex',
						alignItems: 'center',
						flexGrow: 1,
					}}
					direction='row'
					onClick={navigateToHomePage}
				>
					<img height='50vh' alt='Logo' src='/whiteLogo.png' />
				</Stack>

				<Stack direction='row' gap={1}>
					{/* Right side with profile, settings, and sign out buttons */}
					<IconButton color='inherit' onClick={navigateToUserPage}>
						<AccountCircle />
					</IconButton>
					<IconButton color='inherit'>
						<Settings />
					</IconButton>
					<Button
						onClick={signout}
						color='inherit'
						startIcon={<ExitToApp />}
					>
						Sign Out
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
