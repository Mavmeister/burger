import React from 'react';

import classes from './Modal.css';
import ReturnPropsChildren from '../../../HOC/wrapper'

import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <ReturnPropsChildren>
        <Backdrop show={props.show} click={props.modalClose} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </ReturnPropsChildren>
);

export default modal
