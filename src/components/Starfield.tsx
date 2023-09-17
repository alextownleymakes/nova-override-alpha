import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getNewDeltas } from '../store/actionUtils';

const StarfieldContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
`;

const Star = styled.div<{ animationDelay: string }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  pointer-events: none;
  animation: twinkle 2s linear infinite;
  animation-name: twinkle !important;
  opacity: 0;
  z-index: 100;

  ${(props) =>
    css`
      animation-delay: ${props.animationDelay};
    `}
`;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const createStars = (numStars: number) => {
  const stars: { x: number; y: number; speed: number; animationDelay: string }[] = [];

  for (let i = 0; i < numStars; i++) {
    const x = randomInRange(0, 100);
    const y = randomInRange(0, 100);
    const speed = Math.random() < 0.5 ? 0.25 : 0.5;
    const animationDelay = `${randomInRange(0, 2)}s`;

    stars.push({ x, y, speed, animationDelay });
  }

  return stars;
};

interface StarfieldProps {
  numStars: number;
}

const Starfield: FC<StarfieldProps> = ({ numStars }) => {
  const [stars, setStars] = useState(createStars(numStars));
  const { w, a, s, d } = useSelector((state: RootState) => state.controller.keysPressed);
  const { x: shipX, y: shipY, delta } = useSelector((state: RootState) => state.player.ship);
  const thrust = w;

  useEffect(() => {

    setStars((prevStars) => {
      return prevStars.map((star) => {
        // Update star positions based on speed and player's movement
        const newX = (star.x - delta.x * star.speed + 100) % 100; // Wrap around horizontally
        const newY = (star.y - delta.y * star.speed + 100) % 100; // Wrap around vertically
        return { ...star, x: newX, y: newY };
      });
    });
  }, [thrust]); // Dependencies include player movement keys and ship position

  return (
    <StarfieldContainer id="starfield">
      {stars.map((star, index) => (
        <Star
          key={index}
          animationDelay={star.animationDelay}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        />
      ))}
    </StarfieldContainer>
  );
};

export default Starfield;
