import React, { Component } from 'react'

import CustomizerViewport from './viewports/CustomizerViewport'

class MainContainer extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      viewport: 'customizer'
    }
  }

  // Main render
  render() {
    return <main role="main" id="falcon-container">
      {this.viewports[this.state.viewport]}
    </main>
  }

  // Viewports list
  viewports = {
    customizer: <CustomizerViewport/>
  }
}

export default MainContainer
