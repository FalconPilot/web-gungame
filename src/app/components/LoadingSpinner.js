import React, { Component } from 'react'

import 'stylesheets/components/loadingspinner.css'

class LoadingSpinner extends Component {

  /* Rendering function */
  render() {
    return (
      <div className="fixed-wrapper flex-col center-v center-h">
        <div className="loading-spinner"/>
      </div>
    );
  }
}

export default LoadingSpinner
