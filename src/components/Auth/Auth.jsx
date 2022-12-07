import { useRef, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader/Loader';
import { registerUser, loginUser, getCurUser } from 'redux/auth/authOperations';
import { getAuthLoading, isLogedIn } from 'redux/auth/AuthSelector';
import { googleAuth } from 'redux/auth/authSlise';
import { useAuthErrorToast } from 'hooks/useToastError';
import { initialValues, validationSchema } from './utils';
import Sprite from 'assets/images/svg/sprite.svg';
import s from './Auth.module.css';

// const ErrorWrapper = ({ touched, error, className }) => {
//   const { t } = useTranslation();
//   return touched && error ? <p className={className}>{t(error)}</p> : null;
// };

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isLoading = useSelector(getAuthLoading);
  const token = useSelector(isLogedIn);

  useAuthErrorToast();

  const submitTypeRef = useRef(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      setTimeout(() => {
        submitTypeRef.current === 'register' && dispatch(registerUser(values));
        submitTypeRef.current === 'login' && dispatch(loginUser(values));
      }, 0);
    },
  });

  const handleSubmit = e => {
    formik.handleSubmit(e);
    submitTypeRef.current = e.nativeEvent.submitter.dataset.action;
  };

  useEffect(() => {
    if (pathname === '/') {
      const accessToken = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const sid = searchParams.get('sid');
      if (token) {
        dispatch(googleAuth({ accessToken, refreshToken, sid }));
        dispatch(getCurUser());
      }
      token ? navigate('expenses') : navigate('/');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <p className={s.itemForGoogle}>{t('registration.googleTitle')}</p>
        <a
          className={s.link}
          href="https://kapusta-backend.goit.global/auth/google"
          target="_blank"
          rel="noreferrer"
        >
          <svg className={s.icon} width={18} height={18}>
            <use href={`${Sprite}#icon-google`} />
          </svg>
          <span className={s.google}>Google</span>
        </a>
        <p className={s.item}>{t('registration.mainTitle')}</p>
        <div className={s.wrapper}>
          <label className={s.text} htmlFor="email">
            {formik.touched.email && formik.errors.email && (
              <span className={s.span}>*</span>
            )}
            {t('registration.email')}
          </label>
          <input
            className={s.input}
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={s.error}>{t(formik.errors.email)}</p>
          )}
        </div>
        <div className={s.wrapperPassword}>
          <label className={s.text} htmlFor="password">
            {formik.touched.password && formik.errors.password && (
              <span className={s.span}>*</span>
            )}
            {t('registration.password')}
          </label>
          <input
            className={s.input}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className={s.error}>{t(formik.errors.password)}</p>
          )}
        </div>
        <>
          <div className={s.wrapperButtons}>
            <button
              className={s.buttonSubmit}
              type="submit"
              data-action="register"
            >
              {t('registration.registration')}
            </button>
            <button className={s.button} type="submit" data-action="login">
              {t('registration.enter')}
            </button>
          </div>
        </>
      </form>
      {isLoading && <Loader />}
    </>
  );
};
