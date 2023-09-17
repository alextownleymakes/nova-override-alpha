import { actions } from './actionTypes';
import { createSetAction, createResetAction } from './actionUtils';

export const playerActions = {
    setName: createSetAction(actions.player.name.set),
    resetName: createResetAction(actions.player.name.reset),
    setShipX: createSetAction(actions.player.ship.x.set), // Updated to setShipX
    resetShipX: createResetAction(actions.player.ship.x.reset), // Updated to resetShipX
    setShipY: createSetAction(actions.player.ship.y.set), // Updated to setShipY
    resetShipY: createResetAction(actions.player.ship.y.reset), // Updated to resetShipY
    setShipA: createSetAction(actions.player.ship.a.set), // Updated to setShipA
    resetShipA: createResetAction(actions.player.ship.a.reset), // Updated to resetShipA
    setShipV: createSetAction(actions.player.ship.v.set), // Updated to setShipV
    resetShipV: createResetAction(actions.player.ship.v.reset), // Updated to resetShipV
    setShipDelta: createSetAction(actions.player.ship.delta.set), // Updated to setShipDx
    resetShipDelta: createResetAction(actions.player.ship.delta.reset), // Updated to resetShipDx
    setShipThrust: createSetAction(actions.player.ship.thrust.set), // Updated to setShipThrust
    resetShipThrust: createResetAction(actions.player.ship.thrust.reset), // Updated to resetShipThrust
    setShipReverse: createSetAction(actions.player.ship.reverse.set), // Updated to setShipReverse
    resetShipReverse: createResetAction(actions.player.ship.reverse.reset), // Updated to resetShipReverse
    setShipTurnLeft: createSetAction(actions.player.ship.turnLeft.set), // Updated to setShipTurnLeft
    resetShipTurnLeft: createResetAction(actions.player.ship.turnLeft.reset), // Updated to resetShipTurnLeft
    setShipTurnRight: createSetAction(actions.player.ship.turnRight.set), // Updated to setShipTurnRight
    resetShipTurnRight: createResetAction(actions.player.ship.turnRight.reset), // Updated to resetShipTurnRight
    setShipPrimaryWeapon: createSetAction(actions.player.ship.primaryWeapon.set), // Updated to setShipPrimaryWeapon
    resetShipPrimaryWeapon: createResetAction(actions.player.ship.primaryWeapon.reset), // Updated to resetShipPrimaryWeapon
    // Add more player actions as needed
};
