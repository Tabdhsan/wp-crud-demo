import './UserCard.css';
import { Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
	id: number;
	name: string;
}

const UserCard = (props: UserCardProps) => {
	const { id, name } = props;
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/profile/${id}`);
	};

	return (
		<Card className='userCard grow' onClick={handleClick} sx={{ pb: 3 }}>
			<Stack>
				<img
					className='profilePic'
					alt='Upload a profile pic!'
					src='/blankProfPic.jpg'
				/>
				<Typography variant='h4'>{name}</Typography>
			</Stack>
		</Card>
	);
};

export default UserCard;
