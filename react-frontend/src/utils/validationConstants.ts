import * as Yup from 'yup';

export const alphanumericValidation = Yup.string()
	.required('Required')
	.matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed');
