import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import s from './ErrorMessage.module.css';

const ErrorMessage = ({ touched, errors, name, className = null }) => {
  const { t } = useTranslation();

  return (
    touched &&
    touched[name] &&
    errors &&
    errors[name] && (
      <p className={clsx(className, s.errorMessage)}>{t(errors[name])}</p>
    )
  );
};

export default ErrorMessage;
