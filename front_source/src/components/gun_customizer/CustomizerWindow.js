import React, { Component } from 'react'

import { guns } from '../../data/constants'
import { exists } from '../../helpers/common'

import '../../stylesheets/components/gun_customizer/CustomizerWindow.css'

class CustomizerWindow extends Component {

  // Class constructor
  constructor(props) {
    super(props)

    const parts = this.getDefaultParts(props.gun)
    this.state = {
      currentGun: props.gun,
      parts: parts,
      mainPart: parts.filter(part => { return part.main === true })[0],
      caliber: guns[this.props.gun].caliber,
      transaction: null
    }
  }

  // Send initial update
  componentWillMount() {
    this.props.updateGun(this.state)
  }

  // Patch state
  componentWillReceiveProps = async(newProps) => {

    // Update state when gun is overriden
    if (newProps.gun !== this.state.currentGun) {
      const parts = this.getDefaultParts(newProps.gun)
      await this.setState({
        currentGun: newProps.gun,
        parts: parts,
        mainPart: parts.filter(part => { return part.main === true })[0],
        caliber: guns[this.props.gun].caliber
      }, () => { this.props.updateGun(this.state) })
    }

    // Patch transactions
    if (exists(newProps.transaction)) {
      const nextPart = guns[this.props.gun].parts[newProps.transaction.key][newProps.transaction.index]
      const newParts = this.state.parts
        .filter(part => { return part.key !== newProps.transaction.key })
        .concat([nextPart])

      const newMain = nextPart.main === true
        ? nextPart
        : this.state.mainPart

      // Update state
      this.setState({
        parts: newParts,
        mainPart: newMain
      }, () => {
        this.props.updateGun(this.state)
      })
    }
  }

  // Get default parts
  getDefaultParts(key) {
    return Object.values(guns[key].parts).map(list => {
      return list[0]
    })
  }

  // Merge part offsets
  mergeOffsets(part, offsets) {
    return exists(part.offsets)
      ? Object.entries(part.offsets).reduce((acc, [pos, value]) => {
        return exists(acc[pos])
          ? Object.assign(acc, { [pos]: value + acc[pos] })
          : Object.assign(acc, { [pos]: value })
      }, offsets)
      : offsets
  }

  // Render a single gun part
  renderPart = (part) => {

    if (!exists(part.image)) {
      return null
    }

    // Paddings values
    const paddings = {
      top:    20,
      bottom: 20,
      left:   20,
      right:  250
    }

    // Aliases
    const snaps = this.state.mainPart.snap
    const barrel = this.state.parts.filter(p => { return p.key === "barrel" })[0]
    const hgbase = this.state.parts.filter(p => { return p.key === "handguard" })[0]

    // Compute gas block offset
    const gbOffset = part.key === "front_sight"
      ? hgbase.width + snaps.handguard.left - hgbase.gb_offset
      : (exists(snaps[part.key])
        ? snaps[part.key].left
        : 0
      )

    // Compute muzzle offset
    const muzzleOffset = part.key === "muzzle"
      ? barrel.width + snaps.barrel.left - barrel.muzzle_offset
      : (exists(snaps[part.key])
        ? gbOffset
        : 0
      )


    // Define raw offsets
    const rawOffsets = !exists(snaps[part.key])
      ? {}
      : {
          top:    snaps[part.key].top + paddings.top,
          bottom: snaps[part.key].bottom + paddings.bottom,
          left:   muzzleOffset + paddings.left,
          right:  snaps[part.key].right + paddings.right
        }

    // Filter acceptable offsets
    const offsets = Object.entries(rawOffsets)
      .filter(([k, v]) => { return !isNaN(v) })
      .reduce((acc, [k, v]) => { return Object.assign(acc, { [k]: v }) }, {})

    // Define custom styles
    const constantStyles = {
      zIndex: part.zIndex,
      position: (part.main === true ? "relative" : "absolute")
    }

    // Combine styles
    const styles = Object.assign(this.mergeOffsets(part, offsets), constantStyles)

    // Return image
    return <img
      key={part.key}
      alt={part.key}
      src={part.image}
      style={styles}
    />
  }

  // Main render
  render() {
    return <div className={`customizer-wrapper ${this.props.gun}`}>
      <div className="customizer-window">
        {this.state.parts.map(this.renderPart)}
      </div>
    </div>
  }
}

export default CustomizerWindow
