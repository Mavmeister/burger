import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css'

class SingleIngredient extends Component {
    render() {

        let ingredient = null;
        
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}> </div>
                break;
                
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                      <div className={classes.Seeds2}></div>
                      <div className={classes.BreadTop}></div>
                      <div className={classes.Seeds1}></div>                
                      <div className={classes.BreadTop}></div>
                    </div>
                )
                break;
    
            case ('meat'):
                ingredient = <div className={classes.Meat}> </div>
                break;

            case ('bacon'):
                ingredient = <div className={classes.Bacon}> </div>
                break;
    
            case ('cheese'):
                ingredient = <div className={classes.Cheese}> </div>
                break;
    
            case ('salad'):
                ingredient = <div className={classes.Salad}> </div>
                break;            
            case ('slush'):
                ingredient = <div className={classes.Slush}> </div>
                break;     
            default:
                ingredient = null;                  
        }
    
        return ingredient;

    }

};

    
SingleIngredient.proptypes = {
    type: PropTypes.string.isRequired
};

export default SingleIngredient