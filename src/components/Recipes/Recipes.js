// import "./Recipes.css";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import RecipeTile from "./RecipeTile/RecipeTile";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
});

const Recipes = () => {
    const classes = useStyles();
    const { isLoading, error, data } = useQuery("recipesData", async () => {
        // const res = await axios.get(
        //     "https://michalskwara.free.beeceptor.com/recipes"
        // );
        // return res.data.recipes;
        return [
            {
                id: "572a9575-d84d-4dae-b943-1f8feb681bbf",
                title: "Napolitana",
                img:
                    "https://www.oetker.pl/Recipe/Recipes/oetker.pl/pl-pl/miscallaneous/image-thumb__51050__RecipeDetailsLightBox/pizza-domowa.jpg",
                ingredients: [
                    {
                        name: "flour",
                        quantity: 800,
                        unit: "g",
                    },
                    {
                        name: "water",
                        quantity: 1000,
                        unit: "ml",
                    },
                    {
                        name: "water",
                        quantity: 1000,
                        unit: "ml",
                    },
                    {
                        name: "water",
                        quantity: 1000,
                        unit: "ml",
                    },
                    {
                        name: "water",
                        quantity: 1000,
                        unit: "ml",
                    },
                ],
                notes: "The best pizza",
            },
            {
                id: "572a9575-d84d-4dae-b943-1f8feb681bbe",
                title: "Salad",
                img:
                    "https://www.howsweeteats.com/wp-content/uploads/2020/05/summer-salad-16-500x375.jpg",
                ingredients: [
                    {
                        name: "tomatos",
                        quantity: 3,
                        unit: "pieces",
                    },
                    {
                        name: "broccoli",
                        quantity: 1,
                        unit: "piece",
                    },
                    {
                        name: "eggs",
                        quantity: 2,
                        unit: "pieces",
                    },
                ],
                notes: "The most healthy salad!",
            },
        ];
    });
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log(data);

    return (
        <div className={classes.root}>
            {data.map((recipe) => (
                <RecipeTile recipe={recipe} key={recipe.id} />
            ))}
        </div>
    );
};

export default Recipes;
