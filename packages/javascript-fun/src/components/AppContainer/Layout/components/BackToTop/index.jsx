import PropTypes from 'prop-types';
import style from './style.less';

const BackToTop = ({ iconCdnUrl }) => (
  <div className={style.scrollBtn}>
    <img src={`${iconCdnUrl}/fa-chevron-up.svg`} alt="back to top" />
  </div>
);

BackToTop.propTypes = {
  iconCdnUrl: PropTypes.string.isRequired,
};

export default BackToTop;
