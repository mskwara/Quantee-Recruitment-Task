import { useQuery } from "react-query";
import axios from "axios";
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
        const res = await axios.get(
            "https://michalskwara.free.beeceptor.com/recipes"
        );
        return res.data.recipes;
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
