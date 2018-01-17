import React, { Component } from 'react'

import { version } from '../../package.json'

class Header extends Component {

  // Main render
  render() {
    return <header id="falcon-header">
      <p className="fp-version">{`Front-end client : ${version}`}</p>
    </header>
  }
}

export default Header
