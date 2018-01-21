import React, { Component } from 'react'

import { stats, ammo } from '../../data/constants'
import { guns } from '../../data/constants'

import { exists } from '../../helpers/common'

import '../../stylesheets/components/gun_customizer/CustomizerMenu.css'

class CustomizerMenu extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      currentGun: props.gun,
      selectedPart: null,
      openMenu: false
    }
  }

  // Receive props
  componentWillReceiveProps(newProps) {
    if (newProps.gun !== this.state.currentGun) {
      this.setState({
        currentGun: newProps.gun,
        selectedPart: null,
        openMenu: false
      })
    }
  }

  // Switch selected part
  switchPart = (event) => {
    const prev = this.state.openMenu
    const value = event.currentTarget.value === this.state.selectedPart
      ? null
      : event.currentTarget.value

    const open = exists(value) ? true : false

    this.setState({ openMenu: open }, () => {
      const timeout = prev === false || prev === open ? 0 : 220
      window.setTimeout(() => {
        this.setState({ selectedPart: value })
      }, timeout)
    })
  }

  // Update selected part
  changePart = (event) => {
    this.props.patchPart(event.currentTarget.name, event.currentTarget.value)
  }

  // Render stats
  renderStats = ([stat, data]) => {

    const caliber = this.props.gunStruct.caliber

    // Calculate stat total
    const value = Object.values(this.props.gunStruct.parts)
      .concat([{ stats: ammo[caliber] }])
      .reduce((total, part) => {

        // Calculate added value
        const value = exists(part.stats) && exists(part.stats[stat])
          ? part.stats[stat]
          : 0

        // Return new total
        return total + value
      }, 0)

    // Return stat container
    return <div className="stat-wrapper" key={`val-${stat}`}>
      <p>{`${data.display} : ${value}`}</p>
    </div>
  }

  // Render buttons
  renderButtons = (part, excluded) => {
    const opacity = exists(part.image) ? "1.0" : "0.0"
    return excluded.includes(part.key)
      ? null
      : <button
          key={`open-${part.key}`}
          value={part.key}
          onClick={this.switchPart}
          className="flex-row center-v center-h"
        >
          {exists(part.gui)
            ? <div className="button-icon flex-row flex-middle">
                <img src={part.gui} alt={part.key} style={{opacity: opacity}}/>
              </div>
            : null
          }
          {part.display}
        </button>
  }

  // Render part choices
  renderChoices = (part, idx, params) => {
    const index = guns[this.props.gun].parts[this.state.selectedPart].indexOf(part)
    const sidx = guns[this.props.gun].parts[this.state.selectedPart].indexOf(
      this.props.gunStruct.parts[part.key]
    )

    // If any of these conditions is true, make the button disabled
    const anyTrue =
       (part.fsight !== true && params.fsight === true && params.require_front === true)
    || (part.fsight === false && params.force_front === true)
    || (part.fsight === true && params.allow_front !== true)

    // Compose classes
    const classes = index === sidx
      ? "part-choice flex-row center-v selected"
      : "part-choice flex-row center-v"

    // Return wrapper
    return <button
      key={`part-${part.key}-${idx}`}
      name={part.key}
      value={index}
      className={classes}
      onClick={this.changePart}
      disabled={anyTrue}
    >
      <div className="button-icon flex-col flex-middle">
        <img src={part.image} alt={part.key}/>
      </div>
      <div className="flex-col">
        <h3>{part.name}</h3>
        {exists(part.stats)
          ? Object.entries(part.stats).map(([stat, value]) => {
              const rvalue = value > 0 ? `+${value}` : value
              return <div key={`stat-${part.key}-${stat}`} className="flex-row">
                <p>{`${stats[stat].display} :`}</p>
                <p>{rvalue}</p>
              </div>
            })
          : null
        }
        <div className="choices-footer">
          {part.force_front === true
            ? <div>{"Requires a front sight"}</div>
            : null
          }
          {part.allow_front === false
            ? <div>{"Doesn't accept front sights"}</div>
            : null
          }
          {part.fsight === true
            ? <div>{"Works as a front sight"}</div>
            : null
          }
        </div>
      </div>
    </button>
  }

  // Check parts menu order
  checkOrder = (part1, part2) => {
    return part1.order > part2.order ? 1 : -1
  }

  // Main render
  render() {
    const styles = this.state.openMenu === true
      ? { width: "220px", marginRight: "0" }
      : null

    // Define excluded
    const excluded = [].concat.apply([],
      Object.values(this.props.gunStruct.parts)
        .map(part => part.exclude)
        .filter(exists)
    )

    // ForceFronts
    const params = Object.values(this.props.gunStruct.parts).reduce((acc, part) => {
      const newItem = Object.assign({}, acc)

      // Add force_front
      if (part.force_front === true) {
        newItem.force_front = true
      }

      // Add allow_front
      if (part.allow_front === true) {
        newItem.allow_front = true
      }

      // Add require_front
      if (part.require_front === true) {
        newItem.require_front = true
      }

      // Add fsight
      if (part.fsight === true) {
        newItem.fsight = true
      }

      return newItem
    }, {})

    // Render view
    return <div className="flex-col">
      <select onChange={this.props.switchGun} value={this.props.gun}>
        <option value="ar15">{"AR-15"}</option>
        <option value="strykev">{"Stryke V"}</option>
      </select>
      <div className="flex-row customizer-menu-wrapper">
        <div className="flex-col submenu" style={styles}>
          {exists(this.state.selectedPart)
            ? guns[this.props.gun].parts[this.state.selectedPart]
                .map((p, idx) => this.renderChoices(p, idx, params))
            : null
          }
        </div>
        <div className="flex-row flex-top flex-wrap partslist">
          {Object.values(this.props.gunStruct.parts)
            .sort(this.checkOrder)
            .map(p => this.renderButtons(p, excluded))
          }
        </div>
      </div>
      <h3>{`Caliber : ${guns[this.props.gun].caliber}`}</h3>
      <div className="flex-row flex-wrap">
        {Object.entries(stats).map(this.renderStats)}
      </div>
    </div>
  }
}

export default CustomizerMenu
