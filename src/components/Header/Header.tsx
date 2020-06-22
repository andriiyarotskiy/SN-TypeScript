import React from 'react';
import s from './Header.module.css'



const Header = () => {
  return (
      <header className={s.header}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/768px-DC_Comics_logo.png" alt="avatar"/>
      </header>
  );
}

export default Header;
