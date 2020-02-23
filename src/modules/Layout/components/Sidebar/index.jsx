import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

const Sidebar = ({ words }) => (
  <header className={style.header}>
    <h1>JavaScript</h1>
    <h1>for</h1>
    <div className={style.type} />
    <div className={style.typedStrings}>
      {words.map(v => (
        <p key={v}>{v}</p>
      ))}
    </div>
  </header>
);

Sidebar.propTypes = {
  words: PropTypes.array,
};

export default Sidebar;
