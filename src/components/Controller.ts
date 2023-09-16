import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { keyDownAction, keyUpAction } from '../store/actions'; // Import your action creators here

const Controller: React.FC = () => {
    const dispatch = useDispatch();

    const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();

        dispatch(keyDownAction(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        e.preventDefault();

        dispatch(keyUpAction(e.key));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [dispatch]);

    // Return null since this component doesn't render any visible elements.
    return null;
};

export default Controller;
