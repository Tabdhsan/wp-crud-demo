import * as Yup from 'yup';

export const alphanumericValidation = Yup.string()
	.required('Required')
	.matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed');

export const alphaValidation = Yup.string()
	.required('Required')
	.matches(/^[a-zA-Z]*$/, 'Only letters are allowed');
