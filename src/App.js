import React, { Component } from 'react';
import Layout from './components/Layout/Layout'

import MeatBuilder from './containers/MeatBuilder/MeatBuilder'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MeatBuilder />    
        </Layout>
      </div>
    );
  }
}

export default App;
