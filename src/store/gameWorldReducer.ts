import constants from "../common/constants/constants";
import { starSystems } from "../common/functions/starSystems";
import { Game } from "../common/interfaces/interfaces";

  

const galacticCenterX = (constants.gameMap.size * constants.gameMap.scale) / 2;
const galacticCenterY = (constants.gameMap.size * constants.gameMap.scale) / 2;
const initialState: Game = {  
    systems: starSystems.generate(1000, galacticCenterX, galacticCenterY), // Generate 10 star systems  
};  
  
function gameWorldReducer(state = initialState, action: any): Game {  
  switch (action.type) {  
    case 'game/addSystem':  
      return {  
        ...state,  
          systems: [...state.systems, action.payload]  
      };  
    default:  
      return state;  
  }  
}  

export default gameWorldReducer;