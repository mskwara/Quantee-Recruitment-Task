import { useQuery } from "react-query";
// import axios from "axios";
import RecipeTile from "./RecipeTile/RecipeTile";
import ErrorPage from "../ErrorPage/ErrorPage";
import { CircularProgress, makeStyles } from "@material-ui/core";
import errorIcon from "../../assets/error.svg";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    spinner: {
        margin: "auto",
    },
});

const Recipes = () => {
    const classes = useStyles();
    const { isLoading, error, data } = useQuery("recipesData", async () => {
        // TODO
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
    if (isLoading)
        // if waiting for the response, show loading spinner
        return (
            <CircularProgress
                classes={{
                    root: classes.spinner,
                }}
            />
        );

    if (error)
        return (
            <ErrorPage
                code={500}
                message="Server has crashed..."
                icon={errorIcon}
            />
        ); // if there was a problem with the server, show error page

    return (
        // else render recipes
        <div className={classes.root}>
            {data.map((recipe) => (
                <RecipeTile recipe={recipe} key={recipe.id} />
            ))}
        </div>
    );
};

export default Recipes;
