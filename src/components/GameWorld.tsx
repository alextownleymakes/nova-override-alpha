import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import { starSystems } from '../common/functions/starSystems';
import { StarSystemType } from '../common/interfaces/interfaces';
import MiniMapComponent from './MiniMap';
import constants from '../common/constants/constants';
import Player from './Player'; // Import the Player component
import { useSelector } from 'react-redux';
import Starfield from './Starfield';

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
  background-color: black;
  z-index: 2;
`;

const Star = styled.div`
  position: absolute;
  width: ${20 * constants.gameMap.scale}px;
  height: ${20 * constants.gameMap.scale}px;
  background-color: yellow;
  border-radius: 50%;
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 10px;
    background-color: white;
    padding: 5px;
    border: 1px solid black;
  }
  z-index: 100;
};
`

const StarSystem: FC<StarSystemProps> = ({ system }) => {
    const { name, x, y } = system;
    const tooltipText = `${name} (${x}, ${y})`;

    return (
        <Star style={{ left: `${x}px`, top: `${y}px` }} data-tooltip={tooltipText} />
    );
};

// ... (previous imports and component code)

const GameWorld: FC = () => {
    const systems: StarSystemType[] = useSelector((state: any) => state.game.systems);
    const universeRef = useRef<HTMLDivElement | null>(null);
    const galaxyRef = useRef<HTMLDivElement | null>(null);
    const [galaxyScroll, setGalaxyScroll] = useState({ x: 0, y: 0 });
    const galaxySize = constants.gameMap.size * constants.gameMap.scale;
    const minimapSize = constants.miniMap.size;
    const xScale = galaxySize / minimapSize;
    const yScale = galaxySize / minimapSize;



    // Initialize player's position at the center of the universe
    const [playerPosition, setPlayerPosition] = useState({
        x: (constants.gameMap.size * constants.gameMap.scale) / 2 - window.innerWidth / 2,
        y: (constants.gameMap.size * constants.gameMap.scale) / 2 - window.innerHeight / 2,
    });

    useEffect(() => {
        if (universeRef.current) {
          const initialScrollX = (constants.gameMap.size * constants.gameMap.scale) / 2 - window.innerWidth / 2;
          const initialScrollY = (constants.gameMap.size * constants.gameMap.scale) / 2 - window.innerHeight / 2;
      
          universeRef.current.scrollTo({
            left: initialScrollX,
            top: initialScrollY,
            behavior: 'auto', // You can adjust the scrolling behavior
          });
        }
      }, []);

    const onMiniMapClick = useCallback((miniMapX: number, miniMapY: number) => {
        if (universeRef.current) {

        const scrollX = (miniMapX/constants.miniMap.size) * (constants.gameMap.size * constants.gameMap.scale);
        const scrollY = (miniMapY/constants.miniMap.size) * (constants.gameMap.size * constants.gameMap.scale);
        console.log('minimap percentage x: ' + miniMapX/constants.miniMap.size);
        console.log('minimap percentage y: ' + miniMapY/constants.miniMap.size);
        console.log('scrollX: ' + scrollX);
        console.log('scrollY: ' + scrollY);
      
          universeRef.current.scrollTo({
            left: scrollX,
            top: scrollY,
            behavior: 'smooth', // You can adjust the scrolling behavior
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

    const handlePlayerMove = (dx: number, dy: number) => {
        // Calculate the new scroll position for the galaxy
        const newScrollX = galaxyScroll.x + dx;
        const newScrollY = galaxyScroll.y + dy;
      
        // Update the galaxyScroll state
        setGalaxyScroll({ x: newScrollX, y: newScrollY });
      
        // Scroll the galaxy div accordingly
        if (universeRef.current) {
          universeRef.current.scrollLeft = newScrollX;
          universeRef.current.scrollTop = newScrollY;
        }
      };
      



    return (
        <>
            <Universe ref={universeRef}>
                <Galaxy ref={galaxyRef}>
                    {systems.map((system, index) =>
                        <StarSystem key={index} system={system} />
                    )}
                </Galaxy>
                <Player onMove={handlePlayerMove} />
            </Universe>
            <Starfield numStars={1000}/>     
            <MiniMapComponent starSystems={systems} onMiniMapClick={onMiniMapClick} />
        </>
    );
};

export default GameWorld;
