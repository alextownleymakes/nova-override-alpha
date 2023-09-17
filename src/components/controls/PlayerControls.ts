import React, { FC, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { playerActions } from '../../store/playerActions';
import { getNewDeltas } from '../../store/actionUtils';

// Define constants for acceleration and maximum velocity
const ACCELERATION = 0.1; // Adjust as needed
const MAX_VELOCITY = 5; // Adjust as needed

const PlayerControls: FC = () => {
  const { w, a, s, d } = useSelector(
    (state: RootState) => state.controller.keysPressed
  );
  const player = useSelector((state: RootState) => state.player);
  const ship = player.ship;
  const { x: shipX, y: shipY, angle: shipAngle, v: shipVelocity, handling, acceleration, maxAcceleration, maxV: maxShipVelocity, delta } = ship;
  const { w: thrust, a: turnLeft, s: brake, d: turnRight } = { w, a, s, d};

  const dispatch = useDispatch();

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    //a function that considers the player's angle in calculating new x and y coordinates
      if (thrust) {
        dispatch(playerActions.setShipDelta(true))
        

        dispatch(playerActions.setShipX(shipX + (delta.x * acceleration)));
        dispatch(playerActions.setShipY(shipY + (delta.y * acceleration)));
      }
  }, [thrust])

  useEffect(() => {
    const newAngle = (shipAngle - handling)
    if (newAngle < 0) {
      dispatch(playerActions.setShipA(newAngle + 360))
    } else {
      dispatch(playerActions.setShipA(newAngle))
    }
  }, [turnLeft])

  useEffect(() => {
    console.log('brake!')
  }, [brake])
  
  useEffect(() => {
    const newAngle = (shipAngle + handling)
    if (newAngle >= 360) {
      dispatch(playerActions.setShipA(newAngle - 360))
    } else {
      dispatch(playerActions.setShipA(newAngle))
    }
  }, [turnRight])

  return null; // PlayerControls doesn't render anything
};

export default PlayerControls;
