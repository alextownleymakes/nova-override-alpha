// ControllerComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { keyDownAction, keyUpAction } from '../store/actions';

const ControllerComponent: React.FC = () => {
  const dispatch = useDispatch();

  const keyState: { [key: string]: boolean } = {};
  const keysToToggle: { [key: string]: boolean } = {
    W: true,  // Example: W key should toggle with an interval
    A: true,  // Example: A key should toggle with an interval
    S: true,  // Example: S key should toggle with an interval
    D: true,  // Example: D key should toggle with an interval
    w: true,
    a: true,
    s: true,
    d: true,
    Space: false,  // Example: Space key should not toggle with an interval
    Enter: false,  // Example: Enter key should not toggle with an interval
    // Add more keys as needed
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keyState[e.key]) {
        dispatch(keyDownAction(e.key));
        keyState[e.key] = true;

        // Check if the key should be toggled with an interval
        if (keysToToggle[e.key]) {
          startToggleInterval(e.key);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (keysToToggle[e.key]) {
            stopToggleInterval(e.key);
        }
      dispatch(keyUpAction(e.key));
      keyState[e.key] = false;
      setTimeout(() => {
        dispatch(keyUpAction(e.key));
        }, 3);

      // Check if the key should be toggled with an interval
    };

    const startToggleInterval = (key: string) => {
      // Set up an interval to repeatedly dispatch key press actions for held keys
      const intervalId = setInterval(() => {
        if (keyState[key]) {
          dispatch(keyUpAction(key)); // Release the key
          setTimeout(() => {
            dispatch(keyDownAction(key)); // Press the key after a short delay
          }, 1); // Adjust the delay duration as needed
        }
      }, 2); // Adjust the interval duration as needed

      // Store the interval ID for later cleanup
      keyToggleIntervals[key] = intervalId;
    };

    const stopToggleInterval = (key: string) => {
      // Clear the interval if it exists
      const intervalId = keyToggleIntervals[key];
      if (intervalId) {
        clearInterval(intervalId);
        delete keyToggleIntervals[key];
      }
    };

    const keyToggleIntervals: { [key: string]: NodeJS.Timer } = {}; // Specify the type as NodeJS.Timer

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      // Clear all toggle intervals when the component unmounts
      for (const key in keyToggleIntervals) {
        stopToggleInterval(key);
      }
    };
  }, [dispatch, keyState, keysToToggle]);

  return null;
};

export default ControllerComponent;
