import PropTypes from 'prop-types';
import { useRef } from 'react';
import s from './Summary.module.css';
import { useTranslation } from 'react-i18next';

export const Summary = ({ monthStats }) => {
  const currentDate = useRef(new Date().getMonth());
  const array = Object.entries(monthStats);
  const filteredMonthsStats = array.filter(
    (el, index) => index <= currentDate.current
  );

  const filteredMonths = array.filter(
    (el, index) => index <= currentDate.current
  );
  const { t } = useTranslation();
  const month = t('months', { returnObjects: true });

  return (
    <div className={s.summary}>
      {filteredMonthsStats.length > 0 && (
        <ul className={s.list}>
          <li className={s.title}>{t('summary.summary')}</li>
          {filteredMonths.map(el => (
            <li key={el[0]} className={s.item}>
              <p>{month[el[0]]}</p>
              <p>
                {el[1] === 'N/A'
                  ? 0
                  : el[1]
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Summary.propTypes = {
  monthStats: PropTypes.object.isRequired,
};
