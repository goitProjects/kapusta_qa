import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { removeTransaction } from 'redux/transaction/transaction-operations';
import s from './TransactionList.module.css';
import { getEmailUser } from 'redux/auth/AuthSelector';

const TransactionList = ({ transactionsArray, location }) => {
  const email = useSelector(getEmailUser);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const expenseReport = t('expenseReport', { returnObjects: true });
  const incomeReport = t('incomeReport', { returnObjects: true });

  const createNewArray = array => {
    const addArray = Array(7 - array.length)
      .fill({
        _id: '',
        description: '',
        amount: null,
        date: '',
        category: '',
      })
      .map(el => ({ ...el, _id: nanoid() }));
    return [...array, ...addArray];
  };

  const arrayTable =
    transactionsArray.length < 7
      ? createNewArray(transactionsArray)
      : transactionsArray;

  return (
    <>
      {email && (
        <table className={s.table}>
          <thead>
            <tr>
              <th>{t('transactions.date')}</th>
              <th>{t('transactions.descr')}</th>
              <th>{t('transactions.categ')}</th>
              <th>{t('transactions.sum')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={s.tableBody}>
            {arrayTable.map(item => (
              <tr key={item._id}>
                <td>{item.date && item.date.split('-').reverse().join('.')}</td>
                <td>{item.description && item.description}</td>
                <td>
                  {item.category && location === 'expenses'
                    ? expenseReport[item.category].title
                    : incomeReport[item.category]}
                </td>
                <td
                  style={
                    location === 'expenses'
                      ? { color: 'red', fontWeight: 'bold' }
                      : { color: 'green', fontWeight: 'bold' }
                  }
                >
                  {location === 'expenses' && item.amount && '-'}
                  &nbsp;
                  {item.amount &&
                    `${item.amount
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} ${t(
                      'general.currencyName'
                    )}`}
                </td>
                <td>
                  {item.amount && (
                    <button
                      className={s.buttonDelete}
                      onClick={() => dispatch(removeTransaction(item._id))}
                    ></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

TransactionList.propTypes = {
  transactionsArray: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};

export default TransactionList;
