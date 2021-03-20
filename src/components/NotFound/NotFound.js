import { makeStyles } from "@material-ui/core";
import notFoundIcon from "../../assets/notFoundIcon.svg";

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

const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={notFoundIcon} alt="" />
            <p className={classes.code}>404</p>
            <p className={classes.text}>Page not found</p>
        </div>
    );
};

export default NotFound;
