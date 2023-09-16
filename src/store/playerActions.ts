import { actions } from './actionTypes';
import { createSetAction, createResetAction } from './actionUtils';

export const playerActions = {
    setName: createSetAction(actions.player.name.set),
    resetName: createResetAction(actions.player.name.reset),
    setX: createSetAction(actions.player.x.set),
    resetX: createResetAction(actions.player.x.reset),
    setY: createSetAction(actions.player.y.set),
    resetY: createResetAction(actions.player.y.reset),
    setA: createSetAction(actions.player.a.set),
    resetA: createResetAction(actions.player.a.reset),
    setV: createSetAction(actions.player.v.set),
    resetV: createResetAction(actions.player.v.reset),
    setThrust: createSetAction(actions.player.ship.thrust.set),
    resetThrust: createResetAction(actions.player.ship.thrust.reset),
    setReverse: createSetAction(actions.player.ship.reverse.set),
    resetReverse: createResetAction(actions.player.ship.reverse.reset),
    setTurnLeft: createSetAction(actions.player.ship.turnLeft.set),
    resetTurnLeft: createResetAction(actions.player.ship.turnLeft.reset),
    setTurnRight: createSetAction(actions.player.ship.turnRight.set),
    resetTurnRight: createResetAction(actions.player.ship.turnRight.reset),
    setPrimaryWeapon: createSetAction(actions.player.ship.primaryWeapon.set),
    resetPrimaryWeapon: createResetAction(actions.player.ship.primaryWeapon.reset),
    // Add more player actions as needed
};
