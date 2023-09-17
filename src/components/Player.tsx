import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { playerActions } from '../store/playerActions'; // Import the player action creators

const Ship = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transition: transform 0.1s;
  z-index: 1000;
`;

const OuterTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 40px solid white; /* Adjust the size and color as needed */
`;

const InnerTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 20px solid #6699ff; /* Adjust the size and color as needed */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

interface PlayerProps {}

const Player: FC<PlayerProps> = () => {
  const { w, a, s, d } = useSelector(
    (state: RootState) => state.controller.keysPressed
  );
  const ship = useSelector((state: RootState) => state.player.ship);
  const { angle } = ship;

  return (
    <Ship
      data-tooltip="beans jeans"
      style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
    >
      <OuterTriangle>
        <InnerTriangle />
      </OuterTriangle>
    </Ship>
  );
};

export default Player;
