import * as Yup from 'yup';

export const validationSchema = Yup.object({
  description: Yup.string().required('transactions.required'),
  category: Yup.mixed().test({
    message: 'transactions.required',
    test: value => value !== null,
  }),
  amount: Yup.number().required('transactions.required'),
});
