import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('registration.emailErr')
    .required('registration.required'),
  password: Yup.string()
    .min(7, 'registration.lengthErr')
    .required('registration.required'),
});
