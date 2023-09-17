import { combineReducers } from 'redux';
import gameWorldReducer from './gameWorldReducer';
import controllerReducer from './ControllerReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  controller: controllerReducer,
  game: gameWorldReducer,
  player: playerReducer,
});

// Define RootState as the combined state type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
