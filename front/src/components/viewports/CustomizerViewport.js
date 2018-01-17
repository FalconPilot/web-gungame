import React, { Component } from 'react'

import { guns } from '../../data/constants'

import CustomizerMenu from '../gun_customizer/CustomizerMenu'
import CustomizerWindow from '../gun_customizer/CustomizerWindow'

class CustomizerViewport extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      currentGun: 'ar15',
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
      />
      <CustomizerWindow
        gun={this.state.currentGun}
        updateGun={this.updateGun}
        patch={this.state.gunStruct}
        transaction={this.state.transaction}
      />
    </div>
  }

  // Update gun
  updateGun = (struct) => {
    this.setState({ gunStruct: struct })
  }

  // Patch part
  patchPart = (key, index) => {

    this.setState({ transaction: {
      key: key,
      index: index
    }}, () => {
      if (key === "rear_sight" || key === "front_sight") {
        this.sightTransactions(index)
      } else if (key === "handguard") {
        const handguard = guns[this.state.currentGun].parts.handguard[index]
        this.accessoryTransaction(handguard, "top", ["side", "bottom"])
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

  // Accessories transactions
  accessoryTransaction(handguard, pos, list) {

    // Define accessory
    const accessory = this.state.gunStruct.parts.filter(part => {
      return part.key === "accessory_" + pos
    })[0]

    if (handguard["accessory_" + pos] !== true && guns[this.state.currentGun].parts["accessory_" + pos].indexOf(accessory) !== 0) {
      this.setState({ transaction: {
        key: "accessory_" + pos,
        index: 0
      }}, () => {
        if (list.length > 0) {
          const head = list.shift()
          this.accessoryTransaction(handguard, head, list)
        } else {
          this.setState({ transaction: null })
        }
      })
    } else if (list.length > 0) {
      const head = list.shift()
      this.accessoryTransaction(handguard, head, list)
    } else {
      this.setState({ transaction: null })
    }
  }
}

export default CustomizerViewport
