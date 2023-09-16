import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

const StarfieldContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
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
      animation-delay: ${props.animationDelay}; /* Add animation delay */
    `}
`;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const createStars = (numStars: number) => {
  const stars: { x: number; y: number; speed: number; animationDelay: string }[] = [];

  for (let i = 0; i < numStars; i++) {
    const x = randomInRange(0, 100);
    const y = randomInRange(0, 100);
    const speed = Math.random() < 0.5 ? 0.25 : 0.5; // 25% of stars move at 25% speed, 75% at 50% speed
    const animationDelay = `${randomInRange(0, 2)}s`; // Random animation delay

    stars.push({ x, y, speed, animationDelay });
  }

  return stars;
};

interface StarfieldProps {
  numStars: number;
}

const Starfield: FC<StarfieldProps> = ({ numStars }) => {
  const [stars, setStars] = useState(createStars(numStars));
  const { w, a, s, d } = useSelector(
    (state: RootState) => state.controller.keysPressed
  );
  
  const thrust: boolean = w;
  const reverse: boolean = s;
  const turnLeft: boolean = a;
  const turnRight: boolean = d;

  useEffect(() => {
    const handlePlayerMove = () => {
      let dx = 0;
      let dy = 0;

      if (thrust) {
        dy = 1; // Move up
      } else if (reverse) {
        dy = -1; // Move down
      }

      if (turnLeft) {
        dx = 1; // Move left
      } else if (turnRight) {
        dx = -1; // Move right
      }

      // Diagonal movement
      if (dx !== 0 && dy !== 0) {
        dx *= 0.5;
        dy *= 0.5;
      }

      setStars((prevStars) => {
        return prevStars.map((star) => {
          // Update star positions based on speed and player's movement
          const newX = (star.x + dx * star.speed + 100) % 100; // Wrap around horizontally
          const newY = (star.y + dy * star.speed + 100) % 100; // Wrap around vertically
          return { ...star, x: newX, y: newY };
        });
      });
    };

    // Handle player movement when keys are pressed
    handlePlayerMove();
  });

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
