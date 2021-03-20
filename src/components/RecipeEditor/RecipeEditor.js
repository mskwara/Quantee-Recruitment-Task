import styles from "./RecipeEditor.module.scss";
import { React, useContext, useState } from "react";
import { getFullIngredientText } from "../../utilities/helper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Chip } from "@material-ui/core";
import StateContext from "../../utilities/StateContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
}));

const RecipeEditor = ({ match }) => {
    const classes = useStyles();
    const stateContext = useContext(StateContext);

    const editMode = match && match.params.recipeId;

    const [ingredients, setIngredients] = useState([
        {
            name: "water",
            quantity: 1000,
            unit: "ml",
        },
    ]);

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
        stateContext.showAlert("The ingredient has been added!", "success");
    };

    const publishRecipe = () => {
        if (
            !formData.title ||
            !formData.img ||
            !formData.notes ||
            !ingredients.length === 0
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
    };

    return (
        <div className={styles.root}>
            <main>
                <form className={classes.root} noValidate autoComplete="off">
                    <label className={styles.label}>Basic information:</label>
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleBasicsChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Image url"
                        name="img"
                        value={formData.img}
                        onChange={handleBasicsChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleBasicsChange}
                    />
                    <label className={styles.label}>
                        Specify the ingredients:
                    </label>
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Ingredient name"
                        name="name"
                        value={formData.ingredient.name}
                        onChange={handleIngredientChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Quantity"
                        name="quantity"
                        value={formData.ingredient.quantity}
                        onChange={handleIngredientChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Unit"
                        name="unit"
                        value={formData.ingredient.unit}
                        onChange={handleIngredientChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleIngredientAdd}
                    >
                        Add ingredient
                    </Button>
                </form>
                <aside>
                    <label className={styles.label}>Added ingredients:</label>
                    {ingredients.map((ingredient, index) => (
                        <Chip
                            label={getFullIngredientText(ingredient)}
                            onDelete={() => handleIngredientDelete(index)}
                            color="secondary"
                            className={styles.chip}
                            clickable={false}
                            key={index}
                        />
                    ))}
                </aside>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={publishRecipe}
                    className={styles.publishButton}
                >
                    {editMode ? "Update recipe" : "Publish recipe"}
                </Button>
            </main>
        </div>
    );
};

export default RecipeEditor;
