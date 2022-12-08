import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Loader from 'components/Loader/Loader';
import { Summary } from 'components/Summary/Summary';
import FormTransaction from 'components/FormTransaction/FormTransaction';
import TransactionList from 'components/TransactionList/TransactionList';
import {
  addIncomeTransaction,
  getIncomeTransaction,
} from 'redux/transaction/transaction-operations';
import {
  getIncomesTransactions,
  isLoading,
} from 'redux/transaction/transaction-selector';
import { incomesStats } from 'redux/monthsStats/monthsStats-selector';
import { getEmailUser } from 'redux/auth/AuthSelector';
import s from './IncomeComponent.module.css';

const getStartYearDate = () => {
  return new Date(2001, 0, 1);
};

const IncomeComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loading = useSelector(isLoading);
  const email = useSelector(getEmailUser);
  const transactions = useSelector(getIncomesTransactions);
  const monthStats = useSelector(incomesStats);

  // set starting date 2001-01-01
  const [date, setDate] = useState(() => getStartYearDate());

  const incomeCategArray = t('incomeCategArray', { returnObjects: true });

  const choisedDate = useMemo(() => moment(date).format('YYYY-MM-DD'), [date]);

  useEffect(() => {
    if (email && transactions.length === 0) dispatch(getIncomeTransaction());
    // eslint-disable-next-line
  }, [transactions.length, email]);

  return (
    <>
      <FormTransaction
        operation={addIncomeTransaction}
        options={incomeCategArray}
        setDate={setDate}
      />
      <div className={s.transactions}>
        <TransactionList
          location="incomes"
          transactionsArray={transactions.filter(el => el.date === choisedDate)}
        />
        <Summary monthStats={monthStats} />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default IncomeComponent;
