import { Stack } from '@mui/material'
import NavBar from '../General/NavBar'
import ProfileItem from './ProfileItem'
import { useFormik, FormikProvider, Form } from 'formik'
import * as Yup from 'yup'
import { ProfileFormik } from './ProfileTypes'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { deleteUserByIdApi, getUserByIdApi, updateUserByIdApi } from '../../_apis/api'
import { User } from '../../_apis/apiTypes'

const ProfilePage = () => {
    const { id } = useParams();

    // TODOTAB: Should this be a statE?
    // Also add the type
    const [curUser, setCurUser] = useState<User | null>(null)

    useEffect(() => {
        if (!id) return
        getUserByIdApi(id).then(({ data }) => {
            console.log(data)
            setCurUser(data.data)
        }).catch(err => console.log(err))

    }, [id])

    const deleteProfile = () => {
        if (!id) return
        deleteUserByIdApi(id).then(({ data }) => {
            console.log(data)
            console.log('deleted')

            // TODOTAB: Redirect to home page
        }
        ).catch(err => console.log(err))
    }

    const updateProfile = () => {
        if (!id) return
        updateUserByIdApi(id, {
            username: 'This is from react'
        }).then(({ data }) => {
            console.log(data)
            setCurUser(data.data)
            console.log('updated')
        }
        ).catch(err => console.log(err))

    }



    const profileFormik = useFormik<ProfileFormik>({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            hobbies: '',
            description: '',
        },
        validationSchema: Yup.object({}),
        onSubmit: async (values) => {
            // Add a delay of 2 seconds (2000 milliseconds)
            await new Promise(resolve => setTimeout(resolve, 2000)); // TODOTAB: Remove this artificial delay

            console.log('submit values', values);

        },
    })

    const { handleSubmit } = profileFormik



    const testItems = [
        {
            'title': 'Hobbies',
            'description': 'test'
        },
        {
            'title': 'Description',
            'description': 'test'
        },
        {
            'title': 'Location',
            'description': 'test'
        }
    ]


    //TODOTAB: Handle this better ?
    // TODOTAB: Maybe check if a 404 was returned from the API
    if (!curUser) return (<div>User Not Found</div>)

    return (
        <Stack>
            {/* TODOTAB: Where should navbar be? */}
            <NavBar />
            <button type='button' onClick={() => console.log(curUser)}>curUser</button>
            <button type='button' style={{ backgroundColor: 'red' }} onClick={deleteProfile}>delete</button>
            <button type='button' style={{ backgroundColor: 'green' }} onClick={updateProfile}>update</button>
            <h1>{curUser?.username}</h1>
            <FormikProvider value={profileFormik}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Stack direction='row'>
                        <Stack width='30%' sx={{ backgroundColor: 'red' }}>
                            <Stack sx={{ backgroundColor: 'green' }}>This is where the image will go</Stack>
                            <Stack sx={{ backgroundColor: 'blue' }}>This is the info below the image</Stack>
                        </Stack>
                        <Stack width='70%' sx={{ backgroundColor: 'yellow' }}>
                            {/* TODOTAB: This can be a mapped array of nodes */}
                            {
                                testItems?.map(item => (
                                    <ProfileItem
                                        key={item.title}
                                        title={item.title}
                                        description={item.description}
                                    />
                                )
                                )
                            }
                        </Stack>
                    </Stack>
                </Form>
            </FormikProvider>
        </Stack>
    )
}

export default ProfilePage