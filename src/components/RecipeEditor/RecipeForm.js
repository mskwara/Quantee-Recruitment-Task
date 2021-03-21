import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        gridArea: "form",

        "& input": {
            width: "100% !important",
            maxWidth: "100% !important",
        },
    },
}));

const RecipeForm = ({
    handleFieldChange,
    formData,
    handleIngredientAdd,
    labelClass,
}) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <label className={labelClass}>Basic information:</label>
            <TextField
                id="standard-basic"
                type="text"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleFieldChange}
            />
            <TextField
                id="standard-basic"
                type="text"
                label="Image url"
                name="img"
                value={formData.img}
                onChange={handleFieldChange}
            />
            <TextField
                id="standard-basic"
                type="text"
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleFieldChange}
            />
            <label className={labelClass}>Specify the ingredients:</label>
            <TextField
                id="standard-basic"
                type="text"
                label="Ingredient name"
                name="name"
                value={formData.ingredient.name}
                onChange={(e) => handleFieldChange(e, true)}
            />
            <TextField
                id="standard-basic"
                type="text"
                label="Quantity"
                name="quantity"
                value={formData.ingredient.quantity}
                onChange={(e) => handleFieldChange(e, true)}
            />
            <TextField
                id="standard-basic"
                type="text"
                label="Unit"
                name="unit"
                value={formData.ingredient.unit}
                onChange={(e) => handleFieldChange(e, true)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleIngredientAdd}
            >
                Add ingredient
            </Button>
        </form>
    );
};

export default RecipeForm;
