import FormTransaction from 'components/FormTransaction/FormTransaction';
import optionsExpense from '../../data/expensesForm.json';
import optionsIncome from '../../data/incomeForm.json';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addExpenseTransaction,
  addIncomeTransaction,
} from '../../redux/transaction/transaction-operations';
import s from './MobileFormTransaction.module.css';
import { useState } from 'react';
const MobileFormTransaction = () => {
  const [date, setDate] = useState(new Date());
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
          date={date}
          setDate={setDate}
        />
      )}

      {location.pathname === '/transactions/income' && (
        <FormTransaction
          operation={addIncomeTransaction}
          options={optionsIncome}
          date={date}
          setDate={setDate}
        />
      )}
    </>
  );
};
export default MobileFormTransaction;
