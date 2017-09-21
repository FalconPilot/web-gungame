import React, { Component } from 'react'

import LoadingSpinner from './LoadingSpinner'

class App extends Component {

  /* Class constructor */
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  /* Rendering function */
  render() {
    return (this.state.loading
      ? <LoadingSpinner/>
      : <div/>
    )
  }
}

export default App
