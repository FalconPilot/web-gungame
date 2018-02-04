// Import helper functions
import { baseObject } from '../../helpers/common'

// Frames
import FR1 from '../../images/guns/strykev/frame/frame_1.png'

// Slides
import SL1 from '../../images/guns/strykev/slide/slide_1.png'

// Recoil springs
import RS1 from '../../images/guns/strykev/recoil_spring/recoil_spring_1.png'

// Barrels
import BAR1 from '../../images/guns/strykev/barrel/barrel_1.png'

// Magazines
import MAG1 from '../../images/guns/strykev/magazine/magazine_1.png'

// Grip panels
import GRIP1 from '../../images/guns/strykev/grip/grip_1.png'

// Define default properties for different parts
const defaultProperties = {
  frame: {
    key:      "frame",
    display:  "Frame",
    order:    1,
    zIndex:   50,
    main:     true
  },

  slide: {
    key:      "slide",
    display:  "Slide",
    order:    2,
    zIndex:   40
  },

  barrel: {
    key:      "barrel",
    display:  "Barrel",
    order:    3,
    zIndex:   30
  },

  recoil_spring: {
    key:      "recoil_spring",
    display:  "Recoil spring",
    order:    4,
    zIndex:   35
  },

  magazine: {
    key:      "magazine",
    display:  "Magazine",
    order:    5,
    zIndex:   20
  },

  grip: {
    key:      "grip",
    display:  "Grip panels",
    order:    6,
    zIndex:   60
  },

  rear_sight: {
    key:      "rear_sight",
    display:  "Rear sight",
    order:    7,
    zIndex:   70
  }

}

// Base snapping points offsets
const baseSnap = {

  slide: {
    bottom: 189,
    left:   24
  },

  barrel: {
    bottom: 213,
    left:   192
  },

  recoil_spring: {
    bottom: 190
  },

  magazine: {
    bottom: -11,
    left:   10
  },

  grip: {
    bottom: 17,
    left:   18
  },

  rear_sight: {
    bottom: 244,
    left:   40
  }
}

// Gun data structure
export const strykev = {
  name:           "Stryke V",
  type:           "pistol",
  caliber:        "9x19mm",

  // Parts list
  parts: {

    // Frames
    frame: [
      baseObject(defaultProperties.frame, {
        name:   "Steel frame",
        author: "Lularros",
        width:  374,
        height: 216,
        image:  FR1,
        stats: {
          handling: 1
        },
        snap: baseObject(baseSnap, {})
      })
    ],

    // Slides
    slide: [
      baseObject(defaultProperties.slide, {
        name:   "Steel slide",
        author: "Lularros",
        width:  397,
        height: 60,
        image:  SL1
      })
    ],

    // Barrels
    barrel: [
      baseObject(defaultProperties.barrel, {
        name:   "Light barrel",
        author: "Lularros",
        width:  236,
        height: 33,
        image:  BAR1,
        stats: {
          handling: 1
        }
      })
    ],

    // Recoil springs
    recoil_spring: [
      baseObject(defaultProperties.recoil_spring, {
        name:   "Standard spring",
        author: "Lularros",
        width:  101,
        height: 55,
        image:  RS1,
        rsOffset: 8
      })
    ],

    // Magazines
    magazine: [
      baseObject(defaultProperties.magazine, {
        name:   "Standard magazine",
        author: "Lularros",
        width:  183,
        height: 254,
        image:  MAG1,
        stats: {
          capacity: 10
        }
      })
    ],

    // Grip panels
    grip: [
      baseObject(defaultProperties.grip, {
        name:   "Plastic grip panels",
        author: "Lularros",
        width:  150,
        height: 188,
        image:  GRIP1,
        stats: {
          handling: 1
        }
      })
    ]
  }
}
