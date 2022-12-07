import axios from 'axios';

export const changeBalanceApi = async data => {
  const response = await axios.patch('/user/balance', data);
  return response.data;
};
