import { get } from 'http';
import constants from '../common/constants/constants';
import { actions } from './actionTypes';
import { getNewDeltas } from './actionUtils';

export type PlayerState = {
  name: string;
  ship: {
    x: number;
    y: number;
    angle: number;
    v: number;
    maxV: number;
    acceleration: number;
    maxAcceleration: number;
    delta: {x: number, y: number}
    t: {
      x: number;
      y: number;
    };
    handling: number;
    forward: boolean;
    reverse: boolean;
    turnLeft: boolean;
    turnRight: boolean;
    primaryWeapon: boolean;
  };
};

type PlayerAction =
  | { type: any; payload: string | number };

const initialState: PlayerState = {
  name: '',
  ship: {
    x: (constants.gameMap.size * constants.gameMap.scale) / 2,
    y: (constants.gameMap.size * constants.gameMap.scale) / 2,
    angle: 360,
    v: 0,
    maxV: 1000,
    acceleration: 50,
    maxAcceleration: 1000,
    delta: {x: 0, y: 0},
    t: {
      x: 0,
      y: 0,
    },
    handling: 8,
    forward: false,
    reverse: false,
    turnLeft: false,
    turnRight: false,
    primaryWeapon: false,
  },
};

const playerReducer = (state: PlayerState = initialState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case actions.player.name.set:
      return { ...state, name: action.payload as string };
    case actions.player.name.reset:
      return { ...state, name: '' };
    case actions.player.ship.x.set:
      return { ...state, ship: { ...state.ship, x: action.payload as number } };
    case actions.player.ship.x.reset:
      return { ...state, ship: { ...state.ship, x: 0 } };
    case actions.player.ship.y.set:
      return { ...state, ship: { ...state.ship, y: action.payload as number } };
    case actions.player.ship.y.reset:
      return { ...state, ship: { ...state.ship, y: 0 } };
    case actions.player.ship.a.set:
      return { ...state, ship: { ...state.ship, angle: action.payload as number } };
    case actions.player.ship.a.reset:
      return { ...state, ship: { ...state.ship, angle: 0 } };
    case actions.player.ship.v.set:
      return { ...state, ship: { ...state.ship, v: action.payload as number } };
    case actions.player.ship.v.reset:
      return { ...state, ship: { ...state.ship, v: 0 } };
    case actions.player.ship.delta.set:
        const newState = getNewDeltas(state.ship.angle, state.ship.v, state.ship.maxV, state.ship.maxAcceleration)
        return { ...state, ship: { ...state.ship, ...newState } };
    case actions.player.ship.delta.reset:
        return { ...state, ship: { ...state.ship, delta: { x: 0, y: 0}, v: 0 }};
    // Handle the actions for ship properties
    case actions.controller.KEY_DOWN:
    case actions.controller.KEY_UP:
      return {
        ...state,
        ship: {
          ...state.ship,
          [action.payload]: true, // Update the corresponding ship property to true
        },
      };
    default:
      return state;
  }
};

export default playerReducer;
