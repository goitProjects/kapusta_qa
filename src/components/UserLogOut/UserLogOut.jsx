import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import Avatar from 'react-avatar';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Modal from '../Modal/Modal';
import { logoutUser } from 'redux/auth/authOperations';
import styles from './UserLogOut.module.css';

import { useTranslation } from 'react-i18next';

const UserLogOut = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.auth.user.email);
  const { t } = useTranslation();

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const logoutModal = () => {
    dispatch(logoutUser());
    toggleModal();
  };

  const [setModalOpen, setShowModal] = useState(false);

  const viewPort = useWindowDimensions();

  return (
    <div className={styles.wrapper}>
      <Avatar
        name={name}
        size="32"
        color={Avatar.getRandomColor('sitebase', [
          'red',
          'green',
          'blue',
          'orange',
          'violete',
          'rose',
          'yellow',
        ])}
        className={styles.userIcon}
      />
      {viewPort.width >= 768 && (
        <>
          <p className={styles.userName}>{name}</p>
          <button type="button" onClick={toggleModal} className={styles.logOutBtn}>
            <p className={styles.logOutTextBtn}>{t('logout.exit')}</p>
          </button>
        </>
      )}
      {viewPort.width < 768 && (
        <>
          <div className={styles.logOutIcon}>
            <RiLogoutBoxRLine onClick={toggleModal} color={'#CBCCD0'} size={'16px'} />
          </div>
        </>
      )}
      {setModalOpen && (
        <Modal
          text={'Are you sure?'}
          handleClickLeft={logoutModal}
          handleClickRight={toggleModal}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default UserLogOut;
