import axios from 'axios';

axios.defaults.baseURL = 'https://kapusta-backend.goit.global';

export const getExpenseTransactionApi = async () => {
  const response = await axios.get('/transaction/expense');

  return response.data;
};

export const addExpenseTransactionApi = async ({
  description,
  amount,
  date,
  category,
}) => {
  const transaction = { description, amount, date, category };

  const response = await axios.post('/transaction/expense', transaction);

  return response.data;
};

export const deleteTransactionApi = async id => {
  const response = await axios.delete(`/transaction/${id}`);
  return response;
};

export const getIncomeTransactionApi = async () => {
  const response = await axios.get('/transaction/income');
  return response.data;
};

export const addIncomeTransactionApi = async ({
  description,
  amount,
  date,
  category,
}) => {
  const transaction = { description, amount, date, category };

  const response = await axios.post('/transaction/income', transaction);
  return response.data;
};
