// Import helper functions
import { baseObject } from '../../helpers/common'

// Lower receivers
import LR1 from '../../images/guns/ar15/lower_receiver/lower_receiver_1.png'
import LR2 from '../../images/guns/ar15/lower_receiver/lower_receiver_2.png'

// Upper receivers
import UR1 from '../../images/guns/ar15/upper_receiver/upper_receiver_1.png'

// Stocks
import ST1 from '../../images/guns/ar15/stock/stock_1.png'
import ST2 from '../../images/guns/ar15/stock/stock_2.png'

// Rear sights
import RS1 from '../../images/guns/ar15/rear_sight/rear_sight_1.png'

// Universal optics
import OP1 from '../../images/accessories/optic/rds_1.png'
import OP2 from '../../images/accessories/optic/rds_2.png'

// Front sights
import FS1 from '../../images/guns/ar15/front_sight/front_sight_1.png'
import FS2 from '../../images/guns/ar15/front_sight/front_sight_2.png'

// Handguards
import HG1 from '../../images/guns/ar15/handguard/handguard_1.png'
import HG2 from '../../images/guns/ar15/handguard/handguard_2.png'
import HG3 from '../../images/guns/ar15/handguard/handguard_3.png'

// Trigger guards
import TG1 from '../../images/guns/ar15/trigger_guard/trigger_guard_1.png'

// Magazines
import MAG1 from '../../images/guns/ar15/magazine/magazine_1.png'
import MAG2 from '../../images/guns/ar15/magazine/magazine_2.png'

// Barrels
import BAR1 from '../../images/guns/ar15/barrel/barrel_1.png'
import BAR2 from '../../images/guns/ar15/barrel/barrel_2.png'

// Trigger groups
import TRG1 from '../../images/guns/ar15/trigger_group/trigger_group_1.png'

// Muzzles
import MUZ1 from '../../images/guns/ar15/muzzle/muzzle_1.png'

// Pistol grips
import GRIP1 from '../../images/guns/ar15/grip/grip_1.png'
import GRIP2 from '../../images/guns/ar15/grip/grip_2.png'
import GRIP3 from '../../images/guns/ar15/grip/grip_3.png'

// Bolts
import BOLT1 from '../../images/guns/ar15/bolt/bolt_1.png'

// Bottom accessories
import AB1 from '../../images/guns/ar15/accessory_bottom/accessory_bottom_1.png'

// Define default properties for different parts
const defaultProperties = {
  lower_receiver: {
    key:      "lower_receiver",
    display:  "Lower receiver",
    order:    1,
    zIndex:   50,
    main:     true
  },

  upper_receiver: {
    key:      "upper_receiver",
    display:  "Upper receiver",
    order:    2,
    zIndex:   60
  },

  magazine: {
    key:      "magazine",
    display:  "Magazine",
    order:    3,
    zIndex:   10
  },

  grip: {
    key:      "grip",
    display:  "Pistol grip",
    order:    4,
    zIndex:   55
  },

  stock: {
    key:      "stock",
    display:  "Stock",
    order:    5,
    zIndex:   45
  },

  barrel: {
    key:      "barrel",
    display:  "Barrel",
    order:    6,
    zIndex:   30
  },

  muzzle: {
    key:      "muzzle",
    display:  "Muzzle end",
    order:    7,
    zIndex:   35
  },

  handguard: {
    key:      "handguard",
    display:  "Handguard",
    order:    8,
    zIndex:   65
  },

  bolt: {
    key:      "bolt",
    display:  "Bolt",
    order:    9,
    zIndex:   40
  },

  trigger_group: {
    key:      "trigger_group",
    display:  "Trigger group",
    order:    10,
    zIndex:   37
  },

  trigger_guard: {
    key:      "trigger_guard",
    display:  "Trigger guard",
    order:    11,
    zIndex:   38
  },

  rear_sight: {
    key:      "rear_sight",
    display:  "Rear sight/Optic",
    order:    12,
    zIndex:   70
  },

  front_sight: {
    key:      "front_sight",
    display:  "Gas block",
    order:    13,
    zIndex:   62
  },

  accessory_top: {
    key:      "accessory_top",
    display:  "Top accessory",
    order:    14,
    zIndex:   80
  },

  accessory_side: {
    key:      "accessory_side",
    display:  "Side accessory",
    order:    15,
    zIndex:   90
  },

  accessory_bottom: {
    key:      "accessory_bottom",
    display:  "Bottom accessory",
    order:    16,
    zIndex:   85
  }
}

