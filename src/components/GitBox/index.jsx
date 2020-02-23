import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const GitBox = ({ name, url, img, star }) => (
  <div className="pure-u-xl-1-5 pure-u-lg-1-4 pure-u-md-1-3 pure-u-sm-1-2 pure-u-1-2">
    <div className={style.box}>
      <div className={style.left}>
        <img src={img} />
      </div>
      <div className={style.right}>
        <h5>{name}</h5>
        <div>
          <a href={url} target="_blank">
            &#9733; {star}
          </a>
        </div>
      </div>
    </div>
  </div>
);

GitBox.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  star: PropTypes.string.isRequired,
};

export default GitBox;
