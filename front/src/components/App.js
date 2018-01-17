import React, { Component } from 'react'

import Header         from './Header'
import MainContainer  from './MainContainer'
import Footer         from './Footer'

import { credits } from '../../package.json'
import { guns } from '../data/constants'
import { exists } from '../helpers/common'

import '../stylesheets/components/App.css'

class App extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  // Main rendering
  render() {
    return (
      [
        this.mainHeader(),
        this.mainContainer(),
        this.mainFooter(),
        this.creditsWrapper()
      ]
    )
  }

  // Render header
  mainHeader() {
    return <Header
      key="falcon-header"
    />
  }

  // Render main container
  mainContainer() {
    return <MainContainer
      key="falcon-container"
      user={this.state.user}
    />
  }

  // Render footer
  mainFooter() {
    return <Footer
      key="falcon-footer"
    />
  }

  // Render single credit
  renderCredit = ([key, data]) => {
    return <div className="flex-col" key={`credits-parts-${key}`}>
      <h3>{data[0].display}</h3>
      {data.filter(part => { return exists(part.author) }).map(part => {
        return <p key={`credit-${key}-${part.name}`}>
          <span>{part.name}: <a href={credits.links[part.author]} target="_blank">{part.author}</a></span>
        </p>
      })}
    </div>
  }

  // Render credits
  creditsWrapper() {
    return <div id="credits-wrapper" key="credits-wrapper">
      <h2>{"Here's the credit list for part builders. Thanks a lot to them !"}</h2>
      {Object.entries(guns).map(([gun, data]) => {
        return <div className="flex-col" key={`credit-${gun}`}>
          {Object.entries(data.parts).map(this.renderCredit)}
        </div>
      })}
    </div>
  }
}

export default App
