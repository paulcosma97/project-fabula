import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import CommandLineContainer from './core/components/command-line/command-line.container';
import CommandHistoryContainer from './core/components/command-history/command-history.container.';

function App() {
    return (
        <Container disableGutters={true} maxWidth={'xl'}>
            <CommandLineContainer />
            <CommandHistoryContainer />
        </Container>
    );
}

export default App;
