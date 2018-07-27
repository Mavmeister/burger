import React, {Component} from 'react';
import ReturnsPropsChildren from '../../HOC/wrapper';
import classes from './Layout.css'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return (
      <ReturnsPropsChildren>
        <div className={classes.header}>
          <Toolbar toggle={this.sideDrawerToggleHandler} />
          <SideDrawer 
            open={this.state.showSideDrawer} 
            close={this.sideDrawerClosedHandler}
          />
        </div> 
    
        <main className={classes.content}>
            {this.props.children}
        </main>
      </ReturnsPropsChildren>
    )
  }
  // what should the app look like
}
    


export default Layout