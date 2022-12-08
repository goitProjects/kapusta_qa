import { useState } from 'react';
import DatePicker from 'react-datepicker';
import s from './datePickerComp.module.css';
import Sprite from '../../assets/images/svg/sprite.svg';

const DatePickerComp = () => {
  const [date, setDate] = useState(new Date());
  return (
    <label className={s.timeDiv}>
      <svg className={s.calendarIcon} width="90" height="31">
        <use href={`${Sprite}#icon-calendar`}></use>
      </svg>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        className={s.date}
        selected={date}
        onChange={date => setDate(date)}
        calendarStartDay={1}
      />
    </label>
  );
};

export default DatePickerComp;
