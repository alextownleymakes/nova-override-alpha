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
      ship: {
        x: {
          set: 'SET_SHIP_X',
          reset: 'RESET_SHIP_X',
        },
        y: {
          set: 'SET_SHIP_Y',
          reset: 'RESET_SHIP_Y',
        },
        a: {
          set: 'SET_SHIP_A',
          reset: 'RESET_SHIP_A',
        },
        v: {
          set: 'SET_SHIP_V',
          reset: 'RESET_SHIP_V',
        },
        delta: {
          set: 'SET_SHIP_DX',
          reset: 'RESET_SHIP_DX',
        },
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
  