// Base snapping points offsets
const baseSnap = {

  magazine: {
    top:  23,
    left: 119
  },

  upper_receiver: {
    bottom: 67,
    right:  0
  },

  grip: {
    top:    68,
    right:  140
  },

  stock: {
    top:    0,
    right:  181
  },

  barrel: {
    top:  6,
    left: 182
  },

  muzzle: {
    top: 10
  },

  handguard: {
    bottom: 55,
    left:   199
  },

  bolt: {
    bottom: 71,
    left:   17
  },

  front_sight: {
    bottom: 52
  },

  trigger_group: {
    bottom: 7,
    left:   47
  },

  trigger_guard: {
    top: 95,
    left: 73
  },

  rear_sight: {
    bottom: 106,
    left:   15
  },

  accessory_bottom: {
    top:  43,
    left: 190
  }
}

// Gun data structure
export const ar15 = {
  name:           "AR-15",
  type:           "assault_rifle",
  caliber:        "5.56x45mm",

  // Parts list
  parts: {

    // Lower receivers, BASE PART
    lower_receiver: [
      baseObject(defaultProperties.lower_receiver, {
        name:   "Classic lower",
        author: "Skipper Lee",
        width:  200,
        height: 100,
        image:  LR1,
        stats: {
          accuracy: 1
        },
        snap:   baseObject(baseSnap, {})
      }),
      baseObject(defaultProperties.lower_receiver, {
        name:   "Slim lower",
        author: "Shockwave",
        width:  200,
        height: 99,
        image:  LR2,
        stats: {
          handling: 1
        },
        snap:   baseObject(baseSnap, {

          upper_receiver: baseObject(baseSnap.upper_receiver, {
            bottom: 66
          }),

          bolt: baseObject(baseSnap.bolt, {
            bottom: 70
          }),

          grip: baseObject(baseSnap.grip, {
            top:    66,
            right:  136
          }),

          rear_sight: baseObject(baseSnap.rear_sight, {
            bottom: 105
          }),

          trigger_guard: baseObject(baseSnap.trigger_guard, {
            top: 94
          }),

          magazine: baseObject(baseSnap.magazine, {
            top:  22,
            left: 121
          })

        })
      })
    ],

    // Upper receivers
    upper_receiver: [
      baseObject(defaultProperties.upper_receiver, {
        name:   "Classic upper",
        author: "Skipper Lee",
        width:  196,
        height: 46,
        image:  UR1
      })
    ],

    // Magazines
    magazine: [
      baseObject(defaultProperties.magazine, {
        name:   "20rds Stanag",
        author: "Skipper Lee",
        width:  65,
        height: 129,
        image:  MAG1,
        stats: {
          capacity: 20,
          handling: 1
        }
      }),

      baseObject(defaultProperties.magazine, {
        name:   "30rds Stanag",
        author: "Skipper Lee",
        width:  86,
        height: 184,
        image:  MAG2,
        stats: {
          capacity: 30
        }
      })
    ],

    // Pistol grips
    grip: [
      baseObject(defaultProperties.grip, {
        name:   "Classic grip",
        author: "Skipper Lee",
        width:  87,
        height: 100,
        image:  GRIP1,
        stats: {
          accuracy: 1
        }
      }),
      baseObject(defaultProperties.grip, {
        name:   "VCW sniper",
        author: "Adam/Nightwig",
        width:  87,
        height: 98,
        image:  GRIP2,
        stats: {
          accuracy: 2,
          handling: -1
        }
      }),
      baseObject(defaultProperties.grip, {
        name:   "SAW grip",
        author: "Shockwave",
        width:  96,
        height: 108,
        image:  GRIP3,
        stats: {
          handling: 1
        },
        offsets: {
          top:    -3,
          right:  -8
        }
      })
    ],

    // Stocks
    stock: [
      baseObject(defaultProperties.stock, {
        name:   "Standard stock",
        author: "Skipper Lee",
        width:  248,
        height: 119,
        image:  ST1,
        stats: {
          handling: 1
        }
      }),
      baseObject(defaultProperties.stock, {
        name:   "Fixed stock",
        author: "Skipper Lee",
        width:  272,
        height: 133,
        image:  ST2,
        stats: {
          accuracy: 2,
          handling: -1
        },
        offsets: {
          top:    2,
          right:  18
        }
      })
    ],

    // Barrels
    barrel: [
      baseObject(defaultProperties.barrel, {
        name:           "16\" Barrel",
        author:         "Skipper Lee",
        width:          354,
        height:         26,
        image:          BAR1,
        muzzle_offset:  14,
        hgmax:          240,
        stats: {
          range: 10
        }
      }),
      baseObject(defaultProperties.barrel, {
        name:           "20\" Barrel",
        author:         "Skipper Lee",
        width:          432,
        height:         26,
        image:          BAR2,
        muzzle_offset:  14,
        hgmax:          310,
        stats: {
          range:    30,
          accuracy: 1,
          handling: -1
        }
      })
    ],

    // Muzzle flashes
    muzzle: [
      baseObject(defaultProperties.muzzle, {
        name:   "Birdcage flash hider",
        author: "Skipper Lee",
        width:  38,
        height: 18,
        image:  MUZ1
      })
    ],

    // Handguards
    handguard: [
      baseObject(defaultProperties.handguard, {
        name:       "Classic handguard",
        author:     "Skipper Lee",
        width:      169,
        height:     58,
        image:      HG1,
        gb_offset:  1,
        exclude: [
          "accessory_top",
          "accessory_bottom",
          "accessory_side"
        ],
        stats: {
          handling: 1
        }
      }),
      baseObject(defaultProperties.handguard, {
        name:       "Standard RIS",
        author:     "Skipper Lee",
        width:      173,
        height:     58,
        image:      HG2,
        gb_offset:  1,
      }),
      baseObject(defaultProperties.handguard, {
        name:         "Lightweight handguard",
        author:       "Shockwave",
        width:        338,
        height:       63,
        image:        HG3,
        gb_offset:    70,
        allow_front:  false,
        exclude: [
          "accessory_side",
          "accessory_bottom"
        ],
        offsets: {
          bottom: -5,
          left:   -1
        },
        stats: {
          handling: 2,
          accuracy: -1
        }
      })
    ],

    // Bolts
    bolt: [
      baseObject(defaultProperties.bolt, {
        name:   "Classic bolt",
        author: "Skipper Lee",
        width:  177,
        height: 36,
        image:  BOLT1
      })
    ],

    // Gas blocks
    front_sight: [
      baseObject(defaultProperties.front_sight, {
        name:   "Front-sight gas block",
        author: "Skipper Lee",
        fsight: true,
        width:  62,
        height: 104,
        image:  FS1
      }),
      baseObject(defaultProperties.front_sight, {
        name:   "Standard gas block",
        author: "Skipper Lee",
        fsight: false,
        width:  27,
        height: 46,
        image:  FS2,
        offsets: {
          bottom: 12
        }
      })
    ],

    // Trigger groups
    trigger_group: [
      baseObject(defaultProperties.trigger_group, {
        name:   "Standard trigger",
        author: "Semi",
        width:  79,
        height: 100,
        image:  TRG1
      })
    ],

    // Trigger guards
    trigger_guard: [
      baseObject(defaultProperties.trigger_guard, {
        name:   "Standard trigger guard",
        author: "Skipper Lee",
        width:  36,
        height: 5,
        image:  TG1
      })
    ],

    // Rear sights/optics
    rear_sight: [
      baseObject(defaultProperties.rear_sight, {
        name:         "Carrying handle",
        author:       "Skipper Lee",
        allow_front:  true,
        force_front:  true,
        width:        185,
        height:       48,
        image:        RS1
      }),
      baseObject(defaultProperties.rear_sight, {
        name:         "Reflex RDS",
        author:       "Shockwave",
        allow_front:  true,
        force_front:  false,
        width:        113,
        height:       70,
        image:        OP1,
        stats: {
          accuracy: 2
        },
        offsets: {
          left: 30
        }
      }),
      baseObject(defaultProperties.rear_sight, {
        name:         "Low-profile RDS",
        author:       "Shockwave",
        allow_front:  false,
        force_front:  false,
        width:        51,
        height:       46,
        image:        OP2,
        stats: {
          accuracy: 1,
          handling: 1
        },
        offsets: {
          left: 55
        }
      })
    ],

    // Top accessories
    accessory_top: [
      baseObject(defaultProperties.accessory_top, {
        name:   "None"
      })
    ],

    // Side accessories
    accessory_side: [
      baseObject(defaultProperties.accessory_side, {
        name:   "None"
      })
    ],

    // Bottom accessories
    accessory_bottom: [
      baseObject(defaultProperties.accessory_bottom, {
        name:   "None"
      }),
      baseObject(defaultProperties.accessory_bottom, {
        name:   "Straight foregrip",
        author: "Shockwave",
        width:  57,
        height: 117,
        image:  AB1,
        offsets: {
          left: 75
        }
      })
    ]
  }
}
