export const createAction = (type: string, payload?: any) => ({ type, payload });
export const createSetAction = (setActionType: string) => (payload: any) => createAction(setActionType, payload);
export const createResetAction = (resetActionType: string) => () => createAction(resetActionType);

export const getNewDeltas = (shipAngle: number, shipVelocity: number, maxShipVelocity: number, acceleration: number) => {
    const angle = (shipAngle * Math.PI) / 180; // Convert degrees to radians

    // Calculate combined rates of x and y at the current player angle
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    // Calculate player's velocity as the magnitude of the velocity vector
    const newPlayerVelocity = Math.sqrt(dx * dx + dy * dy);

    // Calculate acceleration based on the change in velocity
    const newAcceleration = newPlayerVelocity - shipVelocity;

    // Limit acceleration to the defined maximum acceleration
    const accelerationToApply = Math.min(newAcceleration, acceleration);

    // Calculate player's new velocity, considering acceleration and limiting it
    let updatedVelocity = shipVelocity + accelerationToApply;
    updatedVelocity = Math.min(updatedVelocity, maxShipVelocity);
    // dispatch(playerActions.setShipV(updatedVelocity));

    // Update player's x and y coordinates based on the new velocity
    const updatedDx = updatedVelocity * Math.cos(angle);
    const updatedDy = updatedVelocity * Math.sin(angle);

    return ({delta: { x: updatedDx, y: updatedDy}, v: updatedVelocity})
}