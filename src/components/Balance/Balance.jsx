import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { changeBalance } from 'redux/balance/balanceOperations';
import { BalanceModal } from 'components/BalanceModal/BalanceModal';
import { useTranslation } from 'react-i18next';
import { getEmailUser } from 'redux/auth/AuthSelector';
import {
  getExpensesTransactions,
  getIncomesTransactions,
} from 'redux/transaction/transaction-selector';
import s from './Balance.module.css';
import { getBalance } from 'redux/balance/balanceSelector';
import audio from '../../assets/sounds/coins-drop.mp3';

// import useWindowDimensions from '../../hooks/useWindowDimensions';

export const Balance = () => {
  const balance = useSelector(getBalance);
  const email = useSelector(getEmailUser);
  const expenses = useSelector(getExpensesTransactions);
  const incomes = useSelector(getIncomesTransactions);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [input, setInput] = useState(0);
  const isTab = useMediaQuery({ query: '(max-width: 1280px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' });

  const soundFX = new Audio(audio);

  const handleChange = e => {
    const { value } = e.target;

    setInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    soundFX.play();
    if (input !== '') return dispatch(changeBalance({ newBalance: input }));

    toast.error(t('balance.inputInfo'), {
      autoClose: 2000,
      theme: 'colored',
    });
  };

  return (
    <>
      <form className={s.balance} onSubmit={handleSubmit}>
        <h3
          className={
            isMobile && location.pathname === '/reports'
              ? s.titleMobile
              : s.title
          }
        >
          {t('balance.balanceTitle')}:
        </h3>
        <div className={s.info}>
          <label
            className={
              isMobile && location.pathname === '/reports'
                ? s.labelMobile
                : s.label
            }
          >
            <input
              type="text"
              className={
                isMobile && location.pathname === '/reports'
                  ? s.inputMobile
                  : s.input
              }
              value={
                balance !== 0
                  ? balance
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
                  : (expenses.length === 0) & (incomes.length === 0)
                  ? input
                  : 0
              }
              decimalscale={1}
              maxLength={9}
              onChange={handleChange}
              disabled={
                balance === 0 &&
                (expenses.length === 0) & (incomes.length === 0)
                  ? false
                  : true
              }
            />
            <span
              className={
                isMobile && location.pathname === '/reports'
                  ? s.moneyMobile
                  : s.money
              }
            >
              {t('balance.currency')}
            </span>
            {input === 0 &&
            balance === 0 &&
            email &&
            (expenses.length === 0) & (incomes.length === 0) ? (
              <BalanceModal />
            ) : (
              !(<BalanceModal />)
            )}
          </label>

          {
            <button
              className={
                isTab && location.pathname === '/reports'
                  ? s.buttonNone
                  : balance === 0 &&
                    (expenses.length === 0) & (incomes.length === 0)
                  ? s.buttonActive
                  : s.button
              }
              type="submit"
              disabled={
                balance === 0 &&
                (expenses.length === 0) & (incomes.length === 0)
                  ? false
                  : true
              }
            >
              {t('balance.confirm')}
            </button>
          }
        </div>
      </form>
    </>
  );
};
