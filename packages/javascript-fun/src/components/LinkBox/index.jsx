import PropTypes from 'prop-types';
import style from './style.less';

const LinkBox = ({ url, name, desc }) => (
  <div
    className={`pure-u-xl-1-4 pure-u-lg-1-3 pure-u-md-1-2 pure-u-sm-1-2 pure-u-1-2 ${style.box}`}
  >
    <h3>
      <a href={url}>{name}</a>
    </h3>
    <p>{desc}&nbsp;</p>
  </div>
);

LinkBox.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

export default LinkBox;
