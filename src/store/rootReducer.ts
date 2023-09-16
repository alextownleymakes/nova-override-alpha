import { combineReducers } from 'redux';
import gameWorldReducer from './gameWorldReducer';
import controllerReducer from './ControllerReducer';

const rootReducer = combineReducers({
  controller: controllerReducer,
  game: gameWorldReducer,
});

// Define RootState as the combined state type
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
