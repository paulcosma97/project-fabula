import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import CommandHistoryComponent from './command-history.component';
import { useSelector } from 'react-redux';
import { selectWebSocketEvents } from '../../store/state.reducer';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(1),
    },
}));

export default function CommandHistoryContainer() {
    const classes = useStyles();
    const history = useSelector(selectWebSocketEvents);

    return (
        <Container maxWidth={'xl'} className={classes.container}>
            <CommandHistoryComponent history={history.sort((a, b) => b.timestamp - a.timestamp)} />
        </Container>
    );
}
