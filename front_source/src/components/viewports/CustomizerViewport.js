import React, { Component } from 'react'

import { guns } from '../../data/constants'
import { exists } from '../../helpers/common'

import CustomizerMenu from '../gun_customizer/CustomizerMenu'
import CustomizerWindow from '../gun_customizer/CustomizerWindow'

class CustomizerViewport extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      currentGun: 'strykev',
      gunStruct: {
        parts: [],
        mainPart: {},
        caliber: "",
        keys: []
      },
      transaction: null
    }
  }

  // Main render
  render() {
    return <div className="flex-col">
      <CustomizerMenu
        gun={this.state.currentGun}
        gunStruct={this.state.gunStruct}
        patchPart={this.patchPart}
        switchGun={this.switchGun}
      />
      <CustomizerWindow
        gun={this.state.currentGun}
        updateGun={this.updateGun}
        patch={this.state.gunStruct}
        transaction={this.state.transaction}
      />
    </div>
  }

  // Change selected gun
  switchGun = (event) => {
    this.setState({ currentGun: event.target.value })
  }

  // Update gun
  updateGun = (struct) => {
    this.setState({ gunStruct: struct })
  }

  // Patch part
  patchPart = (key, index) => {
    const part = guns[this.state.currentGun].parts[key][index]

    this.setState({ transaction: {
      key: key,
      index: index
    }}, () => {
      if (key === "rear_sight" || key === "front_sight") {
        this.sightTransactions(index)
      } else if (exists(part.exclude)) {
        this.excludeTransaction(part, part.exclude[0], part.exclude.slice(1))
      } else {
        this.setState({ transaction: null })
      }
    })
  }

  // Check for sight transactions
  sightTransactions(index) {
    const rear = guns[this.state.currentGun].parts.rear_sight[index]
    const front = this.state.gunStruct.parts.filter(part => {
      return part.key === "front_sight"
    })[0]

    // Check what kind of transaction to apply next
    if (rear.allow_front !== true && front.fsight === true) {

      // Get first gas block on list
      const firstGBL = guns[this.state.currentGun].parts.front_sight.indexOf(
        guns[this.state.currentGun].parts.front_sight.filter(part => {
          return part.fsight === false
        })[0]
      )

      // Apply transaction
      this.setState({ transaction: {
        key: "front_sight",
        index: firstGBL
      }}, () => { this.setState({ transaction: null }) })
    } else if (rear.force_front === true && front.fsight === false) {

      // Get first rear sight on list
      const firstSight = guns[this.state.currentGun].parts.front_sight.indexOf(
        guns[this.state.currentGun].parts.front_sight.filter(part => {
          return part.fsight === true
        })[0]
      )

      // Apply transaction
      this.setState({ transaction: {
        key: "front_sight",
        index: firstSight
      }}, () => { this.setState({ transaction: null }) })
    } else {
      this.setState({ transaction: null })
    }
  }

  // Exclusion transaction
  excludeTransaction(part, head, tail) {
    this.setState({ transaction: {
      key: head,
      index: 0
    }}, () => {
      if (tail.length > 0) {
        this.excludeTransaction(part, tail[0], tail.slice(1))
      } else {
        this.setState({ transaction: null })
      }
    })
  }
}

export default CustomizerViewport
