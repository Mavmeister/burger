import React from 'react';

import Logo from '../../UI/Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {

    return (
        <div className={classes.sideDrawer}>
                <Logo height="50px" />
                <hr/>
            <nav>
                <NavItems />
            </nav>
        </div>
    );
}

export default sideDrawer;