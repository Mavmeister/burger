import React from 'react';

import Logo from '../../UI/Logo/Logo'
import classes from './Toolbar.css'

import NavItems from '../NavItems/NavItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu (open side)</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
)

export default Toolbar;