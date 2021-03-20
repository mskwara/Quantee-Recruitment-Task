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

import styles from "./RecipeTile.module.scss";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ recipe }) {
    const classes = useStyles();

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
                    <span className={styles.notes}>
                        <CommentIcon color="primary" />
                        <p>{recipe.notes}</p>
                    </span>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}
