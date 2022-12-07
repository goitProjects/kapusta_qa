import { Link } from 'react-router-dom';
import UserLogOut from 'components/UserLogOut/UserLogOut';
import styles from './Header.module.css';
import { getIsAuth } from 'redux/auth/AuthSelector';
import { useSelector } from 'react-redux';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Sprite from '../../assets/images/svg/sprite.svg';

const Header = () => {
  const isLoggedIn = useSelector(getIsAuth);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link to="/" alt="homepage">
            <svg className={styles.logo} alt="logo" width="90" height="31">
              <use href={`${Sprite}#icon-logo`}></use>
            </svg>
          </Link>
          <ThemeSwitcher />
          <LanguageSwitcher />
          {isLoggedIn && <UserLogOut />}
        </div>
      </header>
    </>
  );
};
export default Header;
