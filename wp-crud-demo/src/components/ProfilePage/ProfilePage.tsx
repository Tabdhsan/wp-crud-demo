import { Stack, TextField, Typography, Button } from '@mui/material'
import NavBar from '../_common/NavBar'
import { useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import { ProfileFormik } from './ProfileTypes'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { deleteUserByIdApi, getUserByIdApi, updateUserByIdApi } from '../../_apis/users'
import { User } from '../../_apis/apiTypes'
import { Edit } from '@mui/icons-material'

const ProfilePage = () => {
    const { id } = useParams();

    // TODOTAB: Should this be a state?
    // Also add the type
    const [curUser, setCurUser] = useState<User | null>(null)
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        if (!id || !!curUser) return
        getUserByIdApi(id).then((res) => {

            // @ts-expect-error TODOTAB: Fix this
            setCurUser(res)
        }).catch(err => console.log(err))
    }, [id, curUser])

    const enterEditMode = () => {
        setIsEditMode(true)
    }

    const exitEditMode = () => {
        setIsEditMode(false)
    }

    const deleteUser = () => {
        if (!id) return
        deleteUserByIdApi(id).then(({ data }) => {
            console.log(data)
            console.log('deleted')

            // TODOTAB: Redirect to home page
        }
        ).catch(err => console.log(err))
    }




    const profileFormik = useFormik<ProfileFormik>({
        enableReinitialize: true,
        initialValues: {
            username: curUser?.username || '',
            firstname: curUser?.firstname || '',
            lastname: curUser?.lastname || '',
            description: curUser?.description || '',
        },
        validationSchema: Yup.object({}),
        onSubmit: async (values) => {
            if (!id) return
            // Add a delay of 2 seconds (2000 milliseconds)
            await new Promise(resolve => setTimeout(resolve, 2000)); // TODOTAB: Remove this artificial delay
            updateUserByIdApi(id, values).then(({ data }) => {
                console.log(data)
                setCurUser(data.data)
                exitEditMode()
            }).catch(err => console.log(err))

            console.log('submit values', values);

        },
    })

    const { handleSubmit, getFieldProps } = profileFormik



    //TODOTAB: Handle this better ?
    // TODOTAB: Maybe check if a 404 was returned from the API
    if (!curUser) return (<div>User Not Found</div>)

    return (
        <Stack>
            {/* TODOTAB: Where should navbar be? */}
            <NavBar />
            <FormikProvider value={profileFormik}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Stack direction='row'>
                        <Stack width='30%' sx={{ backgroundColor: 'red' }}>
                            <Stack sx={{ backgroundColor: 'green' }}>This is where the image will go</Stack>
                            <Stack sx={{ backgroundColor: 'blue' }}>This is the info below the image</Stack>
                        </Stack>
                        <Stack width='70%' sx={{ backgroundColor: 'yellow' }} gap={2} p={2}>
                            <Stack direction='row' gap={1} alignItems='center'>
                                <Typography variant='h4'>Your Profile Info</Typography>
                                {!isEditMode && <Edit sx={{ fontSize: '1rem', cursor: 'pointer' }} onClick={enterEditMode} />}
                            </Stack>
                            {

                                isEditMode ?
                                    <Stack gap={2}>
                                        <TextField label='Username' {...getFieldProps('username')} />
                                        <TextField label='First Name' {...getFieldProps('firstname')} />
                                        <TextField label='Last Name' {...getFieldProps('lastname')} />
                                        <TextField label='Description' {...getFieldProps('description')} />

                                        {/* TODOTAB: See if this is used else where */}
                                        <Stack direction='row' gap={1} alignSelf='flex-end'>
                                            <Button variant='contained' onClick={exitEditMode}>Cancel</Button>
                                            <Button variant='contained' type='submit'>Save</Button>
                                        </Stack>
                                    </Stack>
                                    :
                                    <Stack>
                                        <Stack direction='row' gap={1}>
                                            <Typography>Username:</Typography>
                                            <Typography>@{curUser.username}</Typography>
                                        </Stack>
                                        <Stack direction='row' gap={1}>
                                            <Typography>First Name:</Typography>
                                            <Typography>{curUser.firstname}</Typography>
                                        </Stack>
                                        <Stack direction='row' gap={1}>
                                            <Typography>Last Name:</Typography>
                                            <Typography>{curUser.lastname}</Typography>
                                        </Stack>
                                        <Stack direction='row' gap={1}>
                                            <Typography>Description:</Typography>
                                            <Typography>{curUser.description}</Typography>
                                        </Stack>
                                    </Stack>

                            }
                        </Stack>
                    </Stack>
                </Form>
            </FormikProvider>
            {/* TODOTAB: Add are you sure dialog */}
            <Button variant='contained' onClick={deleteUser}>Delete Account</Button>
        </Stack>
    )
}

export default ProfilePage