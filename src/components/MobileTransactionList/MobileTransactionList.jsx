import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailUser } from 'redux/auth/AuthSelector';
import {
  getExpenseTransaction,
  getIncomeTransaction,
  removeTransaction,
} from 'redux/transaction/transaction-operations';
import {
  getExpensesTransactions,
  getIncomesTransactions,
} from 'redux/transaction/transaction-selector';
import s from './mobileTransactionList.module.css';

const MobileTransactionList = () => {
  const ExpensesTransactions = useSelector(getExpensesTransactions);
  const IncomesTransactions = useSelector(getIncomesTransactions);
  const minusExpensesAmount = ExpensesTransactions.map(el => {
    return { ...el, amount: Number(`-${el.amount}`) };
  });

  const allTransactions = [...IncomesTransactions, ...minusExpensesAmount];

  const dispatch = useDispatch();
  const email = useSelector(getEmailUser);

  useEffect(() => {
    if (email) {
      dispatch(getIncomeTransaction());
      dispatch(getExpenseTransaction());
    }
    // eslint-disable-next-line
  }, [allTransactions.length, email]);

  return (
    <ul className={s.listmob}>
      {allTransactions.map(item => {
        return (
          <li key={item._id} className={s.itemLi}>
            <div className={s.infoText}>
              <p className={s.title}>{item.description}</p>
              <div className={s.smallinfoText}>
                <p className={s.date}>
                  {item.date.split('-').reverse().join('.')}
                </p>
                <p className={s.category}>{item.category}</p>
              </div>
            </div>
            <p className={item.amount < 0 ? s.expensesText : s.incomesText}>
              {item.amount}
            </p>
            <button
              className={s.buttonDeletemob}
              onClick={() => dispatch(removeTransaction(item._id))}
            ></button>
          </li>
        );
      })}
    </ul>
  );
};
export default MobileTransactionList;
