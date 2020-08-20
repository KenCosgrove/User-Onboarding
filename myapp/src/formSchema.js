import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
    .string()
    .min(2, 'name must be at least 2 characters long')
    .required('Name is Required'),
    email: yup
    .string()
    .email('Must be a valid email address')
    .required('Must include email address'),
    password: yup
    .string()
    .min(6, 'password must be at least 6 characters long')
    .required('Must include password'),
    terms: yup
    .boolean()
    .oneOf([true])
})
   

export default formSchema
