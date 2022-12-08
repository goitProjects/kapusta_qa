import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getBalance } from 'redux/balance/balanceSelector';
import s from './BalanceModal.module.css';

export const BalanceModal = () => {
  const balance = useSelector(getBalance);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isBalance = Boolean(balance);

  useEffect(() => {
    const handleCloseModal = () => isBalance && setIsModalOpen(false);
    window.addEventListener('click', handleCloseModal);

    return () => window.removeEventListener('click', handleCloseModal);
  }, [isBalance]);

  return isModalOpen ? (
    <div
      className={s.modalWindow}
      onClick={e => e.target === e.currentTarget && setIsModalOpen(false)}
    >
      <div className={s.modal}>
        <p className={s.text}>
          Hello! To get started, enter the current balance of your account!
        </p>
        <p className={s.secondText}>
          You can't spend money until you have it :)
        </p>
      </div>
      <div className={s.part}></div>
    </div>
  ) : null;
};
