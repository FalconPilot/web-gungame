import React, { Component } from 'react'

import { guns } from '../../data/constants'
import { exists } from '../../helpers/common'

import CustomizerMenu from '../gun_customizer/CustomizerMenu'
import CustomizerWindow from '../gun_customizer/CustomizerWindow'

import '../../stylesheets/components/gun_customizer/CustomizerViewport.css'

class CustomizerViewport extends Component {

  // Class constructor
  constructor(props) {
    super(props)
    this.state = {
      currentGun: 'ar15',
      gunStruct: {
        parts: {},
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

      // Check if gas tube needs a transaction
      if (part.key === "handguard") {
        const calc = part.width - part.gb_offset
        console.log(calc)
        this.setState({ transaction: null })

      // Check if a sight transaction is required
      } else if (exists(part.allow_front) || exists(part.force_front) || exists(part.fsight)) {
        const rear = key === "rear_sight"
          ? part
          : this.state.gunStruct.parts.rear_sight

        const front = key === "front_sight"
          ? part
          : this.state.gunStruct.parts.front_sight

        // Define anyAllow
        const anyAllow = Object.values(this.state.gunStruct.parts)
          .filter(p => p.allow_front === false)

        this.sightTransactions(part, rear, front, anyAllow)

      // Check if an exclusion is required
      } else if (exists(part.exclude)) {
        this.excludeTransaction(part, part.exclude[0], part.exclude.slice(1))

      // End transactions
      } else {
        this.setState({ transaction: null })
      }
    })
  }

  // Check for sight transactions
  sightTransactions(part, rear, front, tail) {

    // If front sight must be replaced by non-front-sight
    if (part.allow_front === false && front.fsight === true) {

      const newFront = this.getFirstPart("front_sight", "fsight", false)
      this.setState({ transaction: {
        key: "front_sight",
        index: guns[this.state.currentGun].parts.front_sight.indexOf(newFront)
      }}, () => { this.sightTransactions(part, rear, newFront, tail) })

    // If front sight is required and absent
    } else if (part.force_front === true && front.fsight !== true) {

      const newFront = this.getFirstPart("front_sight", "fsight", true)
      this.setState({ transaction: {
        key: "front_sight",
        index: guns[this.state.currentGun].parts.front_sight.indexOf(newFront)
      }}, () => { this.sightTransactions(part, rear, newFront, tail) })

    // If part is fsight and rear_sight can't accept it
    } else if (part.fsight === true && rear.allow_front === false) {

      const newRear = this.getFirstPart("rear_sight", "allow_front", true)
      this.setState({ transaction: {
        key: "rear_sight",
        index: guns[this.state.currentGun].parts.rear_sight.indexOf(newRear)
      }}, () => { this.sightTransactions(part, newRear, front, tail) })

    // Rear sight needs fsight to properly work
    } else if (rear.force_front === true && front.fsight !== true) {

      const newRear = this.getFirstPart("rear_sight", "force_front", false)
      this.setState({ transaction: {
        key: "rear_sight",
        index: guns[this.state.currentGun].parts.rear_sight.indexOf(newRear)
      }}, () => { this.sightTransactions(part, newRear, front, tail) })

    // Check if a part requires to remove front-sight
    } else if (tail.length > 0) {
      this.sightTransactions(tail[0], rear, front, tail.slice(1))

    // Check if part require exclusion
    } else if (exists(part.exclude)) {
      this.excludeTransaction(part, part.exclude[0], part.exclude.slice(1))

    // Finish transactions
    } else {
      this.setState({ transaction: null })
    }
  }

  // Get first part's structure corresponding to filter
  getFirstPart = (key, filter, val) => {
    return guns[this.state.currentGun].parts[key].filter(part => part[filter] === val)[0]
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
