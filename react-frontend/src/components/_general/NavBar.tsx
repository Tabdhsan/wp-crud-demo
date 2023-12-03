import { Stack, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { AccountCircle, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signoutApi } from '../../_apis/authentication';
import { useCookies } from 'react-cookie';
import { ID_COOKIE } from '../../utils/envConstants';

const NavBar = () => {
	const navigate = useNavigate();
	const [cookies] = useCookies();

	const navigateToUserPage = () => {
		const profileId = cookies[ID_COOKIE ?? ''];
		if (!profileId) return;
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
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexGrow: 1,
					}}
					direction='row'
					onClick={navigateToHomePage}
				>
					<img
						height='50vh'
						alt='Logo'
						src='/whiteLogo.png'
						style={{ cursor: 'pointer' }}
					/>
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
