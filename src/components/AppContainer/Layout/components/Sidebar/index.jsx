import PropTypes from 'prop-types';
import style from './style.less';

const color = '#adf7ff'; // typed.js skeleton

const Sidebar = ({ defaultType }) => (
  <header className={style.header}>
    <h1>JavaScript</h1>
    <h1>for</h1>
    <div className={style.type} style={{ color }}>
      {defaultType}
    </div>
  </header>
);

Sidebar.propTypes = {
  defaultType: PropTypes.string,
};

export default Sidebar;
