import React from "react";
import { getFullIngredientText } from "../../../utilities/helper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ListDividers({ ingredients }) {
    const classes = useStyles();

    const displayCount = 3; // only several first ingredients are displayed

    return (
        <List
            component="nav"
            className={classes.root}
            aria-label="mailbox folders"
        >
            {ingredients.slice(0, displayCount).map((
                ingredient,
                index // first x ingredients
            ) => (
                <ListItem
                    button
                    divider={
                        index < displayCount && index < ingredients.length - 1 // appearance detail
                    }
                    key={index}
                >
                    <ListItemText
                        secondary={getFullIngredientText(ingredient)} // ingredient full text comes from helper.js
                    />
                </ListItem>
            ))}
            {ingredients.length > displayCount && ( // if there are more than x ingredients, show additional information
                <ListItem button>
                    <ListItemText
                        secondary={`${
                            ingredients.length - displayCount
                        } more...`}
                        data-testid="more-ingredients"
                    />
                </ListItem>
            )}
        </List>
    );
}
