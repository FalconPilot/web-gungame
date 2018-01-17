import { ar15 } from './weapons/ar15.js'
import { ffsix } from './ammo.json'

export const guns = {
  "ar15": ar15
}

export const stats = {
  "min-damage":   {
    display: "Minimum damage"
  },
  "max-damage": {
    display: "Maximum damage"
  },
  "penetration": {
    display: "Penetration"
  },
  "range": {
    display: "Range"
  },
  "accuracy": {
    display: "Accuracy"
  },
  "handling": {
    display: "Handling"
  },
  "capacity": {
    display: "Capacity"
  }
}

export const ammo = {
  "5.56x45mm": ffsix
}
