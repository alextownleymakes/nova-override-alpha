import { actions } from './actionTypes';

type PlayerState = {
  name: string;
  x: number;
  y: number;
  a: number;
  v: number;
  ship: {
    thrust: boolean;
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
  x: 0,
  y: 0,
  a: 0,
  v: 0,
  ship: {
    thrust: false,
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
    case actions.player.x.set:
      return { ...state, x: action.payload as number };
    case actions.player.x.reset:
      return { ...state, x: 0 };
    case actions.player.y.set:
      return { ...state, y: action.payload as number };
    case actions.player.y.reset:
      return { ...state, y: 0 };
    case actions.player.a.set:
      return { ...state, a: action.payload as number };
    case actions.player.a.reset:
      return { ...state, a: 0 };
    case actions.player.v.set:
      return { ...state, v: action.payload as number };
    case actions.player.v.reset:
      return { ...state, v: 0 };
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
