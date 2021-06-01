import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { WebsocketEventType } from '../../types/ws/websocket-event.type';

export interface CommandHistoryComponentConfig {
    history: WebsocketEventType[];
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        maxHeight: 650,
    },
});

const CommandHistoryComponent = ({ history }: CommandHistoryComponentConfig) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="History Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Websocket Event Type</TableCell>
                        <TableCell>Body</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.timestamp}
                            </TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CommandHistoryComponent;
