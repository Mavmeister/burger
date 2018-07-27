import React from 'react';

import Logo from '../../UI/Logo/Logo'
import classes from './Toolbar.css'

import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggle}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
)

export default Toolbar;