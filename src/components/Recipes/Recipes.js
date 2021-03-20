// import "./Recipes.css";
import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import RecipeTile from "./RecipeTile/RecipeTile";
// TODO uninstall axios

const Recipes = () => {
    const { isLoading, error, data } = useQuery("repoData", async () => {
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
        ];
    });
    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    console.log(data);

    return (
        <div className="Recipes">
            {data.map((recipe) => (
                <RecipeTile recipe={recipe} key={recipe.id} />
            ))}
        </div>
    );
};

export default Recipes;
