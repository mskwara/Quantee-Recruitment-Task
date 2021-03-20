import { React, useContext, useState } from "react";
import { getFullIngredientText } from "../../utilities/helper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Chip } from "@material-ui/core";
import StateContext from "../../utilities/StateContext";
import axios from "axios";
import AddedIngredients from "./AddedIngredients";
import RecipeForm from "./RecipeForm";
import { useHistory } from "react-router-dom";

// TODO theme
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        "& main": {
            padding: 20,
            backgroundColor: "white",
            boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            width: 800,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto 50px",
            gridTemplateAreas: `'form aside' 
                'publish publish'`,
            columnGap: 20,

            "@media only screen and (max-width: 600px)": {
                gridTemplateColumns: "1fr",
                gridTemplateRows: "auto auto 50px",
                gridTemplateAreas: `"form"
                    "aside"
                    "publish"`,
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
}));

const RecipeEditor = ({ match }) => {
    const classes = useStyles();
    const history = useHistory();
    const stateContext = useContext(StateContext);

    const editMode = match && match.params.recipeId;

    const [ingredients, setIngredients] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        img: "",
        notes: "",
        ingredient: {
            name: "",
            quantity: "",
            unit: "",
        },
    });

    const resetFormData = () => {
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
        setFormData({
            ...formData,
            ingredient: {
                name: "",
                quantity: "",
                unit: "",
            },
        });
    };

    const handleBasicsChange = (event) => {
        const updatedFormData = { ...formData };
        updatedFormData[event.target.name] = event.target.value;
        setFormData(updatedFormData);
    };

    const handleIngredientChange = (event) => {
        const updatedFormData = { ...formData };
        updatedFormData.ingredient[event.target.name] = event.target.value;
        setFormData(updatedFormData);
    };

    const handleIngredientDelete = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
        stateContext.showAlert("The ingredient has been removed!", "success");
    };
    const handleIngredientAdd = () => {
        if (
            !formData.ingredient.name ||
            !formData.ingredient.quantity ||
            isNaN(formData.ingredient.quantity) ||
            !formData.ingredient.unit
        ) {
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
        ]);
        resetIngredient();
        stateContext.showAlert("The ingredient has been added!", "success");
    };

    const publishRecipe = () => {
        if (
            !formData.title ||
            !formData.img ||
            !formData.notes ||
            ingredients.length === 0
        ) {
            stateContext.showAlert(
                "Please fill every field correctly!",
                "error"
            );
            return;
        }

        if (!editMode) {
            axios.post("https://michalskwara.free.beeceptor.com/recipes", {
                title: formData.title,
                img: formData.img,
                notes: formData.notes,
                ingredients,
            });
            stateContext.showAlert(
                "Your recipe has been published!",
                "success"
            );
        } else {
            axios.patch(
                `https://michalskwara.free.beeceptor.com/recipes/${match.params.recipeId}`,
                {
                    title: formData.title,
                    img: formData.img,
                    notes: formData.notes,
                    ingredients,
                }
            );
            stateContext.showAlert("The recipe has been updated!", "success");
        }
        resetFormData();
        history.push("/");
    };

    return (
        <div className={classes.root}>
            <main>
                <RecipeForm
                    formData={formData}
                    handleBasicsChange={handleBasicsChange}
                    handleIngredientChange={handleIngredientChange}
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
            </main>
        </div>
    );
};

export default RecipeEditor;
