import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import s from './FormTransaction.module.css';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import Sprite from '../../assets/images/svg/sprite.svg';

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

const FormTransaction = ({ operation, options, date, setDate }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 767.9px)' });
  const handleChange = e => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleChangeAmount = e => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (category === null) {
      return toast.error(t('transactions.categoryInfo'), {
        autoClose: 2000,
        theme: 'colored',
      });
    }
    const initialForm = {
      description,
      amount: Number(amount),
      date: date.toISOString().slice(0, 10),
      category: category.value,
    };
    dispatch(operation(initialForm));
    if (isMobile) {
      navigate('transactions');
    }
  };

  const reset = () => {
    setDate(new Date());
    setDescription('');
    setCategory(null);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.timeDiv}>
        <svg className={s.calendarIcon} width="90" height="31">
          <use href={`${Sprite}#icon-calendar`}></use>
        </svg>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          className={s.date}
          selected={date}
          onChange={(date: Date) => setDate(date)}
        />
      </div>

      <label className={s.label}>
        <input
          className={s.input}
          type="text"
          name="description"
          placeholder={t('transactions.prodDescr')}
          required
          value={description}
          onChange={handleChange}
        />
      </label>
      <Select
        className={s.select}
        styles={isMobile ? colourStylesMob : colourStyles}
        placeholder={t('transactions.prodCateg')}
        value={category}
        onChange={setCategory}
        options={options}
      />
      <label>
        <input
          className={s.calcInput}
          type="number"
          name="number"
          min="0"
          pattern="^[1-9]\d*$"
          required
          placeholder="0,00"
          value={amount}
          onChange={handleChangeAmount}
        />
      </label>
      <div className={s.buttonList}>
        {' '}
        <button type="submit" className={s.buttonInput}>
          {t('transactions.input')}
        </button>{' '}
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
