import React from 'react';

import menuBurger from '../../../../assets/images/menu-burger.png';
import classes from './Menu.module.css';

const menu = (props) => (
  <div className={classes.Menu}>
    <img src={menuBurger} alt="Burger to show menu" onClick={props.clicked} />
  </div>
);

export default menu;
