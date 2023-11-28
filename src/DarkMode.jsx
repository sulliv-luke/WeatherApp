import React from 'react'
import { Button } from 'carbon-components-react'
import './App.css'
import './mode.css'

const DarkMode = ({ isDarkMode, onToggle }) => {
    return (
        <Button className={`dark-mode-toggle ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={onToggle} kind="primary">
            Toggle Dark Mode
        </Button>
    );
};

export default DarkMode