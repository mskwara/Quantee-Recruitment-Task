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

    const displayCount = 3;

    return (
        <List
            component="nav"
            className={classes.root}
            aria-label="mailbox folders"
        >
            {ingredients.slice(0, displayCount).map((ingredient, index) => (
                <ListItem
                    button
                    divider={
                        index < displayCount && index < ingredients.length - 1
                    }
                    key={index}
                >
                    <ListItemText
                        secondary={getFullIngredientText(ingredient)}
                    />
                </ListItem>
            ))}
            {ingredients.length > displayCount && (
                <ListItem button>
                    <ListItemText
                        secondary={`${
                            ingredients.length - displayCount
                        } more...`}
                    />
                </ListItem>
            )}
        </List>
    );
}
