import PropTypes from 'prop-types';
import sprite from '../../assets/images/svg/sprite.svg';
import s from './CategoriesList.module.css';
import { useTranslation } from 'react-i18next';

const CategoriesList = ({ type, category, onCategoryChange, transactions }) => {
  const array = Object.entries(transactions);
  const { t } = useTranslation();
  const expenseReport = t('expenseReport', { returnObjects: true });
  const incomeReport = t('incomeReport', { returnObjects: true });

  return (
    <>
      {array.length === 0 && <p className={s.noInfo}>{t('categories.noInfo')}</p>}
      {array.length !== 0 && (
        <ul className={s.list}>
          {array.map((el, index) => (
            <li key={index} className={s.item}>
              <p className={s.total}>
                {el[1].total.toFixed(2).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
              </p>
              <svg
                aria-label={type === 'expenses' ? expenseReport[el[0]].title : [el[0]]}
                className={el[0] === category ? s.imageActive : s.image}
                width="56"
                height="56"
                onClick={e => onCategoryChange(el[0], transactions)}
              >
                <use
                  href={
                    type === 'expenses'
                      ? `${sprite}#${expenseReport[el[0]].id}`
                      : `${sprite}#icon-${el[0]}`
                  }
                ></use>
              </svg>
              <p className={s.title}>
                {type === 'expenses' ? expenseReport[el[0]].title : incomeReport[el[0]]}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

CategoriesList.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
};

export default CategoriesList;
