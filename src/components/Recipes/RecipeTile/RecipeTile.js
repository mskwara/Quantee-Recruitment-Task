import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import Ingredients from "./Ingredients";
import { useHistory } from "react-router-dom";

// import styles from "./RecipeTile.module.scss";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: "10px",
        width: 345,
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
    },
    media: {
        height: 140,
    },
    buttons: {
        marginTop: "auto",
    },
    notes: {
        display: "flex",
        alignItems: "center",

        "& p": {
            marginLeft: 10,
        },
    },
});

export default function MediaCard({ recipe }) {
    const classes = useStyles();
    const history = useHistory();

    const redirectTo = (url) => {
        history.push(url);
    };
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={recipe.img}
                    title={recipe.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                    </Typography>

                    <Ingredients ingredients={recipe.ingredients} />
                    <span className={classes.notes}>
                        <CommentIcon color="primary" />
                        <p>{recipe.notes}</p>
                    </span>
                </CardContent>
            </CardActionArea>
            <CardActions
                classes={{
                    root: classes.buttons,
                }}
            >
                <Button size="small" color="primary">
                    View
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => redirectTo(`recipe-editor/${recipe.id}`)}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}
