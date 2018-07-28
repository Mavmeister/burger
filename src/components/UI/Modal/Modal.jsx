import React, {Component} from 'react';

import classes from './Modal.css';
import ReturnPropsChildren from '../../../HOC/wrapper'

import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

    // ensuring Modal does not re-render unnecessarily

    // only update if this.props.show changes
    // but we are not checking if click listeners changes
    // or if we changed state in modal, we'd need to check for 
    // other props changing
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
         || nextProps.children !== this.props.children
    }

    componentWillUpdate(){
    }

    render(){
        return(
            <ReturnPropsChildren>

                <Backdrop show={this.props.show} click={this.props.modalClose} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </ReturnPropsChildren>
        );
    }
}
export default modal
