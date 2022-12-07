import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <ThreeDots
        color="#ff751d"
        height={150}
        width={150}
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
