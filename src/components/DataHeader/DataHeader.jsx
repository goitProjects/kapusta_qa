import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Balance } from 'components/Balance/Balance';

import Sprite from '../../assets/images/svg/sprite.svg';
import s from './DataHeader.module.css';
// import { useSelector } from 'react-redux';
// import { getBalance } from 'redux/balance/balanceSelector';
// import {
//   getExpensesTransactions,
//   getIncomesTransactions,
// } from 'redux/transaction/transaction-selector';

export const DataHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <Balance />
      <Link className={s.reportsLinkWrapper} to="/reports">
        <span className={s.reports}>{t('general.reports')}</span>
        <svg className={s.iconReports} width="24" height="24">
          <use href={`${Sprite}#icon-reports`}></use>
        </svg>
      </Link>
    </div>
  );
};
