// actions.ts
import { actions } from './actionTypes';

export type KeyDownAction = {
  type: typeof actions.controller.KEY_DOWN;
  payload: string;
};

export type KeyUpAction = {
  type: typeof actions.controller.KEY_UP;
  payload: string;
};

export const keyDownAction = (key: string): KeyDownAction => ({
  type: actions.controller.KEY_DOWN,
  payload: key,
});

export const keyUpAction = (key: string): KeyUpAction => ({
  type: actions.controller.KEY_UP,
  payload: key,
});
