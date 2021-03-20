import styles from "./CreateRecipe.module.scss";
import { React, useState } from "react";
import { getFullIngredientText } from "../../utilities/helper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
}));

function CreateRecipe() {
    const classes = useStyles();

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
            quantity: null,
            unit: "",
        },
    });

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
            console.log("alert");
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
    };

    const publishRecipe = () => {
        if (
            !formData.title ||
            !formData.img ||
            !formData.notes ||
            !ingredients.length === 0
        ) {
            console.log("alert");
            return;
        }
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
                        onChange={handleBasicsChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Image url"
                        name="img"
                        onChange={handleBasicsChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Notes"
                        name="notes"
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
                        onChange={handleIngredientChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Quantity"
                        name="quantity"
                        onChange={handleIngredientChange}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Unit"
                        name="unit"
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
                            color="primary"
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
                    Publish recipe
                </Button>
            </main>
        </div>
    );
}

export default CreateRecipe;
