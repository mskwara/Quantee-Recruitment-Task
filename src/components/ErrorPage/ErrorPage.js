import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        "& img": {
            width: 200,
        },

        "& p": {
            margin: 0,
        },
    },
    code: {
        fontSize: "50pt",
    },

    text: {
        textTransform: "uppercase",
        fontSize: "25pt",
    },
});

const NotFound = ({ code, message, icon }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={icon} alt="" />
            <p className={classes.code}>{code}</p>
            <p className={classes.text}>{message}</p>
        </div>
    );
};

export default NotFound;
