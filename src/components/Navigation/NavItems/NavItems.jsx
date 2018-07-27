import React from 'react';

import classes from './NavItems.css'

const NavItem = (props) => {
    return <a 
        href={props.link} 
        className={props.active ? classes.active : null}>
        {props.children}
    </a>
}

const NavItems = (props) => (
    <ul className={classes.NavItems}>
        <li className={classes.NavItem}>
            <NavItem link="/" active>Builder</NavItem>
            <NavItem>Checkout</NavItem>
            <NavItem>Dashboard</NavItem>
            <NavItem>Login/Logout</NavItem>
        </li>
    </ul>
);

export default NavItems