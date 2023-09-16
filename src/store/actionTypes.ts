export const actions = {
    controller: {
      KEY_DOWN: 'KEY_DOWN',
      KEY_UP: 'KEY_UP',
    },
    player: {
      name: {
        set: 'SET_NAME',
        reset: 'RESET_NAME',
      },
      x: {
        set: 'SET_X',
        reset: 'RESET_X',
      },
      y: {
        set: 'SET_Y',
        reset: 'RESET_Y',
      },
      a: {
        set: 'SET_A',
        reset: 'RESET_A',
      },
      v: {
        set: 'SET_V',
        reset: 'RESET_V',
      },
      ship: {
        thrust: {
          set: 'SET_SHIP_THRUST',
          reset: 'RESET_SHIP_THRUST',
        },
        reverse: {
          set: 'SET_SHIP_REVERSE',
          reset: 'RESET_SHIP_REVERSE',
        },
        turnLeft: {
          set: 'SET_SHIP_TURN_LEFT',
          reset: 'RESET_SHIP_TURN_LEFT',
        },
        turnRight: {
          set: 'SET_SHIP_TURN_RIGHT',
          reset: 'RESET_SHIP_TURN_RIGHT',
        },
        primaryWeapon: {
          set: 'SET_SHIP_PRIMARY_WEAPON',
          reset: 'RESET_SHIP_PRIMARY_WEAPON',
        },
      },
    },
    // Add more categories or actions as needed
  } as const;
  