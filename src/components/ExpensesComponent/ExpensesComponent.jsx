import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExpenseTransaction,
  getExpenseTransaction,
} from '../../redux/transaction/transaction-operations';
import {
  getExpensesTransactions,
  isLoading,
} from 'redux/transaction/transaction-selector';
import { expensesStats } from 'redux/monthsStats/monthsStats-selector';
import Loader from 'components/Loader/Loader';
import { Summary } from 'components/Summary/Summary';
import FormTransaction from 'components/FormTransaction/FormTransaction';
import TransactionList from 'components/TransactionList/TransactionList';
import s from './ExpensesComponent.module.css';
import { getEmailUser } from 'redux/auth/AuthSelector';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useMemo } from 'react';

const ExpensesComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loading = useSelector(isLoading);
  const email = useSelector(getEmailUser);
  const monthStats = useSelector(expensesStats);
  const transactions = useSelector(getExpensesTransactions);

  const [date, setDate] = useState(() => new Date());

  const expensesCategArray = t('expensesCategArray', { returnObjects: true });

  const choisedDate = useMemo(() => moment(date).format('YYYY-MM-DD'), [date]);

  useEffect(() => {
    if (email && transactions.length === 0) dispatch(getExpenseTransaction());
  }, [dispatch, transactions.length, email]);

  return (
    <>
      <FormTransaction
        operation={addExpenseTransaction}
        options={expensesCategArray}
        // date={date}
        setDate={setDate}
      />
      <div className={s.transactions}>
        <TransactionList
          location="expenses"
          transactionsArray={transactions.filter(el => el.date === choisedDate)}
        />
        <Summary monthStats={monthStats} />
      </div>
      {loading && <Loader />}
    </>
  );
};

export default ExpensesComponent;
