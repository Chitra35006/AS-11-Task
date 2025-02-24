import React, { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeContext';

const useTheme = () => {
    const theme = useContext(ThemeContext);
    return theme;
};

export default useTheme;