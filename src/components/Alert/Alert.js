import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        position: "fixed",
        top: 50,
        zIndex: 20,
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function MyAlert({ content, type }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity={type}>{content}</Alert>
        </div>
    );
}
