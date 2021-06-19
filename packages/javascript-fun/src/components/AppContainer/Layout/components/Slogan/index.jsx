import PropTypes from 'prop-types';
import style from './style.less';

const Slogan = ({ text }) => {
  if (!text) return null;
  return <h1 className={style.colorText}>{text}</h1>;
};

Slogan.propTypes = {
  text: PropTypes.string,
};

export default Slogan;
