// Import helper functions
import { baseObject } from '../../helpers/common'

// Frames
import FR1 from '../../images/guns/strykev/frame/frame_1.png'

// Slides
import SL1 from '../../images/guns/strykev/slide/slide_1.png'

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

  magazine: {
    key:      "magazine",
    display:  "Magazine",
    order:    4,
    zIndex:   20
  },

  grip: {
    key:      "grip",
    display:  "Grip panels",
    order:    5,
    zIndex:   60
  },

  rear_sight: {
    key:      "rear_sight",
    display:  "Rear sight",
    order:    6,
    zIndex:   70
  }
}

// Base snapping points offsets
const baseSnap = {

  slide: {
    top:  -32,
    left: 27
  },

  barrel: {
    bottom: 212,
    left:   200
  },

  magazine: {
    bottom: -10,
    left:   13
  },

  grip: {
    bottom: 18,
    left:   21
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
        width:  395,
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
        width:  448,
        height: 62,
        image:  SL1
      })
    ],

    // Barrels
    barrel: [
      baseObject(defaultProperties.barrel, {
        name:   "Light barrel",
        author: "Lularros",
        width:  281,
        height: 35,
        image:  BAR1,
        stats: {
          handling: 1
        }
      })
    ],

    // Magazines
    magazine: [
      baseObject(defaultProperties.magazine, {
        name:   "Standard magazine",
        author: "Lularros",
        width:  186,
        height: 248,
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
        width:  157,
        height: 186,
        image:  GRIP1,
        stats: {
          handling: 1
        }
      })
    ]
  }
}
