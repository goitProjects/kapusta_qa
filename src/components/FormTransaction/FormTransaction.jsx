import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { clsx } from 'clsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { validationSchema, initialValues } from './utils';
import Sprite from '../../assets/images/svg/sprite.svg';
import s from './FormTransaction.module.css';

const colourStyles = {
  control: styles => ({
    ...styles,
    border: ' 2px solid var(--border-light)',
    width: '169px',
    borderRadius: '0px',
    color: '#C7CCDC',
    backgroundColor: 'var(--input-bg-color)',
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'var(--input-bg-color)',
    border: ' 2px solid var(--border-light)',
    borderRadius: '4px',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#C7CCDC',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#C7CCDC',
  }),
};

const colourStylesMob = {
  control: styles => ({
    ...styles,
    border: ' none',
    width: '280px',
    borderRadius: '0px',
    color: '#C7CCDC',
    backgroundColor: 'transparent',
  }),
  menuList: styles => ({
    ...styles,
    backgroundColor: 'var(--input-bg-color)',
    border: ' 2px solid var(--border-light)',
    borderRadius: '4px',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#C7CCDC',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#C7CCDC',
  }),
};

const FormTransaction = ({ operation, options, setDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' });
  const isIncome = pathname.includes('income');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setValues }) => {
      const { date, amount, category, description } = values;
      const complitedTransaction = {
        description,
        date: moment(date).format('YYYY-MM-DD'),
        category: category?.value,
        amount: Number(amount),
      };
      dispatch(operation(complitedTransaction));
      // кинуть в useEffect на зміну транзакцій
      if (isMobile) {
        navigate('transactions');
      }
      setValues(initialValues);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  const reset = () => {
    setValues(initialValues);
  };

  const handleAmountChange = e => {
    const { value } = e.target;
    if (value === '' || value.match(/^[1-9]\d*$/)) {
      setFieldValue('amount', value);
    }
  };

  useEffect(() => {
    setDate(values.date);
  }, [values.date, setDate]);

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={clsx(s.timeDiv, s.position)}>
        <svg className={s.calendarIcon} width="90" height="31">
          <use href={`${Sprite}#icon-calendar`}></use>
        </svg>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          className={s.date}
          selected={values.date}
          onChange={date => setFieldValue('date', date)}
        />
      </label>

      <label className={clsx(s.label, s.position)}>
        <input
          className={s.input}
          type="text"
          name="description"
          placeholder={t('transactions.prodDescr')}
          value={values.description}
          onChange={handleChange}
        />
        {!isIncome && (
          <ErrorMessage
            touched={touched}
            errors={errors}
            name="description"
            className={s.errorMessage}
          />
        )}
      </label>

      <div className={clsx(s.position, s.flex)}>
        <Select
          className={s.select}
          styles={isMobile ? colourStylesMob : colourStyles}
          placeholder={t('transactions.prodCateg')}
          value={values.category}
          options={options}
          onChange={option => setFieldValue('category', option)}
        />
        <ErrorMessage
          touched={touched}
          errors={errors}
          name="category"
          className={s.errorMessage}
        />
      </div>

      <label className={clsx(s.position)}>
        <input
          className={s.calcInput}
          type="text"
          name="amount"
          min="0"
          placeholder="0,00"
          value={values.amount}
          onChange={handleAmountChange}
        />
        <ErrorMessage
          touched={touched}
          errors={errors}
          name="amount"
          className={s.errorMessageAmount}
        />
      </label>

      <div className={s.buttonList}>
        <button type="submit" className={s.buttonInput}>
          {t('transactions.input')}
        </button>
        <button type="button" className={s.buttonClear} onClick={reset}>
          {t('transactions.clear')}
        </button>
      </div>
    </form>
  );
};

FormTransaction.propTypes = {
  operation: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default FormTransaction;
