import PropTypes from 'prop-types';
import s from './Paginator.module.css';

const Paginator = ({ clickPrev, clickNext, descr, disableNext = false }) => {
  return (
    <div className={s.pagination}>
      <button aria-label="Previous" className={s.prevBtn} onClick={clickPrev}></button>
      <p className={s.titleType}>{descr}</p>
      <button
        aria-label="Next"
        className={s.nextBtn}
        disabled={disableNext}
        onClick={clickNext}
      ></button>
    </div>
  );
};

Paginator.propTypes = {
  clickNext: PropTypes.func.isRequired,
  clickPrev: PropTypes.func.isRequired,
  descr: PropTypes.string.isRequired,
  disableNext: PropTypes.bool,
};

export default Paginator;
