import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    notes: {
        display: "flex",
        alignItems: "center",
        margin: "auto 20px 0 20px",

        "& p": {
            marginLeft: 10,
            fontSize: "9pt",
            fontFamily: "Roboto",
        },
    },
});

export default function MediaCard({ recipe }) {
    const classes = useStyles();
    const history = useHistory();

    const onEditClick = () => {
        history.push({
            // switch to other url and pass recipe data in state
            pathname: `recipe-editor/${recipe.id}`,
            state: {
                ...recipe,
            },
        });
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
                </CardContent>
            </CardActionArea>
            <span className={classes.notes}>
                <CommentIcon color="primary" />
                <p>{recipe.notes}</p>
            </span>
            <CardActions
                classes={{
                    root: classes.buttons,
                }}
            >
                <Button size="small" color="primary">
                    {/* View is not implemented */}
                    View
                </Button>
                <Button size="small" color="primary" onClick={onEditClick}>
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}
