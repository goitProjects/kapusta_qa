import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import s from './HomeNavigation.module.css';
import { useSelector } from 'react-redux';
import {
  getExpensesTransactions,
  getIncomesTransactions,
} from 'redux/transaction/transaction-selector';
import { getBalance } from 'redux/balance/balanceSelector';

function HomeNavigation() {
  const { t } = useTranslation();
  const balance = useSelector(getBalance);
  const expenses = useSelector(getExpensesTransactions);
  const incomes = useSelector(getIncomesTransactions);
  const location = useLocation();
  return (
    <div className={s.container}>
      <Link
        to="expenses"
        disabled={
          balance === 0 && (expenses.length === 0) & (incomes.length === 0)
            ? false
            : true
        }
        className={
          location.pathname === '/transactions/expenses' ? s.activeLink : s.link
        }
      >
        {t('nav.expenses')}
      </Link>
      <Link
        to="income"
        disabled={
          balance === 0 && (expenses.length === 0) & (incomes.length === 0)
            ? false
            : true
        }
        className={
          location.pathname === '/transactions/income' ? s.activeLink : s.link
        }
      >
        {t('nav.income')}
      </Link>
    </div>
  );
}

export default HomeNavigation;
