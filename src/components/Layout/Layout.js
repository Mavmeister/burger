import React from 'react';
import ReturnsPropsChildren from '../../HOC/wrapper';
import classes from './Layout.css'

import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => (
    // what should the app look like
    <ReturnsPropsChildren>
      <div className={classes.header}>
        <Toolbar />
        <SideDrawer />
      </div> 
  
      <main className={classes.content}>
          {props.children}
      </main>
    </ReturnsPropsChildren>
    
)

export default Layout