import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Sidebar = ({ words }) => (
  <header className={style.header}>
    <h1 id="sbttl1">JavaScript</h1>
    <h1 id="sbttl2">for</h1>
    <div className="type"></div>
    <nav id="typed-strings">
      {words.map(v => (
        <p key={v}>{v}</p>
      ))}
    </nav>
  </header>
);

Sidebar.propTypes = {
  words: PropTypes.array,
};

export default Sidebar;
