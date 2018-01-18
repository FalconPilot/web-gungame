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
    const value = event.target.value === this.state.selectedPart
      ? null
      : event.target.value

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
    this.props.patchPart(event.target.name, event.target.value)
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
    return excluded.includes(part.key)
      ? null
      : <button
          key={`open-${part.key}`}
          value={part.key}
          onClick={this.switchPart}
        >{part.display}</button>
  }

  // Render part choices
  renderChoices = (part, idx) => {
    const index = guns[this.props.gun].parts[this.state.selectedPart].indexOf(part)
    const sidx = guns[this.props.gun].parts[this.state.selectedPart].indexOf(
      this.props.gunStruct.parts[part.key]
    )

    if (part.key === "front_sight") {
      const rear = this.props.gunStruct.parts.rear_sight

      if (rear.force_front === true && part.fsight !== true) {
        return null
      }
    }

    // Compose classes
    const classes = index === sidx
      ? "part-choice flex-col selected"
      : "part-choice flex-col"

    // Return wrapper
    return <div className={classes} key={`part-${part.key}-${idx}`}>
      <button
        name={part.key}
        value={index}
        onClick={this.changePart}
      >{part.name}</button>
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
  }

  // Check parts menu order
  checkOrder = (part1, part2) => {
    return part1.order > part2.order
      ? 1
      : -1
  }

  // Main render
  render() {
    const styles = this.state.openMenu === true
      ? { height: "125px" }
      : null

    // Define excluded
    const excluded = [].concat.apply([],
      Object.values(this.props.gunStruct.parts)
        .map(part => { return part.exclude })
        .filter(exists)
    )

    // Render view
    return <div className="flex-col">
      <select onChange={this.props.switchGun} value={this.props.gun}>
        <option value="ar15">{"AR-15"}</option>
        <option value="strykev">{"Stryke V"}</option>
      </select>
      <div className="flex-row">
        {Object.values(this.props.gunStruct.parts).sort(this.checkOrder).map(p => this.renderButtons(p, excluded) )}
      </div>
      <div className="flex-row submenu" style={styles}>
        {exists(this.state.selectedPart)
          ? guns[this.props.gun].parts[this.state.selectedPart].map(this.renderChoices)
          : null
        }
      </div>
      <h3>{`Caliber : ${guns[this.props.gun].caliber}`}</h3>
      <div className="flex-row">
        {Object.entries(stats).map(this.renderStats)}
      </div>
    </div>
  }
}

export default CustomizerMenu
