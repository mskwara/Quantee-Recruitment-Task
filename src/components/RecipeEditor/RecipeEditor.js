import { React, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import StateContext from "../../utilities/StateContext";
import axios from "axios";
import errorIcon from "../../assets/error.svg";
import AddedIngredients from "./AddedIngredients";
import RecipeForm from "./RecipeForm";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import ErrorPage from "../ErrorPage/ErrorPage";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        "& main": {
            padding: 20,
            backgroundColor: "white",
            boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            width: 800,
            minWidth: 200,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto 50px auto",
            gridTemplateAreas: `"form aside" 
                "publish publish"
                "loading loading"`,
            columnGap: 20,

            "@media only screen and (max-width: 600px)": {
                width: "100%",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto auto 50px auto",
                gridTemplateAreas: `"form"
                    "aside"
                    "publish"
                    "loading"`,
                columnGap: 0,
            },
        },
    },
    publishButton: {
        gridArea: "publish",
        margin: "0 8px",
    },
    label: {
        fontSize: "14pt",
        fontFamily: "Calibri",
        textTransform: "uppercase",
        margin: "20px 0 0 0",
    },
    spinner: {
        gridArea: "loading",
        margin: "10px auto",
    },
});

const RecipeEditor = ({ match }) => {
    const classes = useStyles();
    const history = useHistory();
    const stateContext = useContext(StateContext);

    const editMode = match.params.recipeId != null; // true/false

    const [ingredients, setIngredients] = useState(); // ingredients added to this recipe

    const [formData, setFormData] = useState(); // other textfields
    const [loading, setLoading] = useState(false); // other textfields

    const { isLoading, error, data } = useQuery(
        ["recipe", match.params.recipeId],
        async () => {
            const res = await axios.get(
                `https://michalskwara.free.beeceptor.com/recipes/${match.params.recipeId}`
            );
            return res.data.recipe;
        },
        {
            enabled: !!match.params.recipeId,
        }
    );
    useEffect(() => {
        // every time when editMode is changed
        setFormData({
            // if there is information about recipe, then use it, else set empty string
            title: (editMode && data && data.title) || "",
            img: (editMode && data && data.img) || "",
            notes: (editMode && data && data.notes) || "",
            ingredient: {
                name: "",
                quantity: "",
                unit: "",
            },
        });
        setIngredients(
            // if there is information about ingredients, then use it, else set empty array
            (editMode && data && data.ingredients) || []
        );
    }, [editMode, data]);

    if (isLoading)
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
        );

    const resetFormData = () => {
        // resets each field
        setFormData({
            title: "",
            img: "",
            notes: "",
            ingredient: {
                name: "",
                quantity: "",
                unit: "",
            },
        });
    };

    const resetIngredient = () => {
        // resets new-ingredient fields
        setFormData({
            ...formData,
            ingredient: {
                name: "",
                quantity: "",
                unit: "",
            },
        });
    };

    const handleFieldChange = (event, isIngredient) => {
        // when one of the textfields is changed
        const updatedFormData = { ...formData };
        if (isIngredient) {
            updatedFormData.ingredient[event.target.name] = event.target.value;
        } else {
            updatedFormData[event.target.name] = event.target.value;
        }
        setFormData(updatedFormData);
    };

    const handleIngredientDelete = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients); // set ingredients as updated array
        stateContext.showAlert("The ingredient has been removed!", "success"); // show alert
    };
    const handleIngredientAdd = () => {
        if (
            !formData.ingredient.name ||
            !formData.ingredient.quantity ||
            isNaN(formData.ingredient.quantity) ||
            !formData.ingredient.unit
        ) {
            // verify the fields
            stateContext.showAlert(
                "Please fill ingredient's fields correctly!",
                "error"
            );
            return;
        }
        setIngredients([
            ...ingredients,
            {
                name: formData.ingredient.name,
                quantity: formData.ingredient.quantity,
                unit: formData.ingredient.unit,
            },
        ]); // append new ingredient to the end of ingredients list
        resetIngredient(); // reset textfields
        stateContext.showAlert("The ingredient has been added!", "success"); // show alert
    };

    const publishRecipe = async () => {
        if (
            !formData.title ||
            !formData.img ||
            !formData.notes ||
            ingredients.length === 0
        ) {
            // verify textfields
            stateContext.showAlert(
                "Please fill every field correctly!",
                "error"
            );
            return;
        }

        if (!editMode) {
            // if not editMode, then create a new recipe
            try {
                setLoading(true);
                await axios.post(
                    "https://michalskwara.free.beeceptor.com/recipes",
                    {
                        title: formData.title,
                        img: formData.img,
                        notes: formData.notes,
                        ingredients,
                    }
                );
            } catch (err) {
                stateContext.showAlert(
                    "The problem occured when trying to create recipe!",
                    "error"
                );
            } finally {
                setLoading(false);
            }
            stateContext.showAlert(
                "Your recipe has been published!",
                "success"
            );
        } else {
            // else update existing one
            try {
                setLoading(true);
                await axios.patch(
                    `https://michalskwara.free.beeceptor.com/recipes/${match.params.recipeId}`,
                    {
                        title: formData.title,
                        img: formData.img,
                        notes: formData.notes,
                        ingredients,
                    }
                );
            } catch (err) {
                stateContext.showAlert(
                    "The problem occured when trying to update the recipe!",
                    "error"
                );
            } finally {
                setLoading(false);
            }
            stateContext.showAlert("The recipe has been updated!", "success");
        }
        resetFormData(); // reset textfields
        history.push("/"); // go to recipes page
    };

    return (
        <div className={classes.root}>
            {formData &&
                ingredients && ( // wait for the data assignment in useEffect
                    <main>
                        <RecipeForm
                            formData={formData}
                            handleFieldChange={handleFieldChange}
                            // handleIngredientChange={handleIngredientChange}
                            handleIngredientAdd={handleIngredientAdd}
                            labelClass={classes.label}
                        />
                        <AddedIngredients
                            classLabel={classes.label}
                            ingredients={ingredients}
                            handleIngredientDelete={handleIngredientDelete}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={publishRecipe}
                            className={classes.publishButton}
                        >
                            {editMode ? "Update recipe" : "Publish recipe"}
                        </Button>
                        {loading && (
                            <CircularProgress
                                classes={{
                                    root: classes.spinner,
                                }}
                            />
                        )}
                    </main>
                )}
        </div>
    );
};

export default RecipeEditor;
