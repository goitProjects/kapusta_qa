import s from './BalanceModal.module.css';

export const BalanceModal = () => {
  return (
    <div className={s.modalWindow}>
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
  );
};
