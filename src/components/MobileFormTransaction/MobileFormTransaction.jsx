import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormTransaction from 'components/FormTransaction/FormTransaction';
import optionsExpense from '../../data/expensesForm.json';
import {
  addExpenseTransaction,
  addIncomeTransaction,
} from '../../redux/transaction/transaction-operations';
import optionsIncome from '../../data/incomeForm.json';
import s from './MobileFormTransaction.module.css';

const MobileFormTransaction = () => {
  const [, setDate] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <button
        className={s.btnPrevPagemob}
        onClick={e => navigate('transaction')}
      ></button>
      {location.pathname === '/transactions/expenses' && (
        <FormTransaction
          operation={addExpenseTransaction}
          options={optionsExpense}
          // date={date}
          setDate={setDate}
        />
      )}

      {location.pathname === '/transactions/income' && (
        <FormTransaction
          operation={addIncomeTransaction}
          options={optionsIncome}
          // date={date}
          setDate={setDate}
        />
      )}
    </>
  );
};
export default MobileFormTransaction;
