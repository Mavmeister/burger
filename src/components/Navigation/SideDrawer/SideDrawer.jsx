import React from 'react';

import Logo from '../../UI/Logo/Logo'
import NavItems from '../NavItems/NavItems'
import classes from './SideDrawer.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import HOC from '../../../HOC/wrapper'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <HOC>
            <Backdrop 
                show={props.open} 
                click={props.close}
            />
            <div className={attachedClasses.join(' ')}>
                    <Logo height="50px" />
                    <hr/>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </HOC>
    );
}

export default sideDrawer;