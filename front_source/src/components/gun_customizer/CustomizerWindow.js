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
      mainPart: Object.values(parts).filter(part => { return part.main === true })[0],
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
        mainPart: Object.values(parts).filter(part => { return part.main === true })[0],
        caliber: guns[this.props.gun].caliber
      }, () => { this.props.updateGun(this.state) })
    }

    // Patch transactions
    if (exists(newProps.transaction)) {
      const nextPart = guns[this.props.gun].parts[newProps.transaction.key][newProps.transaction.index]
      const newParts = Object.assign({}, this.state.parts)
      newParts[newProps.transaction.key] = nextPart

      const newMain = nextPart.main === true
        ? nextPart
        : this.state.mainPart

      // Update state
      this.setState({
        parts: newParts,
        mainPart: newMain
      }, () => { this.props.updateGun(this.state) })
    }
  }

  // Get default parts
  getDefaultParts(key) {
    return Object.values(guns[key].parts).reduce((acc, list) => {
      return Object.assign(acc, {[list[0].key]: list[0]})
    }, {})
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
    const snaps =   this.state.mainPart.snap
    const barrel =  this.state.parts.barrel
    const slide =   this.state.parts.slide
    const hgbase =  this.state.parts.handguard

    // Compute gas block offset
    const gbOffset = part.key === "front_sight" || part.key === "gas_tube"
      ? hgbase.width + snaps.handguard.left - hgbase.gb_offset
      : 0

    // Compute muzzle offset
    const muzzleOffset = part.key === "muzzle"
      ? barrel.width + snaps.barrel.left - barrel.muzzle_offset
      : 0

    // Compute recoil spring offset
    const springOffset = part.key === "recoil_spring"
      ? slide.width + snaps.slide.left + part.rsOffset - part.width
      : 0

    // Compute final offset
    const finalOffset = ["front_sight", "gas_tube", "muzzle", "recoil_spring"].includes(part.key)
      ? (exists(snaps[part.key]) && exists(snaps[part.key].left)
        ? snaps[part.key].left + gbOffset + muzzleOffset + springOffset
        : gbOffset + muzzleOffset + springOffset
      )
      : (exists(snaps[part.key]) ? snaps[part.key].left : null)

    // Define raw offsets
    const rawOffsets = !exists(snaps[part.key])
      ? {}
      : {
          top:    snaps[part.key].top + paddings.top,
          bottom: snaps[part.key].bottom + paddings.bottom,
          left:   finalOffset + paddings.left,
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
        {Object.values(this.state.parts).map(this.renderPart)}
      </div>
    </div>
  }
}

export default CustomizerWindow
