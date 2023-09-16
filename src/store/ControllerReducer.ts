import { actions } from './actionTypes';

interface ControllerState {
  keysPressed: { [key: string]: boolean };
}

const initialState: ControllerState = {
  keysPressed: {},
};

type ControllerAction =
  | {
      type: typeof actions.controller.KEY_DOWN;
      payload: string;
    }
  | {
      type: typeof actions.controller.KEY_UP;
      payload: string;
    };

const controllerReducer = (
  state = initialState,
  action: ControllerAction
): ControllerState => {
  switch (action.type) {
    case actions.controller.KEY_DOWN:
      return {
        ...state,
        keysPressed: {
          ...state.keysPressed,
          [action.payload]: true,
        },
      };
    case actions.controller.KEY_UP:
      return {
        ...state,
        keysPressed: {
          ...state.keysPressed,
          [action.payload]: false,
        },
      };
    default:
      return state;
  }
};

export default controllerReducer;
