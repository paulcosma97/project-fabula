import React from 'react';
import { Button, FormControl, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';

export interface CommandLineComponentConfig {
    value: string;
    valueChanged: (value: string) => void;
    selectValue: string;
    selectChanged: (value: any) => void;
    selectOptions: { key: string; value: string }[];
    send: () => void;
}

const useStyles = makeStyles((theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: '0.5fr 4fr 0.5fr',
    },
    select: {
        margin: theme.spacing(1),
    },
    commandLine: {
        margin: theme.spacing(1),
    },
    sendButton: {
        margin: theme.spacing(1),
    },
}));

const CommandLineComponent = ({
    value,
    valueChanged,
    selectValue,
    selectChanged,
    selectOptions,
    send,
}: CommandLineComponentConfig) => {
    const classes = useStyles();
    return (
        <form noValidate autoComplete="off" className={classes.grid}>
            <FormControl variant="outlined" className={classes.select}>
                <Select
                    id="select-ws-event-type"
                    value={selectValue}
                    onChange={(event) => selectChanged(event.target.value)}
                >
                    {selectOptions.map((item) => (
                        <MenuItem key={item.key} value={item.value}>
                            {item.key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                className={classes.commandLine}
                id="command-line"
                label="Command Line"
                variant="outlined"
                value={value}
                onChange={(event) => valueChanged(event.target.value)}
            />
            <Button className={classes.sendButton} variant="contained" color="primary" onClick={() => send()}>
                Send
            </Button>
        </form>
    );
};
export default CommandLineComponent;
