import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAuthError } from 'redux/auth/AuthSelector';

const errorStatus = {
  400: 'Request failed with status code 400',
  409: 'Request failed with status code 409',
  403: 'Request failed with status code 403',
};

const startErrorToast = errorMessage => {
  toast.error(errorMessage, {
    autoClose: 2000,
    theme: 'colored',
  });
};

export const useAuthErrorToast = () => {
  const { t } = useTranslation();

  const error = useSelector(getAuthError);

  useEffect(() => {
    if (error) {
      switch (error) {
        case errorStatus['400']:
          startErrorToast(t('registration.registrationErr1'));
          break;
        case errorStatus['403']:
          startErrorToast(t('registration.registrationErr3'));
          break;
        case errorStatus['409']:
          startErrorToast(t('registration.registrationErr2'));
          break;
        default:
          break;
      }
    }
  }, [error, t]);
};
