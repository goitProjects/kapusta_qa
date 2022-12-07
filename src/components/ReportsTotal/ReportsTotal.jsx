import PropTypes from 'prop-types';
import s from './ReportsTotal.module.css';
import { useTranslation } from 'react-i18next';

const ReportsTotal = ({ userExpenses, userIncome }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={s.block}>
        <ul className={s.list}>
          <li className={s.item}>
            <p className={s.expenses}>{t('reports.expenses')}</p>
            <div className={s.totale}>
              <p className={s.expensesTotal}>
                -{' '}
                {userExpenses.expenseTotal
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
                &nbsp; {t('general.currencyName')}
              </p>
            </div>
          </li>
          <li>
            <div className={s.div}></div>
          </li>
          <li className={s.item}>
            <p className={s.income}>{t('reports.income')}</p>
            <div className={s.totali}>
              <p className={s.incomeTotal}>
                +{' '}
                {userIncome.incomeTotal
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
                &nbsp; {t('general.currencyName')}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

ReportsTotal.propTypes = {
  userExpenses: PropTypes.object.isRequired,
  userIncome: PropTypes.object.isRequired,
};

export default ReportsTotal;
