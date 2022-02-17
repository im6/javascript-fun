import { FC } from 'react';
import style from './style.less';

interface SidebarProps {
  defaultType: string;
}

const color = '#adf7ff'; // typed.js skeleton

const Sidebar: FC<SidebarProps> = ({ defaultType }) => (
  <header className={style.header}>
    <h1>JavaScript</h1>
    <h1>for</h1>
    <div className={style.type} style={{ color }}>
      {defaultType}
    </div>
  </header>
);

export default Sidebar;
