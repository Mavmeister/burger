import React from 'react';
import classes from './SingleControl.css'

const SingleControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            disabled={props.disabled} 
            onClick={props.removed}>Remove</button>
        <button 
            className={classes.More} 
            onClick={props.added}>More</button>
        <p>{props.price}</p>
    </div>
)

export default SingleControl