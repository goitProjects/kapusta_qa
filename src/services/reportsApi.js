import axios from 'axios';

export const getDataForPeriod = date => {
  return axios
    .get(`/transaction/period-data?date=${date}`)
    .then(response => response.data);
};
