import React, { FC, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { starSystems } from '../common/functions/starSystems';
import { StarSystemType } from '../common/interfaces/interfaces';
import MiniMapComponent from './MiniMap';
import constants from '../common/constants/constants';
import Player from './Player';
import { useDispatch, useSelector } from 'react-redux';
import Starfield from './Starfield';
import { playerActions } from '../store/playerActions';
import { PlayerState } from '../store/playerReducer';
import { RootState } from '../store/rootReducer';
import { ControllerState } from '../store/ControllerReducer';

interface StarSystemProps {
  system: {
    name: string;
    x: number;
    y: number;
  };
}

const Universe = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  z-index: 1;
`;

const Galaxy = styled.div`
  position: relative;
  width: ${constants.gameMap.size * constants.gameMap.scale}px;
  height: ${constants.gameMap.size * constants.gameMap.scale}px;
  z-index: 2;
`;

const Star = styled.div`
  position: absolute;
  width: ${20 * constants.gameMap.scale}px;
  height: ${20 * constants.gameMap.scale}px;
  background-color: yellow;
  border-radius: 50%;
  position: relative;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: yellow;
    box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
  }

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 10px;
    background-color: white;
    padding: 5px;
    border: 1px solid black;
  }
`;

const StarSystem: FC<StarSystemProps> = ({ system }) => {
  const { name, x, y } = system;
  const tooltipText = `${name} (${x}, ${y})`;

  return (
    <Star style={{ left: `${x}px`, top: `${y}px` }} data-tooltip={tooltipText} />
  );
};

const GameWorld: FC = () => {
  const dispatch = useDispatch();
  const systems: StarSystemType[] = useSelector((state: RootState) => state.game.systems);
  const player: PlayerState = useSelector((state: RootState) => state.player);
  const universeRef = useRef<HTMLDivElement | null>(null);
  const galaxyRef = useRef<HTMLDivElement | null>(null);

  // Scroll the galaxy when the player moves
  useEffect(() => {
    if (universeRef.current) {
      const scrollX = player.ship.x + (window.innerWidth / 2);
      const scrollY = player.ship.y + (window.innerHeight / 2);

      universeRef.current.scrollLeft = scrollX;
      universeRef.current.scrollTop = scrollY;
    }
  }, [player.ship.x, player.ship.y]);

  const onMiniMapClick = useCallback((miniMapX: number, miniMapY: number) => {
    if (universeRef.current) {
      const scrollX = (miniMapX / constants.miniMap.size) * (constants.gameMap.size * constants.gameMap.scale);
      const scrollY = (miniMapY / constants.miniMap.size) * (constants.gameMap.size * constants.gameMap.scale);

      dispatch(playerActions.setShipX(scrollX));
      dispatch(playerActions.setShipY(scrollY));

      universeRef.current.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth',
      });
    }
  }, [universeRef]);

  // Log cursor position in galaxy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = galaxyRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(`Cursor Position in Galaxy - X: ${x}, Y: ${y}`);
      }
    };

    galaxyRef.current?.addEventListener('mousemove', handleMouseMove);

    return () => {
      galaxyRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate the player's x and y coordinates
  const playerX = player.ship.x;
  const playerY = player.ship.y;

  // Define a proximity radius (adjust this value as needed)
  const proximityRadius = 100000; // Change this to your desired proximity radius

  // Filter star systems based on proximity to the player
  const nearbySystems = systems.filter((system) => {
    const systemX = system.x;
    const systemY = system.y;

    // Calculate the distance between the player and the star system
    const distance = Math.sqrt(Math.pow(playerX - systemX, 2) + Math.pow(playerY - systemY, 2));

    // Check if the star system is within the proximity radius
    return distance <= proximityRadius;
  });

  return (
    <>
      <Starfield numStars={1000} />
      <Universe ref={universeRef}>
        <Galaxy ref={galaxyRef}>
          {nearbySystems.map((system, index) => (
            <StarSystem key={index} system={system} />
          ))}
        </Galaxy>
        <Player />
      </Universe>
      <MiniMapComponent starSystems={nearbySystems} onMiniMapClick={onMiniMapClick} />
    </>
  );
};

export default GameWorld;
