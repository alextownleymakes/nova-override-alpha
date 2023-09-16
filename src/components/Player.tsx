import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { playerActions } from '../store/playerActions'; // Import the player action creators

const Ship = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.1s;
  z-index: 200;
`;

interface PlayerProps {
  onMove: (dx: number, dy: number) => void;
}

const Player: FC<PlayerProps> = ({ onMove }) => {

  const { w, a, s, d } = useSelector(
    (state: RootState) => state.controller.keysPressed
  );
  
  const thrust: boolean = w;
  const reverse: boolean = s;
  const turnLeft: boolean = a;
  const turnRight: boolean = d;

  const dispatch = useDispatch();

  const dx = (thrust ? 10 : 0) - (reverse ? 5 : 0);
  const dy = 0;
  const rotation = (turnLeft ? -10 : 0) + (turnRight ? 10 : 0);

  // Dispatch the setX and setY actions based on the player's movement
  useEffect(() => {
    dispatch(playerActions.setX(dx)); // Update player's x coordinate
    dispatch(playerActions.setY(dy)); // Update player's y coordinate
    onMove(dx, dy);
  }, [dx, dy, onMove, dispatch]);

  return (
    <Ship
      data-tooltip="beans jeans"
      style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
    />
  );
};

export default Player;
