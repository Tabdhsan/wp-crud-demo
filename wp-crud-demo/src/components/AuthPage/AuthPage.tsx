import { Stack, TextField, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AuthFormik, AuthTypes } from "./AuthTypes";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from 'yup';
import DisabledLink from "../General/DisabledLink";

const AuthPage = () => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const isSignupMode = queryParams.get("mode") === AuthTypes.SIGN_UP;

    const headerText = isSignupMode ? 'Sign Up' : 'Login';
    const linkText = isSignupMode ? 'Already have an account? Login here!' : 'Do not have an account? Sign up here!';
    const linkTo = isSignupMode ? '/auth' : `/auth?mode=${AuthTypes.SIGN_UP}`;

    // TODOTAB: Fix this any
    const authFormik = useFormik<AuthFormik>({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            firstName: isSignupMode ? Yup.string().required('Required') : Yup.string().notRequired(),
            lastName: isSignupMode ? Yup.string().required('Required') : Yup.string().notRequired(),
        }),
        onSubmit: async (values) => {
            // Add a delay of 2 seconds (2000 milliseconds)
            await new Promise(resolve => setTimeout(resolve, 2000)); // TODOTAB: Remove this artificial delay

            console.log('submit values', values);

        },
    });

    const { handleSubmit, getFieldProps, isSubmitting, touched, errors } = authFormik;


    return (
        <FormikProvider value={authFormik} >
            <Form noValidate onSubmit={handleSubmit}>
                <Stack gap={2}>
                    <Typography variant='h4'>{headerText}</Typography>
                    <TextField
                        disabled={isSubmitting}
                        label='User Name'
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        {...getFieldProps(`username`)}
                    />
                    {
                        isSignupMode &&
                        <Stack gap={2}>
                            <TextField
                                disabled={isSubmitting}
                                label='First Name'
                                error={Boolean(touched.firstName && errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                {...getFieldProps('firstName')} />
                            <TextField
                                disabled={isSubmitting}
                                label='Last Name'
                                error={Boolean(touched.lastName && errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                {...getFieldProps('lastName')} />
                        </Stack>

                    }
                    <TextField
                        disabled={isSubmitting}
                        label='Password'
                        type='password'
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        {...getFieldProps('password')}

                    />
                    <Button disabled={isSubmitting} variant='contained' type='submit'>Submit</Button>
                    <DisabledLink to={linkTo} disabled={isSubmitting}>{linkText}</DisabledLink>
                </Stack>
            </Form>
        </FormikProvider >
    )
}


export default AuthPage;