import React from 'react';
import ReturnsPropsChildren from '../../HOC/wrapper';
import classes from './Layout.css'

const Layout = (props) => (
    // what should the app look like
    <ReturnsPropsChildren>
      <div className={classes.header}>
        toolbar
        header
        form
        backdrop
      </div> 
  
      <main className={classes.content}>
          {props.children}
      </main>
    </ReturnsPropsChildren>
    
)

export default Layout