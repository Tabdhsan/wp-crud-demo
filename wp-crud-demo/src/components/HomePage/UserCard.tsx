
import { Card } from "@mui/material";
import { useNavigate } from 'react-router-dom'

interface UserCardProps {
    id: number;
    name: string;
    description: string;
}

const UserCard = (props: UserCardProps) => {
    const { id, name, description } = props;
    const navigate = useNavigate();

    // type for event: React.MouseEvent<HTMLDivElement, MouseEvent>
    const handleClick = () => {
        navigate(`/profile/${id}`)
    }

    return (
        <Card sx={{ padding: 2, backgroundColor: 'red', m: 'auto', cursor: 'pointer' }} onClick={handleClick}>
            <h1>{name}</h1>
            <p>{description}</p>
        </Card>
    )
}

export default UserCard