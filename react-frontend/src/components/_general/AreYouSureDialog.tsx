import {
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material';

interface AreYouSureDialogProps {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
}

const AreYouSureDialog = (props: AreYouSureDialogProps) => {
	const { open, onClose, onDelete } = props;
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle textAlign='center'>Are you sure?</DialogTitle>
			<DialogContent>
				<Stack
					direction='row'
					gap={3}
					width='100%'
					justifyContent='center'
				>
					<Button variant='contained' onClick={onClose}>
						No
					</Button>

					<Button
						variant='contained'
						onClick={onDelete}
						sx={{
							'&:hover': { backgroundColor: 'red' },
						}}
					>
						Yes
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default AreYouSureDialog;
