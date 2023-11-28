// import { Edit } from '@mui/icons-material'
// import { Stack, Typography, TextField, Button } from '@mui/material'
// import { useState } from 'react'
// import { User } from '../../_apis/apiTypes'

// interface ProfileItemProps {
//     user: User
// }


// // TODOTAB: This might be useless
// const ProfileItem = (props: ProfileItemProps) => {
//     const { user } = props

//     const { username } = user

//     const [isEditMode, setIsEditMode] = useState(false)

//     const enterEditMode = () => {
//         setIsEditMode(true)
//     }

//     const exitEditMode = () => {
//         setIsEditMode(false)
//     }


//     return (
//         <Stack m={2}>
//             <Stack direction='row' sx={{ alignItems: 'center' }} gap={1}>
//                 <Typography variant='h5'>{title}</Typography>
//                 {!isEditMode && <Edit sx={{ fontSize: '1rem', cursor: 'pointer' }} onClick={enterEditMode} />}
//             </Stack>
//             {
//                 isEditMode ?
//                     <Stack gap={2}>
//                         <TextField multiline />
//                         <Stack direction='row' gap={1} alignSelf='flex-end'>
//                             <Button variant='contained' onClick={exitEditMode}>Cancel</Button>
//                             <Button variant='contained'>Save</Button>
//                         </Stack>
//                     </Stack>
//                     : <Typography>{description}</Typography>
//             }


//         </Stack >
//     )
// }

// export default ProfileItem